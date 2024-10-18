import { useSession } from 'h3'
import { useRuntimeConfig } from '#imports'

/*
export const getCurrentSession = async (event) => {
  const { sessionConfig } = useRuntimeConfig().clientOidc

  return await useSession(event, {
    name: sessionConfig.name,
    password: sessionConfig.password,
    cookie: {
      httpOnly: true,
      secure: true,
    },
    maxAge: sessionConfig.maxAge,
  })
}
*/

export const getLoginSession = async (event) => {
  const { sessionConfig } = useRuntimeConfig().clientOidc

  return await useSession(event, {
    name: 'client-oidc-login-session',
    password: sessionConfig.password,
    cookie: {
      httpOnly: true,
      secure: true,
    },
    maxAge: sessionConfig.maxAge,
  })
}

export const getUserInfoSession = async (event) => {
  const { sessionConfig } = useRuntimeConfig().clientOidc

  return await useSession(event, {
    name: 'client-oidc-userinfo-session',
    password: sessionConfig.password,
    cookie: {
      httpOnly: true,
      secure: true,
    },
    maxAge: sessionConfig.maxAge,
  })
}

export const getTokenSetSession = async (event) => {
  const { sessionConfig } = useRuntimeConfig().clientOidc

  return await useSession(event, {
    name: 'client-oidc-tokenset-session',
    password: sessionConfig.password,
    cookie: {
      httpOnly: true,
      secure: true,
    },
    maxAge: sessionConfig.maxAge,
  })
}

export const getIdTokenSession = async (event) => {
  const { sessionConfig } = useRuntimeConfig().clientOidc

  return await useSession(event, {
    name: 'client-oidc-idtoken-session',
    password: sessionConfig.password,
    cookie: {
      httpOnly: true,
      secure: true,
    },
    maxAge: sessionConfig.maxAge,
  })
}
