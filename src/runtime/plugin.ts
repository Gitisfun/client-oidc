import { Oidc } from './utils/oidc'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  console.log('%c OOTS Module is loaded', 'color: green')
  const oidc = new Oidc()
  _nuxtApp.provide('oidc', oidc)
})
