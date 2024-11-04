export default defineNuxtConfig({
  modules: ['../src/module'],
  devServer: {
    port: 8080,
  },
  app: {
    baseURL: '/iaf/hil/5/',
  },
  myModule: {},
  devtools: { enabled: true },
  compatibilityDate: '2024-07-18',
  runtimeConfig: {
    public: {
      clientOidc: {
        isEnabled: '',
        isDev: '',
        endpoints: {
          loginCallback: '',
          logoutCallback: '',
        },
      },
    },
    clientOidc: {
      config: {
        issuer: '',
        clientId: '',
        clientSecret: '',
        redirectUrl: '',
        acrValues: '',
        postLogoutRedirectUris: '',
        scope: '',
        allowedRoles: '',
      },
    },
  },
  clientOidc: {
    endpoints: {
      loginCallback: '/login/oauth2/code/fas',
      logoutCallback: '/logout/oauth2/code/fas',
    },
  },
})
