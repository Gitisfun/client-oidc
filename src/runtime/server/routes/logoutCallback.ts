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
    console.log('Error in callback')
    console.log(error)
    const { endpoints } = useRuntimeConfig().public.clientOidc
    return sendRedirect(event, `${endpoints.baseUrl}/error`)
  }
})
