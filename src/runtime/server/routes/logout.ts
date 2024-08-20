import { defineEventHandler, sendRedirect } from 'h3'
import { isAuthenticated } from './../../utils/index'
import { getCurrentSession } from './../../utils/session'
import { initClient } from './../../utils/client'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  try {
    console.log('Logout route')

    const queryParams = getQuery(event)

    const session = await getCurrentSession(event)

    if (queryParams?.postLogoutUrl)
      await session.update({
        postLogoutUrl: queryParams.postLogoutUrl,
      })

    const isLoggedIn = isAuthenticated(session.data?.tokenSet)

    if (isLoggedIn) {
      const { config } = useRuntimeConfig().public.clientOidc
      const client = await initClient([config.redirectUrl])

      const idToken = session.data?.tokenSet?.id_token
      const endSessionUrl = client.endSessionUrl({
        id_token_hint: idToken,
        post_logout_redirect_uri: config.postLogoutRedirectUris,
      })

      return sendRedirect(event, endSessionUrl)
    }
  }
  catch (error) {
    console.log('error in logout')
    console.log(error)

    return sendRedirect(event, '/error')
  }
})
