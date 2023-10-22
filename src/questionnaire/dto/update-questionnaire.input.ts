import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { QuestionnaireStatus, Visibility } from 'src/enums/questionnaire.enums';

@InputType()
export class UpdateQuestionnaireInput {
  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  title: string;
  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;
  @Field(() => QuestionnaireStatus, {
    nullable: false,
    defaultValue: QuestionnaireStatus.DRAFT,
  })
  @IsEnum(QuestionnaireStatus)
  @IsNotEmpty({ message: 'Status should not be empty' })
  status?: QuestionnaireStatus;

  @Field(() => Visibility, { nullable: false, defaultValue: Visibility.PUBLIC })
  @IsEnum(Visibility)
  @IsNotEmpty({ message: 'Visibility should not be empty' })
  visibility?: Visibility;
}
