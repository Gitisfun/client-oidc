import { Oidc } from './../utils/oidc'
import Logger from './../utils/logger'
import {
  defineNuxtRouteMiddleware,
  navigateTo,
} from '#imports'

export default defineNuxtRouteMiddleware(async (event) => {
  const oidc = new Oidc()
  const isLoggedIn = await oidc.isLoggedIn()

  Logger.info(`Authenticated middleware: User authentication status - ${isLoggedIn ? 'Authenticated' : 'Not Authenticated'}.`)

  if (!isLoggedIn) {
    const url = `/authenticated-page?postLoginUrl=${event?.fullPath}`
    Logger.info(`Navigating to ${event?.fullPath} after login.`)
    return await navigateTo(url)
  }
})
