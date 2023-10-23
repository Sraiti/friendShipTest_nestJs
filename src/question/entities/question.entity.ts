import { ObjectType, Field } from '@nestjs/graphql';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Question {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  content: string;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
  questionnaire: Questionnaire;

  @Field(() => [Choice])
  @OneToMany(() => Choice, (choice) => choice.question, { cascade: true })
  choices: Choice[];
}

@Entity()
@ObjectType()
export class Choice {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field()
  @Column({ default: false })
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.choices)
  question: Question;
}
