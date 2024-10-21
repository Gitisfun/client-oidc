import { defineEventHandler, sendRedirect, getQuery } from 'h3'
import { isAuthenticated } from './../../utils/index'
import {
  getLoginSession,
  getTokenSetSession,
  getIdTokenSession,
} from './../../utils/session'
import { initClient } from './../../utils/client'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  try {
    const queryParams = getQuery(event)

    const loginSession = await getLoginSession(event)
    const tokenSetSession = await getTokenSetSession(event)
    const idTokenSession = await getIdTokenSession(event)

    if (queryParams?.postLogoutUrl)
      await loginSession.update({
        postLogoutUrl: queryParams.postLogoutUrl,
      })

    const isLoggedIn = isAuthenticated(tokenSetSession.data?.tokenSet)

    if (isLoggedIn) {
      const { config } = useRuntimeConfig().clientOidc
      const client = await initClient([config.redirectUrl])

      const idToken = idTokenSession.data?.id_token
      const endSessionUrl = client.endSessionUrl({
        id_token_hint: idToken,
        post_logout_redirect_uri: config.postLogoutRedirectUris,
      })

      return sendRedirect(event, endSessionUrl)
    }
  } catch (error) {
    console.log('FAS OID error')
    console.log(error)
    console.log('-------------')
    return sendRedirect(event, `/error`)
  }
})
