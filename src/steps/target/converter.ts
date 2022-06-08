import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { Target } from '../../types';

export function getTargetKey(id: string) {
  return `probely_target:${id}`;
}

export function createUserEntity(target: Target): Entity {
  return createIntegrationEntity({
    entityData: {
      source: target,
      assign: {
        _key: getTargetKey(target.id),
        _type: Entities.TARGET._type,
        _class: Entities.TARGET._class,
        id: target.id,
        name: `${target.name}:${target.site.name}`,
        scanProfile: target.scan_profile,
        type: target.type,
        lows: target.lows,
        mediums: target.mediums,
        highs: target.highs,
        risk: target.risk || undefined,
        isActive: target.enabled,
        environment: target.environment,
        reportType: target.report_type,
        modifiedOn: parseTimePropertyValue(target.changed),
        reducedScope: target.reduced_scope,
        scheduleIncremental: target.schedule_incremental,
        scheduleReducedScope: target.schedule_reduced_scope,
        crawlSequencesOnly: target.crawl_sequences_only,
        scheduleCrawlSequencesOnly: target.schedule_crawl_sequences_only,
        'site.id': target.site.id,
        'site.url': target.site.url,
        'site.host': target.site.host,
        'site.modifiedOn': parseTimePropertyValue(target.site.changed),
      },
    },
  });
}
