import { accountSteps } from './account';
import { userSteps } from './user';
import { targetSteps } from './target';
import { findingSteps } from './finding';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...targetSteps,
  ...findingSteps,
];

export { integrationSteps };
