import { registerEnumType } from '@nestjs/graphql';

export enum QuestionnaireStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  RESTRICTED = 'restricted',
}

registerEnumType(QuestionnaireStatus, {
  name: 'Status',
  description: 'the status of the Questionnaire',
});

registerEnumType(Visibility, {
  name: 'Visibility',
  description: 'the Visibility of the Questionnaire',
});
