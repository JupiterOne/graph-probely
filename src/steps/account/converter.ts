import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { Account, Profile } from '../../types';

export function getAccountKey(id: string) {
  return `probely_account:${id}`;
}

export function createAccountEntity(
  account: Account,
  profile: Profile,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: { ...account, ...profile },
      assign: {
        _key: getAccountKey(profile.id),
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        id: profile.id,
        name: profile.name,
        email: profile.email,
        isBillingAdmin: profile.is_billing_admin,
        isApiUser: profile.is_apiuser,
        isSSO: profile.is_sso,
        isOwner: profile.is_owner,
        lastLoggedOn: parseTimePropertyValue(profile.last_login),
        modifiedOn: parseTimePropertyValue(profile.changed),
      },
    },
  });
}
