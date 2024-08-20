import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["clientOidc"]?: typeof import("/Users/christianvandenputtelaar/Desktop/tijdelijk/client-oidc/src/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,  modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["/Users/christianvandenputtelaar/Desktop/tijdelijk/client-oidc/src/module", Exclude<NuxtConfig["clientOidc"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["clientOidc"]?: typeof import("/Users/christianvandenputtelaar/Desktop/tijdelijk/client-oidc/src/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,  modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["/Users/christianvandenputtelaar/Desktop/tijdelijk/client-oidc/src/module", Exclude<NuxtConfig["clientOidc"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },
  }
  interface PublicRuntimeConfig {
   clientOidc: {
      isEnabled: boolean,

      config: {
         issuer: string,

         clientId: string,

         clientSecret: string,

         redirectUrl: string,

         postLogoutRedirectUris: string,

         acrValues: string,

         scope: string,

         allowedRoles: string,

         response_type: string,

         id_token_signed_response_alg: string,

         userinfo_signed_response_alg: string,

         authorizationUri: string,

         tokenUri: string,

         jwkUri: string,

         userInfoUri: string,

         introspectionUri: string,

         endSessionUri: string,
      },

      endpoints: {
         baseUrl: string,

         login: string,

         loginCallback: string,

         accessToken: string,

         userinfo: string,

         logout: string,

         logoutCallback: string,
      },

      sessionConfig: {
         name: string,

         password: string,

         httpOnly: boolean,

         secure: boolean,

         sameSite: boolean,

         maxAge: number,
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }