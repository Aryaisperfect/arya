import { Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { CreateQuestionDTO } from './question.entity';
import { DB_CONNECTION_STRING, DB_NAME, EXAM_COLLECTION, QUESTION_COLLECTION } from '../env';

@Injectable()
export class ExamService {
    async createQuestion(question: CreateQuestionDTO) {
        const client = new MongoClient(DB_CONNECTION_STRING);
        try {
            const database = client.db(DB_NAME);
            const questionsColection = database.collection(QUESTION_COLLECTION);
            await questionsColection.insertOne(question);
            return { message: 'Question created successfully' };
        } finally {
            await client.close();
        }
    }

    async getAllQuestions(){
        const client = new MongoClient(DB_CONNECTION_STRING);
        try {
            const database = client.db(DB_NAME);
            const questionsColection = database.collection(QUESTION_COLLECTION);
            const questions = await questionsColection.find({}).toArray();
            return questions;
        } finally {
            await client.close();
        }

    }
    async sessionLogin(sessionInstance: { name: string, password: string, sessionId: string }) {
        const client = new MongoClient(DB_CONNECTION_STRING);
        try {
            const database = client.db(DB_NAME);
            const examSessionColection = database.collection(EXAM_COLLECTION);
            const examSession = await examSessionColection.findOneAndUpdate({ ...sessionInstance, sessionStarted: { $exists: false } }, { $set: { sessionStarted: new Date() } });
            if (examSession) {
                const { password, sessionStarted, ...rest } = examSession;
                return rest;
            } else {
                const attemptedSession = await examSessionColection.findOne({...sessionInstance});
                console.log({attemptedSession, sessionInstance});
                if (attemptedSession) {
                    const { questions: attemptedQuestions = [], password, ...rest } = attemptedSession ?? { questions: [], password: '' };
                    return {
                        ...rest,
                        questions: attemptedQuestions.map((q: any) => {
                            const { question, result, difficulty } = q;
                            return { question, result, difficulty }
                        })
                    }
                } else {
                    return { sessionId: null }

                }
            }
        } finally {
            await client.close();
        }
    }

    async goToNextQuestion(sessionId: string) {
        const client = new MongoClient(DB_CONNECTION_STRING);
        try {
            const database = client.db(DB_NAME);
            const examSessionColection = database.collection(EXAM_COLLECTION);
            const questionsColection = database.collection(QUESTION_COLLECTION);
            const examSession = await examSessionColection.findOne({ sessionId, sessionStarted: { $exists: true } });
            if (examSession) {
                const { questions: alreadyAskedQuestions = [] } = examSession;
                if (alreadyAskedQuestions.length < examSession.numberOfQuestions) {
                    const questionIds = alreadyAskedQuestions.map((q: { _id: ObjectId }) => (q._id));
                    const remainingQuestions = await questionsColection.find({
                        category: examSession.category,
                        _id: { $nin: questionIds }
                    }).toArray();
                    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
                    return remainingQuestions[randomIndex];
                }else{
                    return null;
                }
            } else {
                return { sessionId: null }
            }
        } finally {
            await client.close();
        }
    }

    async submitAnswer(answerSubmitted: {
        sessionId: string,
        questionId: string,
        answer: string
    }){
        const {sessionId, questionId, answer} = answerSubmitted;
        const client = new MongoClient(DB_CONNECTION_STRING);
        try{
            const database = client.db(DB_NAME);
            const questionsColection = database.collection(QUESTION_COLLECTION);
            const sessionColection = database.collection(EXAM_COLLECTION);
            const questionInstance = await questionsColection.findOne({_id: new ObjectId(questionId)});
            if (questionInstance){
                const {question, correct_answer, difficulty, _id} = questionInstance;
                await sessionColection.updateOne(
                    {sessionId: sessionId},
                    //@ts-ignore
                    {$push: {questions: {_id, question, correct_answer, difficulty, result: questionInstance.correct_answer === answer, answer_submitted: answer}}}
                );
                return true;
            }

        }finally{
            await client.close();
        }


    }
}