import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
  ArrayNotEmpty,
} from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  content: string;

  @Field(() => [ChoiceInputCreate])
  @IsArray()
  @MinLength(2, { each: true })
  @ArrayNotEmpty()
  choices: ChoiceInputCreate[];
}

@InputType()
export class ChoiceInputCreate {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  label: string;
  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}
