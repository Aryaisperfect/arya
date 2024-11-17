import { Exam } from "./exam.entity";

export interface ExamInstance{
    id: string,
    examTakerId: string,
    examDate: Date,
    exam: Exam
}