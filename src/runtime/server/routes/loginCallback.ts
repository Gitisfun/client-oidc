import { defineEventHandler, sendRedirect } from 'h3'
import { initClient } from './../../utils/client'
import Logger from './../../utils/logger'
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

    const userinfo = await client.userinfo(tokenSet.access_token)

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

    Logger.success(`User ${user?.givenName} ${user?.surname} has logged in successfully.`)

    Logger.info(`User:`)
    Logger.info(`o givenName --> ${user?.givenName}`)
    Logger.info(`o surname --> ${user?.surname}`)
    Logger.info(`o fedid --> ${user?.fedid}`)
    Logger.info(`o nrn --> ${user?.nrn}`)
    Logger.info(`o companyId --> ${user?.companyId}`)
    Logger.info(`o mail --> ${user?.mail}`)
    Logger.info(`o prefLanguage --> ${user?.prefLanguage}`)
    Logger.info(`o roles --> ${user?.roles}`)

    Logger.info(`Tokenset:`)
    Logger.info(`o access_token --> ${tokenSet?.access_token}`)
    Logger.info(`o scope --> ${tokenSet?.scope}`)
    Logger.info(`o token_type --> ${tokenSet?.token_type}`)
    Logger.info(`o expires_at --> ${tokenSet?.expires_at}`)
    Logger.info(`o nonce --> ${tokenSet?.nonce}`)
    Logger.info(`o id_token --> ${tokenSet?.id_token}`)

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
    Logger.error(error.stack)
    return sendRedirect(event, `/error`)
  }
})
