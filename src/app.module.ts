import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from './answer/answer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { StudentModule } from './student/student.module';
import { StudentAnswerModule } from './studentAnswer/studentAnswer.module';
import { TeacherModule } from './teacher/teacher.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TeacherModule,
    TestModule,
    StudentModule,
    QuestionModule,
    AnswerModule,
    StudentAnswerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: ['**/*.entity.js']
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
