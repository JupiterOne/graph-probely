import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import {
  ACCOUNT_ENTITY_KEY,
  IntegrationSteps,
  Entities,
  Relationships,
} from '../constants';
import { createUserEntity } from './converter';

export async function fetchTargetDetails({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateTargets(async (target) => {
    const targetEntity = createUserEntity(target);

    await jobState.addEntity(targetEntity);
    if (accountEntity && targetEntity) {
      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: accountEntity,
          to: targetEntity,
        }),
      );
    }
  });
}

export const targetSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.TARGETS,
    name: 'Fetch Targets',
    entities: [Entities.TARGET],
    relationships: [Relationships.ACCOUNT_HAS_TARGET],
    dependsOn: [IntegrationSteps.ACCOUNT],
    executionHandler: fetchTargetDetails,
  },
];
