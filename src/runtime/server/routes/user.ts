import { defineEventHandler } from 'h3'
import Logger from './../../utils/logger'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserInfoSession(event)

    if (session.data) return session.data
    return null
  }
  catch (error) {
    Logger.error(error.stack)
    return null
  }
})
