export default defineNuxtConfig({
  modules: ['../src/module'],
  devServer: {
    port: 8080,
  },
  myModule: {},
  devtools: { enabled: true },
  compatibilityDate: '2024-07-18',
  clientOidc: {
    // Add config here
  },
})
