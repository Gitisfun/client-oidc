import { useSession } from 'h3'
import { SESSION_MAX_AGE_ONE_HOUR } from './constants'

const SESSION_LOGIN = 'client-oidc-userinfo-session'
const SESSION_USERINFO = 'client-oidc-userinfo-session'
const SESSION_TOKENSET = 'client-oidc-tokenset-session'
const SESSION_IDTOKEN = 'client-oidc-idtoken-session'

const getGenericSession = async (sessionName, event) => {
  return await useSession(event, {
    name: sessionName,
    password: '80d42cfb-1cd2-462c-8f17-e3237d9027e9',
    cookie: {
      httpOnly: true,
      secure: true,
    },
    maxAge: SESSION_MAX_AGE_ONE_HOUR,
  })
}

export const getLoginSession = async event => await getGenericSession(SESSION_LOGIN, event)

export const getUserInfoSession = async event => await getGenericSession(SESSION_USERINFO, event)

export const getTokenSetSession = async event => await getGenericSession(SESSION_TOKENSET, event)

export const getIdTokenSession = async event => await getGenericSession(SESSION_IDTOKEN, event)
