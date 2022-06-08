import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const targetSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.probely.com/targets/
     * PATTERN: Fetch Entities
     */
    id: 'fetch-targets',
    name: 'Fetch Targets',
    entities: [
      {
        resourceName: 'Target',
        _type: 'probely_target',
        _class: ['Application'],
      },
    ],
    relationships: [
      {
        _type: 'probely_account_has_target',
        sourceType: 'probely_account',
        _class: RelationshipClass.HAS,
        targetType: 'probely_target',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
