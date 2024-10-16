import { Issuer } from 'openid-client'
import { useRuntimeConfig } from '#imports'

export const initClient = async (redirectUris: string[]) => {
  const { config } = useRuntimeConfig().public.clientOidc

  console.log('---- config ----')
  console.log(config)
  console.log('config for initClient')
  console.log(config?.issuer)
  console.log('config for initClient')
  console.log(config?.clientId)
  console.log('----------------')

  const issuer = new Issuer({
    issuer: config.issuer,
    authorization_endpoint: `${config.issuer}${config.authorizationUri}`,
    token_endpoint: `${config.issuer}${config.tokenUri}`,
    jwks_uri: `${config.issuer}${config.jwkUri}`,
    userinfo_endpoint: `${config.issuer}${config.userInfoUri}`,
    introspection_endpoint: `${config.issuer}${config.introspectionUri}`,
    end_session_endpoint: `${config.issuer}${config.endSessionUri}`,
  })

  const client = new issuer.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    response_type: config.response_type,
    token_endpoint_auth_method: 'client_secret_basic',
    redirect_uris: redirectUris,
    id_token_signed_response_alg: config.id_token_signed_response_alg,
    userinfo_signed_response_alg: config.userinfo_signed_response_alg,
  })

  return client
}
