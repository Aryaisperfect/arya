import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { ExamService } from './exam.service';
import { CreateQuestionDTO } from './question.entity';

@Controller('exam')
export class ExamController{
    constructor(private readonly examService: ExamService){

    }

    @Post('/questions')
    createQuestion(@Body() createQuestion: CreateQuestionDTO){
        return this.examService.createQuestion(createQuestion);
    }

    @Post('/goto-next-question')
    gotoNextQuestion(@Body() requestPayload: {sessionId: string}){
        const {sessionId} = requestPayload;
        return this.examService.goToNextQuestion(sessionId);
    }

    @Post('/session-login')
    startExamSession(@Body() sessionLogin: {
        name: string,
        password: string,
        sessionId: string
    }){
        return this.examService.sessionLogin(sessionLogin);
    }
    
    @Get('/questions')
    getQuestions(){
        return this.examService.getAllQuestions();
    }

    @Post('/submit-answer')
    submitAnswer(@Body() answerSubmitted: {
        sessionId: string,
        questionId: string,
        answer: string
    }){
        return this.examService.submitAnswer(answerSubmitted);

    }

}