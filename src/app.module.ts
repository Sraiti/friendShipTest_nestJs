import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from 'config/config.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { Choice, Question } from './question/entities/question.entity';
import { Questionnaire } from './questionnaire/entities/questionnaire.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { User } from './user/entities/user.entity';
import { EnumsModule } from './enums/enums.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
    }),
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Choice, Question, Questionnaire, User],
      synchronize: true,
    }),
    EnumsModule,
    QuestionModule,
    QuestionnaireModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
