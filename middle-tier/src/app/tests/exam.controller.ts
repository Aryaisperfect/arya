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
    
    @Get('/questions')
    getQuestions(){
        return this.examService.getAllQuestions();
    }

}