import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path/posix'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerHandler,
  addRouteMiddleware,
} from '@nuxt/kit'
import { defu } from 'defu'
import type { Endpoints, OidcProvider } from './runtime/types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  isEnabled: boolean
  isDev: boolean
  endpoints?: Endpoints
  config: OidcProvider
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'client-oidc',
    configKey: 'clientOidc',
    version: '1.0.0',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    isEnabled: true,
    isDev: false,
    endpoints: {
      login: '/login',
      loginCallback: '/loginCallback',
      accessToken: '/accesstoken',
      userinfo: '/userinfo',
      logout: '/logout',
      logoutCallback: '/logoutCallback',
      authenticated: '/authenticated',
      introspect: '/api/introspect',
    },
    config: {
      issuer: '',
      clientId: '',
      clientSecret: '',
      redirectUrl: '',
      postLogoutRedirectUris: '',
      acrValues: '',
      scope: '',
      allowedRoles: '',
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
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    _nuxt.options.runtimeConfig.clientOidc = defu(
      _nuxt.options.runtimeConfig.clientOidc,
      {
        config: _options.config,
      },
    )

    _nuxt.options.runtimeConfig.public.clientOidc = defu(
      _nuxt.options.runtimeConfig.public.clientOidc,
      {
        isEnabled: _options.isEnabled,
        endpoints: _options.endpoints,
      },
    )

    addServerHandler({
      route: `${_options.endpoints?.login}`,
      handler: resolver.resolve('./runtime/server/routes/login'),
    })
    addServerHandler({
      route: `${_options.endpoints?.loginCallback}`,
      handler: resolver.resolve('./runtime/server/routes/loginCallback'),
    })
    addServerHandler({
      route: `${_options.endpoints?.logout}`,
      handler: resolver.resolve('./runtime/server/routes/logout'),
    })
    addServerHandler({
      route: `${_options.endpoints?.logoutCallback}`,
      handler: resolver.resolve('./runtime/server/routes/logoutCallback'),
    })
    addServerHandler({
      route: `${_options.endpoints?.accessToken}`,
      handler: resolver.resolve('./runtime/server/routes/tokenset'),
    })
    addServerHandler({
      route: `${_options.endpoints?.userinfo}`,
      handler: resolver.resolve('./runtime/server/routes/user'),
    })
    addServerHandler({
      route: `${_options.endpoints?.authenticated}`,
      handler: resolver.resolve('./runtime/server/routes/authenticated'),
    })
    addServerHandler({
      route: `${_options.endpoints?.introspect}`,
      handler: resolver.resolve('./runtime/server/api/introspect'),
    })
    addServerHandler({
      route: `/error`,
      handler: resolver.resolve('./runtime/server/routes/error'),
    })

    addRouteMiddleware({
      name: 'client-oidc-auth-middleware',
      path: resolver.resolve('./runtime/middleware/auth'),
      global: false,
    })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    _nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))
  },
})
