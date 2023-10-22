import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { Questionnaire } from './entities/questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';
import { UpdateQuestionInput } from 'src/question/dto/update-question.input';
import { QuestionService } from 'src/question/question.service';
import { UpdateQuestionnaireResponse } from './dto/update-questionnaire.response';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private questionnaireRepository: Repository<Questionnaire>,
    private readonly questionService: QuestionService,
  ) {}
  async create(input: CreateQuestionnaireInput) {
    const newQuestionnaire = this.questionnaireRepository.create(input);

    console.log({ newQuestionnaire, questions: newQuestionnaire.questions });

    const creationQuestion =
      await this.questionnaireRepository.save(newQuestionnaire);
    return creationQuestion;
  }

  findAll() {
    return `This action returns all questionnaire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionnaire`;
  }

  async update(
    id: number,
    updateQuestionnaireInput: UpdateQuestionnaireInput,
  ): Promise<UpdateQuestionnaireResponse> {
    const existingQuestionnaire = await this.questionnaireRepository.findOneBy({
      id,
    });

    if (!existingQuestionnaire) {
      throw new NotFoundException(`Questionnaire with id ${id} is  not found`);
    }

    delete existingQuestionnaire.questions;

    await this.questionnaireRepository.update(id, updateQuestionnaireInput);

    return {
      success: true,
      message: 'questionnaire has been updated',
      updatedQuestionnairesStatus: [
        {
          questionnaireId: id,
          questionnaireUpdated: true,
        },
      ],
    };
  }
  async updateQuestion(
    updateQuestionInput: UpdateQuestionInput | UpdateQuestionInput[],
  ) {
    return await this.questionService.updateQuestion(updateQuestionInput);
  }

  remove(id: number) {
    return `This action removes a #${id} questionnaire`;
  }
}
