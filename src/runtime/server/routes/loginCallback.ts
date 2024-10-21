import { defineEventHandler, sendRedirect } from 'h3'
import {
  getLoginSession,
  getTokenSetSession,
  getIdTokenSession,
  getUserInfoSession,
} from './../../utils/session'
import { initClient } from './../../utils/client'
import type { OIDCUser } from './../../types'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  try {
    const { config } = useRuntimeConfig().clientOidc

    const req = event.node.req
    const loginSession = await getLoginSession(event)
    const tokenSetSession = await getTokenSetSession(event)
    const userInfoSession = await getUserInfoSession(event)
    const idTokenSession = await getIdTokenSession(event)

    const nonce = loginSession.data.nonce
    const state = loginSession.data.state
    const postLoginUrl = loginSession.data.postLoginUrl

    const client = await initClient([config.redirectUrl])
    const params = client.callbackParams(req)
    const tokenSet = await client.callback(config.redirectUrl, params, {
      nonce,
      state,
    })
    console.log('tokenSet')
    console.log(tokenSet)

    const userinfo = await client.userinfo(tokenSet.access_token)
    console.log('userinfo')
    console.log(userinfo)

    const user: OIDCUser = {
      givenName: userinfo?.givenName,
      surname: userinfo?.surname,
      fedid: userinfo?.fedid,
      nrn: userinfo?.sub,
      companyId: userinfo?.companyId,
      roles: userinfo?.roles,
      mail: userinfo?.mail,
      prefLanguage: userinfo?.prefLanguage,
    }

    const token = {
      access_token: tokenSet?.access_token,
      scope: tokenSet?.scope,
      // id_token: tokenSet?.id_token,
      token_type: tokenSet?.token_type,
      expires_at: tokenSet?.expires_at,
      nonce: tokenSet?.nonce,
    }

    await tokenSetSession.update({
      tokenSet: token,
    })
    await userInfoSession.update({
      ...user,
    })
    await idTokenSession.update({
      id_token: tokenSet?.id_token,
    })

    // TODO: Check if user has tokenSetowed role 3-> hasAllowedRole

    // TODO: Check if user has tokenSetowed role 4-> hasAllowedRole
    // TODO: Check if user has allowed role --> hasAllowedRole
    // directly assign cbe and role if only one and authorized

    return sendRedirect(event, postLoginUrl)
  }
  catch (error) {
    console.log('FAS OID error')
    console.log(error)
    console.log('-------------')
    return sendRedirect(event, `/error`)
  }
})
