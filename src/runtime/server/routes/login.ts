import { defineEventHandler, sendRedirect, getQuery } from 'h3'
import { generators } from 'openid-client'
import type { AuthorizationParameters } from 'openid-client'
import { getLoginSession, getTokenSetSession } from './../../utils/session'
import { initClient } from './../../utils/client'
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

      const authorizationUrl = client.authorizationUrl(parameters)

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
    console.log('FAS OID error')
    console.log(error)
    console.log('-------------')
    return sendRedirect(event, `/error`)
  }
})
