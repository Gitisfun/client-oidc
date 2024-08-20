import { Oidc } from './../utils/oidc'
import { defineNuxtRouteMiddleware, useRuntimeConfig } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const oidc = new Oidc()
  const token = await oidc.getTokenSet()

  if (!token.value) {
    const { endpoints } = useRuntimeConfig().public.ootsFas
    return navigateTo(`${endpoints?.baseUrl}${endpoints?.login}`)
  }
})
