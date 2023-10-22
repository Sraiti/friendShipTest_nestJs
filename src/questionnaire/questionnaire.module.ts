import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
// import { QuestionnaireResolver } from './questionnaire.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { QuestionnaireResolver } from './questionnaire.resolver';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Questionnaire]), QuestionModule],
  providers: [QuestionnaireService, QuestionnaireResolver],
  controllers: [],
})
export class QuestionnaireModule {}
