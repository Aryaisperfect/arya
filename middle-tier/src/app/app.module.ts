import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExamModule } from './tests/exam.module';
import { ExamController } from './tests/exam.controller';
import { ExamService } from './tests/exam.service';

@Module({
  imports: [UsersModule, ExamModule],
  controllers: [AppController, ExamController],
  providers: [AppService, ExamService],
})
export class AppModule {}
