import { defineEventHandler, sendRedirect } from 'h3'
import { getCurrentSession } from './../../utils/session'
import { initClient } from './../../utils/client'
import type { OIDCUser } from './../../types'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  try {
    const { config } = useRuntimeConfig().public.clientOidc

    const req = event.node.req
    const session = await getCurrentSession(event)

    const nonce = session.data.nonce
    const state = session.data.state
    const postLoginUrl = session.data.postLoginUrl

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
      // companyId: userinfo?.companyId,
      // roles: userinfo?.roles,
      mail: userinfo?.mail,
      prefLanguage: userinfo?.prefLanguage,
    }

    const token = {
      access_token: tokenSet?.access_token,
      // scope: tokenSet?.scope,
      id_token: tokenSet?.id_token,
      // token_type: tokenSet?.token_type,
      expires_at: tokenSet?.expires_at,
      // nonce: tokenSet?.nonce,
    }

    await session.update({
      user,
      tokenSet: token,
    })

    // TODO: Check if user has tokenSetowed role 3-> hasAllowedRole

    // TODO: Check if user has tokenSetowed role 4-> hasAllowedRole
    // TODO: Check if user has allowed role --> hasAllowedRole
    // directly assign cbe and role if only one and authorized

    return sendRedirect(event, postLoginUrl)
  }
  catch (error) {
    sendRedirect(event, '/error')
  }
})
