import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  displayName?: string;
  @Column()
  email?: string;
  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.createdBy)
  questionnaires: Questionnaire[];
}
