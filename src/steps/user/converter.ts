import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { User } from '../../types';

export function getUserKey(id: string) {
  return `probely_user:${id}`;
}

export function createUserEntity(user: User): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _key: getUserKey(user.id),
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        id: user.id,
        username: user.email,
        name: user.name,
        email: user.email,
        active: true,
        isBillingAdmin: user.is_billing_admin,
        isApiUser: user.is_apiuser,
        modifiedOn: parseTimePropertyValue(user.changed),
      },
    },
  });
}
