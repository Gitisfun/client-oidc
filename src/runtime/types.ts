export type Endpoints = {
  login?: string
  loginCallback?: string
  userinfo?: string
  accessToken?: string
  logout?: string
  logoutCallback?: string
  authenticated?: string
  introspect?: string
}

export type OidcProvider = {
  issuer: string
  clientId: string
  clientSecret: string
  allowedRoles: string
  acrValues: string
  scope: string
  redirectUrl?: string
  postLogoutRedirectUris?: string
  response_type?: string
  id_token_signed_response_alg?: string
  userinfo_signed_response_alg?: string
  authorizationUri?: string
  tokenUri?: string
  userInfoUri?: string
  introspectionUri?: string
  jwkUri?: string
  endSessionUri?: string
}

export interface OIDCUser {
  /** National Registry Number */
  nrn?: string
  /** First name */
  givenName?: string
  /** Last name */
  surname?: string
  companyId?: string
  fedid?: string
  prefLanguage?: string
  mail?: string
  roles?: string
}
