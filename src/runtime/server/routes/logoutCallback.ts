import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { getLoginSession, getTokenSetSession, getUserInfoSession, getIdTokenSession } from './../../utils/session'

export default defineEventHandler(async (event) => {
  try {
    const loginSession = await getLoginSession(event)
    const userInfoSession = await getUserInfoSession(event)
    const tokenSetSession = await getTokenSetSession(event)
    const idTokenSession = await getIdTokenSession(event)

    const postLogoutUrl = loginSession.data?.postLogoutUrl ?? getRequestURL(event).origin

    await loginSession.clear()
    await userInfoSession.clear()
    await tokenSetSession.clear()
    await idTokenSession.clear()

    return sendRedirect(event, postLogoutUrl)
  }
  catch (error) {
    return sendRedirect(event, `/error`)
  }
})
