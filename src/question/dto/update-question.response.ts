import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateQuestionResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => [UpdatedQuestionStatus], { nullable: true })
  updatedQuestionsStatus?: UpdatedQuestionStatus[];
}

@ObjectType()
export class UpdatedQuestionStatus {
  @Field(() => Number)
  questionId: number;

  @Field(() => Boolean)
  questionUpdated: boolean;

  @Field(() => Boolean)
  choicesUpdated: boolean;
}
