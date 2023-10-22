import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, MinLength } from 'class-validator';
import { CreateQuestionInput } from 'src/question/dto/create-question.input';

@InputType()
export class CreateQuestionnaireInput {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [CreateQuestionInput])
  @IsArray()
  @MinLength(1)
  questions: CreateQuestionInput[];
}
