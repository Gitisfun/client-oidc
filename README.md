<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# client-oidc for Nuxt 3

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
npx nuxi module add client-oidc
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

That's it! You can now use client-oidc in your Nuxt app ✨


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
