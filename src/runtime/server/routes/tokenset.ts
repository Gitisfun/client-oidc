import { defineEventHandler } from 'h3'
import { getIdTokenSession } from './../../utils/session'
import Logger from './../../utils/logger'

export default defineEventHandler(async (event) => {
  try {
    const session = await getIdTokenSession(event)
    return session.data
  }
  catch (error) {
    Logger.error(error.stack)
    return null
  }
})
