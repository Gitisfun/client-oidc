<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Client-oidc for Nuxt 3

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A basic implementation for an oidc client for Nuxt 3.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add client-oidc
```

or

```bash
npm install client-oidc
```

```javascript
export default defineNuxtConfig({
  ...
  modules: ["client-oidc"],
  ...
});
```

And manually add client-oidc in nuxt.config.ts

```javascript
export default defineNuxtConfig({
  ...
  clientOidc: {
    // Add your config here
  },
  ...
});
```

## Config options

There are different options possible in the config. Some are mandatory and others are optional. Here follows a list of all options:

```javascript
export default defineNuxtConfig({
  ...
  clientOidc: {
    isEnabled: '', // Type: Boolean - Enable or disable the module easily
    config: {
      issuer: '', // * Type: String - The OIDC provider which authenticates users and issues ID tokens, access tokens, ...
      clientId: '', // * Type: String - A unique identifier assigned to a client application, used to identify and authenticate the client when interacting with the OIDC provider.
      clientSecret: '', // * Type: String
      redirectUrl: '', // * Type: String
      acrValues: '', // * Type: String
      scope: '', // * Type: String
      allowedRoles: '', // * Type: String
      postLogoutRedirectUris: '', // * Type: String
      response_type: 'code',
      id_token_signed_response_alg: 'RS256',
      userinfo_signed_response_alg: 'RS256',
      authorizationUri: '/authorize',
      tokenUri: '/access_token',
      jwkUri: '/connect/jwk_uri',
      userInfoUri: '/userinfo',
      introspectionUri: '/introspect',
      endSessionUri: '/connect/endSession',
    },
    endpoints: {
      baseUrl: '', // Type: String
      login: '', // Type: String
      loginCallback: '', // Type: String
      accessToken: '', // Type: String
      userinfo: '', // Type: String
      logout: '', // Type: String
      logoutCallback: '', // * Type: String
    },
    sessionConfig: {
      name: '',
      password: '',
      httpOnly: '',
      secure: '',
      sameSite: '',
      maxAge: '',
    },
  },
  ...
});
```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://www.npmjs.com/package/client-oidc
[npm-version-href]: https://www.npmjs.com/package/client-oidc

[npm-downloads-src]: https://www.npmjs.com/package/client-oidc
[npm-downloads-href]: https://www.npmjs.com/package/client-oidc

[license-src]: https://www.npmjs.com/package/client-oidc
[license-href]: https://www.npmjs.com/package/client-oidc

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
