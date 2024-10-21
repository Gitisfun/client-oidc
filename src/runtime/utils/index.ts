import type { TokenSetParameters } from 'openid-client'

export const isExpired = (tokenSet?: Partial<TokenSetParameters>) => {
  if (typeof tokenSet?.expires_at === 'number') {
    return tokenSet.expires_at <= Date.now() / 1000
  }
  return false
}

export const isAuthenticated = (
  tokenSet?: Partial<TokenSetParameters>,
): boolean => {
  if (tokenSet?.access_token) {
    return !isExpired(tokenSet)
  }
  return false
}
