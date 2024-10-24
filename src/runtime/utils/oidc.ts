import type { TokenSetParameters } from 'openid-client'
import { UrlBuilder, constructEndpoint } from './UrlBuilder'
import { useFetch } from '#app'
import { useRuntimeConfig } from '#imports'

export class Oidc {
  private readonly ENDPOINT_LOGIN: string
  private readonly ENDPOINT_LOGOUT: string
  private readonly ENDPOINT_USERINFO: string
  private readonly ENDPOINT_TOKEN: string
  private readonly ENDPOINT_AUTHENTICATED: string

  constructor() {
    const { login, logout, userinfo, accessToken, authenticated } = useRuntimeConfig().public.clientOidc.endpoints

    this.ENDPOINT_LOGIN = constructEndpoint(login)
    this.ENDPOINT_LOGOUT = constructEndpoint(logout)
    this.ENDPOINT_USERINFO = constructEndpoint(userinfo)
    this.ENDPOINT_TOKEN = constructEndpoint(accessToken)
    this.ENDPOINT_AUTHENTICATED = constructEndpoint(authenticated)
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
    console.log('Function not implemented yet...')
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
