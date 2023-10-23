import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll() {
    // const questionnaire = await this.questionnaireRepository.findBy({
    //   createdBy: 69,
    // });
    // if (!questionnaire) {
    //   Logger.log('reached');
    //   throw new NotFoundException(
    //     `Could not find any Questionnaire matching id : ${id}`,
    //   );
    // }
    // Logger.log({ questionnaire });
    // return questionnaire;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Please provide a valid ID');
    }
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id },
      relations: { questions: true },
    });

    if (!questionnaire) {
      throw new NotFoundException(
        `Could not find any Questionnaire matching id : ${id}`,
      );
    }
    Logger.log({ questionnaire });

    return questionnaire;
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
