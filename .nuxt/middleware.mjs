import validate from "/Users/christianvandenputtelaar/Desktop/tijdelijk/client-oidc/node_modules/.pnpm/nuxt@3.12.3_@parcel+watcher@2.4.1_@types+node@20.14.11_eslint@9.7.0_ioredis@5.4.1_magicast@0._7kzqt6gviqmcwelnt73j7o54hi/node_modules/nuxt/dist/pages/runtime/validate.js";
import manifest_45route_45rule from "/Users/christianvandenputtelaar/Desktop/tijdelijk/client-oidc/node_modules/.pnpm/nuxt@3.12.3_@parcel+watcher@2.4.1_@types+node@20.14.11_eslint@9.7.0_ioredis@5.4.1_magicast@0._7kzqt6gviqmcwelnt73j7o54hi/node_modules/nuxt/dist/app/middleware/manifest-route-rule.js";
export const globalMiddleware = [
  validate,
  manifest_45route_45rule
]
export const namedMiddleware = {
  "client-oidc-auth-middleware": () => import("/Users/christianvandenputtelaar/Desktop/tijdelijk/client-oidc/src/runtime/middleware/auth.ts")
}