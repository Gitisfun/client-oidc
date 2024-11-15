import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "client-oidc-auth-middleware"
declare module "../../node_modules/.pnpm/nuxt@3.12.3_@parcel+watcher@2.4.1_@types+node@20.14.11_eslint@9.7.0_ioredis@5.4.1_magicast@0._7kzqt6gviqmcwelnt73j7o54hi/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}
declare module 'nitropack' {
  interface NitroRouteConfig {
    appMiddleware?: MiddlewareKey | MiddlewareKey[] | Record<MiddlewareKey, boolean>
  }
}