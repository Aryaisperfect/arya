import { useEffect, useState } from "react";
import "./quizzes.css";
import { Interactive } from "../interactive";

export const Quizzes = () => {
    const [index, setCurrIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20); // 1200 seconds = 20 minutes
    const [selectedOptions, setSelectedOptions] = useState<unknown[]>([]);
    const [message, setMessage] = useState('');
    const [questions, setQuestions] = useState([
        {
            question: 'What is the right answer?',
            options: [
                { text: 'Correct', isCorrect: true },
                { text: 'Nope', isCorrect: false },
                { text: 'I am right too!', isCorrect: true },
                { text: 'Leave me alone!', isCorrect: false }
            ]
        },
        {
            question: 'Who am I?',
            answer: 'A human',
            options: []
        },
        {
            question: 'What do I study?',
            answer: 'Computer Science',
            options: []
        }
    ]);

    useEffect(() => {
        const timeLeftInterval = setInterval(() => {
            setTimeLeft((prevLeft) => {
                if (prevLeft <= 1) {
                    clearInterval(timeLeftInterval); // Stop countdown at zero
                    return 0;
                }
                return prevLeft - 1;
            });
        }, 1000);

        return () => clearInterval(timeLeftInterval);
    }, []);

    return (
        <>
            <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
            <div className="error">{questions[index].question}</div>
            <ul>
                {questions[index].options.map((option) => (
                    <li
                        key={option.text}
                        onClick={() =>
                            setSelectedOptions((prev) => {
                                if (!prev.includes(option)) {
                                    return [...prev, option];
                                } else {
                                    return prev;
                                }
                            })
                        }
                        style={{ background: selectedOptions.includes(option) ? '#ff5733' : undefined }}
                    >
                        {option.text}
                    </li>
                ))}
            </ul>
            <div className="answers">{questions[index].answer}</div>
            {message && <div>{message}</div>}
            <button
                className="button"
                onClick={() => {
                    const correctOptions = questions[index].options.filter((option) => option.isCorrect);
                    let allCorrectSelected = false;

                    if (correctOptions.length === selectedOptions.length) {
                        allCorrectSelected = correctOptions.every((opt) => selectedOptions.includes(opt));
                    }

                    if (!allCorrectSelected) {
                        setMessage('Oops! Make sure you selected all the correct options.');

                        // Remove the "Oops!" message after 2.5 seconds
                        setTimeout(() => setMessage(''), 2500);

                        setSelectedOptions([]);
                    } else {
                        setMessage('');
                        setSelectedOptions([]);
                        setCurrIndex((prevIndex) => (prevIndex + 1) % questions.length);
                    }
                }}
            >
                Next
            </button>
        </>
    );
};
