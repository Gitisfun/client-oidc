import { defineEventHandler } from 'h3'
import {
  getLoginSession,
  getTokenSetSession,
  getIdTokenSession,
  getUserInfoSession,
} from './../../utils/session'

export default defineEventHandler(async (event) => {
  const loginSession = await getLoginSession(event)
  const tokenSetSession = await getTokenSetSession(event)
  const userInfoSession = await getUserInfoSession(event)
  const idTokenSession = await getIdTokenSession(event)

  return {
    loginSession: loginSession.data,
    tokenSetSession: tokenSetSession.data,
    userInfoSession: userInfoSession.data,
    idTokenSession: idTokenSession.data,
  }
})
