import { defineEventHandler } from 'h3'
import { isAuthenticated } from './../../utils/index'
import { getTokenSetSession } from './../../utils/session'

export default defineEventHandler(async (event) => {
  try {
    const tokenSet = await getTokenSetSession(event)
    return isAuthenticated(tokenSet.data.tokenSet)
  }
  catch (error) {
    return false
  }
})