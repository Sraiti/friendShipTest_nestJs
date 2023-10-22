import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';
import { UpdateQuestionInput } from 'src/question/dto/update-question.input';
import { UpdateQuestionResponse } from 'src/question/dto/update-question.response';
import { Logger } from '@nestjs/common';
import { UpdateQuestionnaireResponse } from './dto/update-questionnaire.response';
// import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';

@Resolver(() => Questionnaire)
export class QuestionnaireResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Mutation(() => Questionnaire)
  createQuestionnaire(
    @Args('input')
    createQuestionnaireInput: CreateQuestionnaireInput,
  ): Promise<Questionnaire> {
    return this.questionnaireService.create(createQuestionnaireInput);
  }

  @Query(() => [Questionnaire], { name: 'questionnaire' })
  findAll() {
    return this.questionnaireService.findAll();
  }

  @Query(() => Questionnaire, { name: 'questionnaire' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionnaireService.findOne(id);
  }
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UpdateQuestionnaireResponse)
  updateQuestionnaire(
    @Args('updateQuestionnaireInput')
    updateQuestionnaireInput: UpdateQuestionnaireInput,
  ) {
    Logger.log({ updateQuestionnaireInput });
    return this.questionnaireService.update(
      updateQuestionnaireInput.id,
      updateQuestionnaireInput,
    );
  }

  @Mutation(() => UpdateQuestionResponse)
  updateQuestion(
    @Args('updateQuestionInput', {
      type: () => UpdateQuestionInput || [UpdateQuestionInput],
    })
    updateQuestionInput: UpdateQuestionInput | UpdateQuestionInput[],
  ) {
    return this.questionnaireService.updateQuestion(updateQuestionInput);
  }

  @Mutation(() => Questionnaire)
  removeQuestionnaire(@Args('id', { type: () => Int }) id: number) {
    return this.questionnaireService.remove(id);
  }
}
