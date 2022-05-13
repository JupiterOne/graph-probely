import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { IntegrationSteps, Entities, Relationships } from '../constants';
import { getUserKey } from '../user/converter';
import { createFindingEntity } from './converter';

export async function fetchTargetFindings({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.TARGET._type },
    async (targetEntity) => {
      const targetId = targetEntity.id;
      await apiClient.iterateFindingsInTarget(
        targetId as string,
        async (finding) => {
          const findingEntity = createFindingEntity(finding);

          await jobState.addEntity(findingEntity);
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: targetEntity,
              to: findingEntity,
            }),
          );
        },
      );
    },
  );
}

export async function buildUserAssignedFindingRelationship({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.FINDING._type },
    async (findingEntity) => {
      const userId = findingEntity.assignee;

      if (!userId) {
        return;
      }

      const userEntity = await jobState.findEntity(
        getUserKey(userId as string),
      );

      if (userEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.ASSIGNED,
            from: userEntity,
            to: findingEntity,
          }),
        );
      }
    },
  );
}

export const findingSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.FETCH_AND_BUILD_TARGET_FINDINGS,
    name: 'Fetch and Build Target Findings',
    entities: [Entities.FINDING],
    relationships: [Relationships.TARGET_HAS_FINDING],
    dependsOn: [IntegrationSteps.TARGETS],
    executionHandler: fetchTargetFindings,
  },
  {
    id: IntegrationSteps.BUILD_USER_ASSIGNED_FINDING_RELATIONSHIP,
    name: 'Build User Assigned Finding Relationship',
    entities: [],
    relationships: [Relationships.USER_ASSIGNED_FINDING],
    dependsOn: [
      IntegrationSteps.FETCH_AND_BUILD_TARGET_FINDINGS,
      IntegrationSteps.USERS,
    ],
    executionHandler: buildUserAssignedFindingRelationship,
  },
];
