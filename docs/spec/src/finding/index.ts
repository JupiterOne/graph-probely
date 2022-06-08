import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const findingSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.probely.com/targets/{{target_id}}/findings/
     * PATTERN: Fetch Child Entities
     */
    id: 'fetch-and-build-target-findings',
    name: 'Fetch and Build Target Findings',
    entities: [
      {
        resourceName: 'Finding',
        _type: 'probely_finding',
        _class: ['Finding'],
      },
    ],
    relationships: [
      {
        _type: 'probely_target_has_finding',
        sourceType: 'probely_target',
        _class: RelationshipClass.HAS,
        targetType: 'probely_finding',
      },
    ],
    dependsOn: ['fetch-targets'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: https://api.probely.com/targets/{{target_id}}/findings/
     * PATTERN: Build Child Relationships
     */
    id: 'build-user-assigned-finding-relationship',
    name: 'Build User Assigned Finding Relationship',
    entities: [],
    relationships: [
      {
        _type: 'probely_user_assigned_finding',
        sourceType: 'probely_user',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'probely_finding',
      },
    ],
    dependsOn: ['fetch-and-build-target-findings', 'fetch-users'],
    implemented: true,
  },
];
