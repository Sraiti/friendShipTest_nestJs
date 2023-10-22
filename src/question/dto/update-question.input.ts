import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateQuestionInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @Field(() => String, { nullable: true })
  content: string;
  @Field(() => [ChoiceInputUpdate])
  @IsArray()
  @MinLength(1, { each: true })
  choices: ChoiceInputUpdate[];
}

@InputType()
export class ChoiceInputUpdate {
  @Field(() => Number, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsNumber()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  label: string;
  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}
