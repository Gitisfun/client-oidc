import { defineEventHandler, sendRedirect } from 'h3'
import { getLoginSession, getUserInfoSession, getTokenSetSession, getIdTokenSession } from './../utils/session'
import Logger from './../../utils/logger'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  try {
    const loginSession = await getLoginSession(event)
    const userInfoSession = await getUserInfoSession(event)
    const tokenSetSession = await getTokenSetSession(event)
    const idTokenSession = await getIdTokenSession(event)

    let postLogoutUrl = useRuntimeConfig().app.baseURL

    if (loginSession.data?.postLogoutUrl) {
      postLogoutUrl += `${loginSession.data?.postLogoutUrl}`
      postLogoutUrl = postLogoutUrl.replace(/\/\//g, '/')
    }

    Logger.info(`Post logout url: ${postLogoutUrl}`)
    Logger.success(`User ${userInfoSession.data?.givenName} ${userInfoSession.data?.surname} has been logged out.`)

    await loginSession.clear()
    await userInfoSession.clear()
    await tokenSetSession.clear()
    await idTokenSession.clear()

    Logger.success('Sessions have been cleared.')

    return sendRedirect(event, postLogoutUrl)
  }
  catch (error) {
    Logger.error(error.stack)
    return sendRedirect(event, `/error`)
  }
})
