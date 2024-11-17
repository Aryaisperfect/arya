import { Question } from "./question.entity";

export interface ExamQuestion extends Question{
    marks: number
}
export interface Exam{
    id: string,
    questions: ExamQuestion[]
}