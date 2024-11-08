import { defineEventHandler, sendRedirect, getQuery } from 'h3'
import { generators } from 'openid-client'
import type { AuthorizationParameters } from 'openid-client'
import { getTokenSetSession, getLoginSession } from './../utils/session'
import { initClient } from './../../utils/client'
import Logger from './../../utils/logger'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  try {
    const queryParams = getQuery(event)
    const { config } = useRuntimeConfig().clientOidc
    let postLoginUrl = useRuntimeConfig().app.baseURL

    if (queryParams?.postLoginUrl) {
      postLoginUrl += `${queryParams?.postLoginUrl}`
      postLoginUrl = postLoginUrl.replace(/\/\//g, '/')
    }

    Logger.info(`Post login url: ${postLoginUrl}`)

    const tokenSetSession = await getTokenSetSession(event)

    if (tokenSetSession.data?.tokenSet?.access_token)
      return sendRedirect(event, postLoginUrl)
    else {
      const client = await initClient([config.redirectUrl])

      const state = generators.state()
      const nonce = generators.nonce()

      const parameters: AuthorizationParameters = {
        scope: config.scope,
        response_type: config.response_type,
        redirect_uri: config.redirectUrl,
        state,
        nonce,
        acr_values: config.acrValues,
      }

      if (queryParams?.locale) {
        parameters.ui_locales = queryParams?.locale as string
      }

      Logger.info(`Locale: ${queryParams?.locale}`)

      const authorizationUrl = client.authorizationUrl(parameters)

      Logger.info(`AuthorizationUrl: ${authorizationUrl}`)

      const loginSession = await getLoginSession(event)
      await loginSession.update({
        state,
        nonce,
        postLoginUrl,
      })

      return sendRedirect(event, authorizationUrl)
    }
  }
  catch (error) {
    Logger.error(error.stack)
    return sendRedirect(event, `/error`)
  }
})
