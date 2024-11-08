import { defineEventHandler } from 'h3'
import { isAuthenticated } from './../../utils/index'
import { getTokenSetSession } from './../utils/session'
import Logger from './../../utils/logger'

export default defineEventHandler(async (event) => {
  try {
    const tokenSet = await getTokenSetSession(event)
    return isAuthenticated(tokenSet.data.tokenSet)
  }
  catch (error) {
    Logger.error(error.stack)
    return false
  }
})
