import { URL, URLSearchParams } from 'url';
import fetch, { Response } from 'node-fetch';
import { retry } from '@lifeomic/attempt';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import { Account, Finding, Paginated, Profile, Target, User } from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private readonly paginateEntitiesPerPage = 30;

  private withBaseUri = (path: string, params?: Record<string, string>) => {
    const url = new URL(`https://api.probely.com/${path}`);
    url.search = new URLSearchParams(params).toString();
    return url.toString();
  };

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  public async request<T>(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<T> {
    try {
      const result = await retry<Response>(
        async () => {
          const response = await fetch(uri, {
            method,
            headers: {
              Authorization: `JWT ${this.config.accessToken}`,
            },
          });

          this.checkStatus(response);

          return response;
        },
        {
          // Documentation has no info on rate limiting
          // use exponential backoff with default config
          delay: 5000,
          factor: 2,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );
      return (await result.json()) as T;
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const endpoint = this.withBaseUri('profile/');
    try {
      await this.request<Account>(endpoint);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async getAccount(): Promise<Account> {
    const endpoint = this.withBaseUri('account/');
    return this.request<Account>(endpoint);
  }

  public async getProfile(): Promise<Profile> {
    const endpoint = this.withBaseUri('profile/');
    return this.request<Profile>(endpoint);
  }

  public async iteratePaginatedEntities<T>(
    path: string,
    iteratee: ResourceIteratee<T>,
  ) {
    let curPage = 1;
    let totalPages: number;

    do {
      const endpoint = this.withBaseUri(path, {
        page: `${curPage}`,
        length: `${this.paginateEntitiesPerPage}`,
      });
      const { page, page_total, results } = await this.request<Paginated<T>>(
        endpoint,
      );

      for (const entity of results) {
        await iteratee(entity);
      }

      totalPages = page_total;
      curPage = page + 1;
    } while (curPage <= totalPages);
  }

  public async iterateUsers(iteratee: ResourceIteratee<User>) {
    await this.iteratePaginatedEntities<User>('users/', iteratee);
  }

  public async iterateTargets(iteratee: ResourceIteratee<Target>) {
    await this.iteratePaginatedEntities<Target>('targets/', iteratee);
  }

  public async iterateFindingsInTarget(
    targetId: string,
    iteratee: ResourceIteratee<Finding>,
  ) {
    await this.iteratePaginatedEntities<Finding>(
      `targets/${targetId}/findings/`,
      iteratee,
    );
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
