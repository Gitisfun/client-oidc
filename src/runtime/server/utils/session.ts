import { useSession } from 'h3'
import { useRuntimeConfig } from '#imports'

const SESSION_LOGIN = 'client-oidc-userinfo-session'
const SESSION_USERINFO = 'client-oidc-userinfo-session'
const SESSION_TOKENSET = 'client-oidc-tokenset-session'
const SESSION_IDTOKEN = 'client-oidc-idtoken-session'

const getGenericSession = async (sessionName, event) => {
  const appName = useRuntimeConfig().clientOidc.appName
  const { session } = useRuntimeConfig().clientOidc

  const name = `${appName}-${sessionName}`
  const password = session.password
  const maxAge = session.maxAge

  return await useSession(event, {
    name,
    password,
    cookie: {
      httpOnly: true,
      secure: true,
    },
    maxAge,
  })
}

export const getLoginSession = async event => await getGenericSession(SESSION_LOGIN, event)

export const getUserInfoSession = async event => await getGenericSession(SESSION_USERINFO, event)

export const getTokenSetSession = async event => await getGenericSession(SESSION_TOKENSET, event)

export const getIdTokenSession = async event => await getGenericSession(SESSION_IDTOKEN, event)
