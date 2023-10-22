import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import {
  UpdateQuestionResponse,
  UpdatedQuestionStatus,
} from './dto/update-question.response';
import { UpdateQuestionInput } from './dto/update-question.input';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async updateQuestion(
    updateQuestionInput: UpdateQuestionInput | UpdateQuestionInput[],
  ): Promise<UpdateQuestionResponse> {
    const updatedQuestionsStatus: UpdatedQuestionStatus[] = [];

    const updateQuestionInputs: UpdateQuestionInput[] = Array.isArray(
      updateQuestionInput,
    )
      ? updateQuestionInput
      : [updateQuestionInput];

    ///check if all the questions exists first
    for (let index = 0; index < updateQuestionInputs.length; index++) {
      const { id } = updateQuestionInputs[index];

      const existingQuestion = await this.questionRepository.findOne({
        where: { id },
      });
      if (!existingQuestion) {
        throw new NotFoundException(`Question with id ${id} is  not found`);
      }
    }

    for (let index = 0; index < updateQuestionInputs.length; index++) {
      const { choices, content, id } = updateQuestionInputs[index];

      let questionUpdated = false;
      let choicesUpdated = false;
      if (content) {
        await this.questionRepository.update(id, {
          content,
        });
        questionUpdated = true;
      }

      // Upsert choices
      if (choices && choices.length > 0) {
        const values = choices
          .map(
            (choice) =>
              `(${choice.id}, '${choice.label}', ${choice.isCorrect}, ${id})`,
          )
          .join(', ');

        await this.questionRepository.query(`
        INSERT INTO choices (id, label, is_correct, question_id)
        VALUES ${values}
        ON CONFLICT (id) DO UPDATE 
        SET label = EXCLUDED.label, is_correct = EXCLUDED.is_correct
      `);
        choicesUpdated = true;
      }
      updatedQuestionsStatus.push({
        questionId: id,
        questionUpdated,
        choicesUpdated,
      });
    }
    return {
      success: true,
      message: 'Questions and choices updated successfully',
      updatedQuestionsStatus,
    };
  }
}
