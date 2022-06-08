# Development

This integration focuses on [Probelyl](https://probely.com/) and is using
[Probely API](https://developers.probely.com/) for interacting with the Asana
resources.

## Provider account setup

### In Probely

1. Get Access Token
   - From the login server, you can obtain the access token.
     1. Setup the `.env` file with the appropriate credentials as well as
        account type.
     2. Start the login server.
     3. Once you access on the browser, there should be a link to
        `Get Probely Access Token`. Click on it.

## Authentication

Provide the `ACCESS_TOKEN` to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The Access token will be used to authorize requests.
