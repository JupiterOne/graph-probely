import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.probely.com/users/
     * PATTERN: Fetch Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'probely_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'probely_account_has_user',
        sourceType: 'probely_account',
        _class: RelationshipClass.HAS,
        targetType: 'probely_user',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
