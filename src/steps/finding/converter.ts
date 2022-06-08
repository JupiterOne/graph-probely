import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { Finding, FindingState } from '../../types';

export function getFindingKey(targetId: string, findingId) {
  return `probely_finding:${targetId}:${findingId}`;
}

// TODO: might need to be looked at again in the future.
// From their API docs:
// string (findingSeverity)
// Enum: 10 20 30
// Filter by finding severity
function severityToImpact(severityValue: number): string {
  if (severityValue === 10) {
    return 'low';
  } else if (severityValue === 20) {
    return 'medium';
  } else if (severityValue === 30) {
    return 'high';
  }
  return 'unknown';
}

export function createFindingEntity(finding: Finding): Entity {
  return createIntegrationEntity({
    entityData: {
      source: finding,
      assign: {
        _key: getFindingKey(finding.target.id, finding.id),
        _type: Entities.FINDING._type,
        _class: Entities.FINDING._class,
        id: finding.id,
        name: `${finding.id}:${finding.url}:${finding.method}:${finding.insertion_point}`,
        // TODO: category in later iterations
        category: finding.insertion_point,
        severity: severityToImpact(finding.severity),
        numericSeverity: finding.severity,
        open: finding.state === FindingState.NOT_FIXED,
        state: finding.state,
        targetId: finding.target.id,
        assignee: finding.assignee?.id,
        cvssScore: finding.cvss_score,
        cvssVector: finding.cvss_vector,
        modifiedOn: parseTimePropertyValue(finding.changed),
        lastFoundOn: parseTimePropertyValue(finding.last_found),
      },
    },
  });
}
