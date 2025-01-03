import { useEffect, useState } from "react";
import "./quizzes.css";
import { get, post } from "src/api-interface/http-client";
import { QUESTIONS_URL } from "src/api-interface/url-const";
import { useSession as useLoginSession } from "src/states/login-state";
type QuestionType = {
    _id: string;
    type: string;
    difficulty: number;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

const useSession = () => {
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();
    const [examFinished, setExamFinished] = useState(false);
    const { sessionId, questions, sessionStarted } = useLoginSession() ?? {};
    useEffect(() => {
        const fetchNextQuestion = async () => {
            if (!sessionStarted && sessionId) {
                const nextQuestion = await post(`${QUESTIONS_URL}/goto-next-question`, { sessionId: sessionId }, null);
                if (nextQuestion) {
                    setCurrentQuestion(nextQuestion);
                }
            }
        }
        fetchNextQuestion();

    }, [sessionId, sessionStarted]);

    const onNextQuestion = async () => {
        const nextQuestion = await post(`${QUESTIONS_URL}/goto-next-question`, { sessionId: sessionId }, null);
        if (nextQuestion) {
            setCurrentQuestion(nextQuestion);
        }else{
            setExamFinished(true);
        }

    }
    const submitAnswer = async (questionId: string, answer: string) => {
        await post(`${QUESTIONS_URL}/submit-answer`, { sessionId: sessionId, questionId, answer }, null);
    }

    return { currentQuestion, onNextQuestion, submitAnswer, questions, sessionStarted, examFinished }

}

export const Quizzes = () => {
    const [selectedOptions, setSelectedOptions] = useState<string>();
    const [message, setMessage] = useState('');
    const { currentQuestion, onNextQuestion, submitAnswer, sessionStarted, examFinished } = useSession();

    return (
        <>
            {sessionStarted && <PastSession></PastSession>}
            {examFinished && <><h1>Thanks for taking the exam</h1></>}
            {(currentQuestion && !examFinished) && <>
                {/* <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div> */}
                <div className="error" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} ></div>
                <ul>
                    {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].map((option) => (
                        <li
                            key={option}
                            onClick={() =>
                                setSelectedOptions(option)
                            }
                            style={{ background: selectedOptions === option ? '#ff5733' : undefined }}
                            dangerouslySetInnerHTML={{ __html: option }}
                        >
                        </li>
                    ))}
                </ul>
                <div className="answers">{currentQuestion.question}</div>
                {message && <div>{message}</div>}
                <button
                    className="button"
                    disabled={!selectedOptions}
                    onClick={async () => {
                        if (!selectedOptions) {
                            setMessage('Oops! Make sure you selected all the correct options.');
                            setSelectedOptions('');
                        } else {
                            await submitAnswer(currentQuestion._id, selectedOptions);
                            await onNextQuestion();
                        }
                    }}
                >
                    Submit
                </button>
            </>
            }
        </>
    );
};

export const PastSession = () => {
    const { sessionStarted = '', questions = [] } = useLoginSession() ?? {};
    return (
        <>
            <h1>You have already submitted your exam on {`${sessionStarted}`}</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Question</th>
                        <th scope="col">Result</th>
                        <th scope="col">Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q: any, idx) => {
                        return <tr>
                            <th scope="row">{idx}</th>
                            <td dangerouslySetInnerHTML={{ __html: q.question }}></td>
                            <td>{q.result ? 'Correct' : 'Incorrect'}</td>
                            <td>{q.difficulty}</td>
                        </tr>
                    })}
                </tbody>
            </table>

        </>
    )
}
