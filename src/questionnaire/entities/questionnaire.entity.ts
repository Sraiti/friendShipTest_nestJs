import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/user/entities/user.entity';
import { QuestionnaireStatus, Visibility } from 'src/enums/questionnaire.enums';

@Entity()
@ObjectType() // GraphQL annotation
export class Questionnaire {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;
  @Field(() => String)
  @Column()
  title: string;
  @Field({})
  @Column({
    nullable: true,
    default: QuestionnaireStatus.PUBLISHED,
    enum: QuestionnaireStatus,
  })
  status: QuestionnaireStatus;
  @Field()
  @Column({
    enum: Visibility,
    nullable: true,
    default: Visibility.PUBLIC,
  })
  visibility: Visibility;
  @Field(() => String)
  @Column({ nullable: true, default: '' })
  description: string;

  @Field(() => [Question])
  @OneToMany(() => Question, (question) => question.questionnaire, {
    cascade: true,
  })
  questions: Question[];

  @JoinColumn({ name: 'created_by' }) // This will create a 'created_by' column in 'Questionnaire' table
  @ManyToOne(() => User, (user) => user.questionnaires)
  createdBy: User;
}
