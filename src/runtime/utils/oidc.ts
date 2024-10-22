import type { TokenSetParameters } from 'openid-client'
import { UrlBuilder } from './UrlBuilder'
import { useFetch } from '#app'
import { useRuntimeConfig } from '#imports'

export class Oidc {
  private readonly ENDPOINT_LOGIN: string
  private readonly ENDPOINT_LOGOUT: string
  private readonly ENDPOINT_USERINFO: string
  private readonly ENDPOINT_TOKEN: string
  private readonly ENDPOINT_AUTHENTICATED: string

  constructor() {
    const { baseUrl, login, logout, userinfo, accessToken, authenticated } = useRuntimeConfig().public.clientOidc.endpoints

    this.ENDPOINT_LOGIN = `${baseUrl}${login}`
    this.ENDPOINT_LOGOUT = `${baseUrl}${logout}`
    this.ENDPOINT_USERINFO = `${baseUrl}${userinfo}`
    this.ENDPOINT_TOKEN = `${baseUrl}${accessToken}`
    this.ENDPOINT_AUTHENTICATED = `${baseUrl}${authenticated}`
  }

  async login(locale?: string, postLoginRedirectUrl: string) {
    const isUserLoggedIn = await this.isLoggedIn()
    if (!isUserLoggedIn) {
      const url = new UrlBuilder(this.ENDPOINT_LOGIN)
      if (locale) url.append('locale', locale)
      if (postLoginRedirectUrl) url.append('postLoginUrl', postLoginRedirectUrl)
      window.location.replace(url.toString())
    }
  }

  async logout(postLogoutUrl: string) {
    const isUserLoggedIn = await this.isLoggedIn()
    if (isUserLoggedIn) {
      const url = new UrlBuilder(this.ENDPOINT_LOGOUT)
      if (postLogoutUrl) url.append('postLogoutUrl', postLogoutUrl)
      window.location.replace(url.toString())
    }
  }

  async getUser() {
    try {
      const { data } = await useFetch(this.ENDPOINT_USERINFO)
      return data
    }
    catch (error) {
      return null
    }
  }

  async getTokenSet() {
    try {
      const { data } = await useFetch<TokenSetParameters>(this.ENDPOINT_TOKEN)
      return data
    }
    catch (error) {
      return null
    }
  }

  async isAuthorized() {
    // TODO: implement authorized by roles
    console.log('Implement')
  }

  async isLoggedIn() {
    try {
      const { data } = await useFetch(this.ENDPOINT_AUTHENTICATED)
      return data.value
    }
    catch (error) {
      return false
    }
  }
}
