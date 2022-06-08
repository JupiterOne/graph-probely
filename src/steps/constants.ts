import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const ACCOUNT_ENTITY_KEY = 'entity:account';

export enum IntegrationSteps {
  ACCOUNT = 'fetch-account',
  USERS = 'fetch-users',
  TARGETS = 'fetch-targets',
  FETCH_AND_BUILD_TARGET_FINDINGS = 'fetch-and-build-target-findings',
  BUILD_USER_ASSIGNED_FINDING_RELATIONSHIP = 'build-user-assigned-finding-relationship',
}

export const Entities: Record<
  'ACCOUNT' | 'USER' | 'TARGET' | 'FINDING',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'probely_account',
    _class: ['Account'],
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        isBillingAdmin: { type: 'boolean' },
        isApiUser: { type: 'boolean' },
        isSSO: { type: 'boolean' },
        isOwner: { type: 'boolean' },
        lastLoggedOn: { type: 'number' },
        modifiedOn: { type: 'number' },
      },
      required: ['id'],
    },
  },
  USER: {
    resourceName: 'User',
    _type: 'probely_user',
    _class: ['User'],
    schema: {
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        active: { type: 'boolean' },
        isBillingAdmin: { type: 'boolean' },
        isApiUser: { type: 'boolean' },
        modifiedOn: { type: 'number' },
      },
      required: ['id'],
    },
  },
  TARGET: {
    resourceName: 'Target',
    _type: 'probely_target',
    _class: ['Application'],
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        scanProfile: { type: 'string' },
        type: { type: 'string' },
        lows: { type: 'number' },
        mediums: { type: 'number' },
        highs: { type: 'number' },
        risk: { type: 'number' },
        isActive: { type: 'boolean' },
        environment: { type: 'string' },
        reportType: { type: 'string' },
        modifiedOn: { type: 'number' },
        reducedScope: { type: 'boolean' },
        scheduleIncremental: { type: 'boolean' },
        scheduleReducedScope: { type: 'boolean' },
        crawlSequencesOnly: { type: 'boolean' },
        scheduleCrawlSequencesOnly: { type: 'boolean' },
        'site.id': { type: 'string' },
        'site.url': { type: 'string' },
        'site.host': { type: 'string' },
        'site.modifiedOn': { type: 'number' },
      },
      required: ['id'],
    },
  },
  FINDING: {
    resourceName: 'Finding',
    _type: 'probely_finding',
    _class: ['Finding'],
    schema: {
      properties: {
        id: { type: 'number' },
        category: { type: 'string' },
        severity: { type: 'string' },
        numericSeverity: { type: 'number' },
        open: { type: 'boolean' },
        state: { type: 'string' },
        targetId: { type: 'string' },
        assigneeId: { type: 'string' },
        cvssScore: { type: 'number' },
        cvssVector: { type: 'string' },
        modifiedOn: { type: 'number' },
        lastFoundOn: { type: 'number' },
      },
      required: ['category', 'severity', 'numericSeverity', 'open'],
    },
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_USER'
  | 'ACCOUNT_HAS_TARGET'
  | 'TARGET_HAS_FINDING'
  | 'USER_ASSIGNED_FINDING',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'probely_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_TARGET: {
    _type: 'probely_account_has_target',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.TARGET._type,
  },
  TARGET_HAS_FINDING: {
    _type: 'probely_target_has_finding',
    sourceType: Entities.TARGET._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.FINDING._type,
  },
  USER_ASSIGNED_FINDING: {
    _type: 'probely_user_assigned_finding',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.FINDING._type,
  },
};
