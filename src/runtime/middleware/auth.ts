import { Oidc } from './../utils/oidc'
import {
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  navigateTo,
} from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const oidc = new Oidc()
  const token = await oidc.getTokenSet()

  if (!token.value) {
    const { endpoints } = useRuntimeConfig().public.clientOidc
    return navigateTo(`${endpoints?.baseUrl}${endpoints?.login}`)
  }
})
