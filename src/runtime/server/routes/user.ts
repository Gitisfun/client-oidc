import { defineEventHandler } from 'h3'
import { getUserInfoSession } from './../../utils/session'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserInfoSession(event)

    if (session.data) return session.data
    return null
  }
  catch (error) {
    return null
  }
})
