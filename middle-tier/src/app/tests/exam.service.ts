import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { CreateQuestionDTO } from './question.entity';
import { DB_CONNECTION_STRING, DB_NAME, QUESTION_COLLECTION } from '../env';

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
}