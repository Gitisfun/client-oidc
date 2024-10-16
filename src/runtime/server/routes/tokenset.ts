import { defineEventHandler } from 'h3'
import { getIdTokenSession } from './../../utils/session'

export default defineEventHandler(async (event) => {
  try {
    const session = await getIdTokenSession(event)
    return session.data
  }
  catch (error) {
    return null
  }
})
