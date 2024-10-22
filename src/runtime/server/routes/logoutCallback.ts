import { defineEventHandler, sendRedirect } from 'h3'
import { getLoginSession, getTokenSetSession, getUserInfoSession, getIdTokenSession } from './../../utils/session'

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

    await loginSession.clear()
    await userInfoSession.clear()
    await tokenSetSession.clear()
    await idTokenSession.clear()

    return sendRedirect(event, postLogoutUrl)
  }
  catch (error) {
    console.log('FAS OID error')
    console.log(error)
    console.log('-------------')
    return sendRedirect(event, `/error`)
  }
})
