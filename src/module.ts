import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path/posix'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerHandler,
  addRouteMiddleware,
  addServerImportsDir,
  extendPages,
} from '@nuxt/kit'
import { defu } from 'defu'
import { SESSION_MAX_AGE_ONE_HOUR } from './runtime/utils/constants'
import type {
  Endpoints,
  OidcProvider,
  Session,
  JwtConfig,
} from './runtime/types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  appName: string
  isEnabled: boolean
  isDev: boolean
  endpoints?: Endpoints
  config: OidcProvider
  session: Session
  jwt?: JwtConfig
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'client-oidc',
    configKey: 'clientOidc',
    version: '1.0.0',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    appName: 'nuxt-app',
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
      isTokenValidationSkipped: false,
    },
    session: {
      password: '80d42cfb-1cd2-462c-8f17-e3237d9027e9',
      maxAge: SESSION_MAX_AGE_ONE_HOUR,
    },
    jwt: {
      clientSecret: '',
      providerUrl: '',
    },
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    _nuxt.options.runtimeConfig.clientOidc = defu(
      _nuxt.options.runtimeConfig.clientOidc,
      {
        appName: _options.appName,
        config: _options.config,
        session: _options.session,
      }
    )

    _nuxt.options.runtimeConfig.public.clientOidc = defu(
      _nuxt.options.runtimeConfig.public.clientOidc,
      {
        isEnabled: _options.isEnabled,
        isDev: _options.isDev,
        endpoints: _options.endpoints,
      }
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

    extendPages((pages) => {
      pages.unshift({
        name: 'authenticatedPage',
        path: '/authenticated-page',
        file: resolver.resolve('runtime/pages/authenticatedPage.vue'),
      })
    })

    addServerImportsDir(resolver.resolve('./runtime/server/utils'))

    const runtimeDir = fileURLToPath(
      new URL('./runtime', import.meta.url)
    ).replace(/\\/g, '/')

    _nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))
  },
})
