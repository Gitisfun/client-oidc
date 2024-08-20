import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerHandler,
  addRouteMiddleware,
} from '@nuxt/kit'
import { defu } from 'defu'
import { SESSION_MAX_AGE_ONE_HOUR } from './runtime/utils/constants'
import type { Endpoints, OidcProvider, SessionConfig } from './runtime/types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  isEnabled: boolean
  endpoints?: Endpoints
  config: OidcProvider
  sessionConfig?: SessionConfig
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'oots-fas',
    configKey: 'ootsFas',
    version: '1.0.0',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    isEnabled: true,
    endpoints: {
      baseUrl: '',
      login: '/login',
      loginCallback: '/loginCallback',
      accessToken: '/accesstoken',
      userinfo: '/userinfo',
      logout: '/logout',
      logoutCallback: '/logoutCallback',
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
    sessionConfig: {
      name: 'ootsfassession',
      password: '80d42cfb-1cd2-462c-8f17-e3237d9027e9',
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: SESSION_MAX_AGE_ONE_HOUR,
    },
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    if (_options?.isEnabled) {
      _nuxt.options.runtimeConfig.public.ootsFas = defu(
        _nuxt.options.runtimeConfig.public.ootsFas,
        {
          isEnabled: _options.isEnabled,
          config: _options.config,
          endpoints: _options.endpoints,
          sessionConfig: _options.sessionConfig,
        },
      )

      addServerHandler({
        route: `${_options?.endpoints?.baseUrl}${_options?.endpoints?.login}`,
        handler: resolver.resolve('./runtime/server/routes/login'),
      })
      addServerHandler({
        route: `${_options?.endpoints?.baseUrl}${_options?.endpoints?.loginCallback}`,
        handler: resolver.resolve('./runtime/server/routes/loginCallback'),
      })
      addServerHandler({
        route: `${_options?.endpoints?.baseUrl}${_options?.endpoints?.logout}`,
        handler: resolver.resolve('./runtime/server/routes/logout'),
      })
      addServerHandler({
        route: `${_options?.endpoints?.baseUrl}${_options?.endpoints?.logoutCallback}`,
        handler: resolver.resolve('./runtime/server/routes/logoutCallback'),
      })
      addServerHandler({
        route: `${_options?.endpoints?.baseUrl}${_options?.endpoints?.accessToken}`,
        handler: resolver.resolve('./runtime/server/routes/tokenset'),
      })
      addServerHandler({
        route: `${_options?.endpoints?.baseUrl}${_options?.endpoints?.userinfo}`,
        handler: resolver.resolve('./runtime/server/routes/user'),
      })
      addServerHandler({
        route: `/error`,
        handler: resolver.resolve('./runtime/server/routes/error'),
      })

      addRouteMiddleware({
        name: 'oots-fas-auth-middleware',
        path: resolver.resolve('./runtime/middleware/auth'),
        global: false,
      })
      addPlugin(resolver.resolve('./runtime/plugin'))
    }
  },
})
