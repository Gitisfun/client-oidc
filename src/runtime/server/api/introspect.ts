import { defineEventHandler } from 'h3'
import { getTokenSetSession } from './../../utils/session'
import { initClient } from './../../utils/client'
import Logger from './../../utils/logger'

export default defineEventHandler(async (event) => {
  try {
    const tokenSetSession = await getTokenSetSession(event)
    const token = tokenSetSession.data?.tokenSet?.access_token

    if (!tokenSetSession.data?.tokenSet?.access_token) return false

    const client = await initClient()
    const introspection = await client.introspect(token)
    Logger.info(`Introspected the token, got status: ${introspection.active ? 'Active' : 'Not Active'}.`)
    Logger.warning('The introspect route has been called in the API. Please ensure that this route is not called excessively, as it may lead to a high number of API requests.')

    return introspection.active
  }
  catch (error) {
    Logger.error(error.stack)
    return false
  }
})
