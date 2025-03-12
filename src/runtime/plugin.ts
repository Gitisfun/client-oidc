import { Oidc } from './utils/oidc'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  const oidc = new Oidc()
  _nuxtApp.provide('oidc', oidc)
})
