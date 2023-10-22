import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateQuestionnaireResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => [UpdatedQuestionnaireStatus], { nullable: true })
  updatedQuestionnairesStatus?: UpdatedQuestionnaireStatus[];
}

@ObjectType()
export class UpdatedQuestionnaireStatus {
  @Field(() => Number)
  questionnaireId: number;

  @Field(() => Boolean)
  questionnaireUpdated: boolean;
}
