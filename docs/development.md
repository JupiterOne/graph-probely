# Development

This integration focuses on [Probely](https://probely.com/) and is using
[Probely API](https://developers.probely.com/) for interacting with the Asana
resources.

## Provider account setup

### In Probely

1. Select Target in the dashboard (Overview > Select target).
2. Navigate to the "Settings" page and then the "Integrations" tab.
3. Under API Keys, generate a new key and store it in .env as `ACCESS_TOKEN`
   value.

## Authentication

Provide the `ACCESS_TOKEN` to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The Access token will be used to authorize requests.
