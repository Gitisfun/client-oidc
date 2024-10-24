import { Oidc } from './../utils/oidc'
import Logger from './../utils/logger'
import {
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  navigateTo,
} from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const oidc = new Oidc()
  const isLoggedIn = await oidc.isLoggedIn()

  Logger.info(`Authenticated middleware: User authentication status - ${isLoggedIn ? 'Authenticated' : 'Not Authenticated'}.`)

  if (!isLoggedIn) {
    const { endpoints } = useRuntimeConfig().public.clientOidc
    return navigateTo(`${endpoints?.baseUrl}${endpoints?.login}`)
  }
})
