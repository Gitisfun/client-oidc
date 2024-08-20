import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { getCurrentSession } from './../../utils/session'

export default defineEventHandler(async (event) => {
  try {
    const session = await getCurrentSession(event)

    const postLogoutUrl
      = session.data?.postLogoutUrl ?? getRequestURL(event).origin

    await session.clear()

    return sendRedirect(event, postLogoutUrl)
  }
  catch (error) {
    console.log('error in logout callback')
    console.log(error)
    return sendRedirect(event, '/error')
  }
})
