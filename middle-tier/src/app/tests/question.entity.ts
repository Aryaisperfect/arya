export interface Question {
    id: string,
    questionText: string,
    tags: string[],
    answers: {
        text: string,
        correct: boolean
    }[]
}

export interface CreateQuestionDTO {
    questionText: string,
    tags: string[],
    answers: {
        text: string,
        correct: boolean
    }[]
}