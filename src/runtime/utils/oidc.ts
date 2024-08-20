import type { TokenSetParameters } from 'openid-client'
import { UrlBuilder } from './UrlBuilder'
import { isAuthenticated } from './index'
import { useFetch } from '#app'
import { useRuntimeConfig } from '#imports'

export class Oidc {
  ENDPOINT_LOGIN: string
  ENDPOINT_LOGOUT: string
  ENDPOINT_USERINFO: string
  ENDPOINT_TOKEN: string
  constructor() {
    const { endpoints } = useRuntimeConfig().public.clientOidc
    this.ENDPOINT_LOGIN = `${endpoints?.baseUrl}${endpoints?.login}`
    this.ENDPOINT_LOGOUT = `${endpoints?.baseUrl}${endpoints?.logout}`
    this.ENDPOINT_USERINFO = `${endpoints?.baseUrl}${endpoints?.userinfo}`
    this.ENDPOINT_TOKEN = `${endpoints?.baseUrl}${endpoints?.accessToken}`
  }

  async login(postLoginRedirectUrl: string = '/', language?: string) {
    const url = new UrlBuilder(this.ENDPOINT_LOGIN)
    if (language) url.append('language', language)
    if (postLoginRedirectUrl) url.append('postLoginUrl', postLoginRedirectUrl)
    window.location.replace(url.toString())
  }

  async logout(postLogoutUrl: string = '/') {
    const url = new UrlBuilder(this.ENDPOINT_LOGOUT)
    if (postLogoutUrl) url.append('postLogoutUrl', postLogoutUrl)
    window.location.replace(url.toString())
  }

  async getUser() {
    const { data } = await useFetch(this.ENDPOINT_USERINFO)
    return data
  }

  async getTokenSet() {
    const { data } = await useFetch(this.ENDPOINT_TOKEN)
    return data
  }

  async isAuthorized() {
    // TODO: implement authorized by roles
    console.log('Implement')
  }

  async isLoggedIn() {
    const { data } = await useFetch<Partial<TokenSetParameters>>(this.ENDPOINT_TOKEN)
    return isAuthenticated(data.value!)
  }
}
