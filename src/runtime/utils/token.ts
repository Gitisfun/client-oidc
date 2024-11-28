import { promisify } from 'node:util'
import jwt from 'jsonwebtoken'
import { getIdTokenSession, getLoginSession } from './../server/utils/session'
import Logger from './logger'

const verifyJWT = promisify(jwt.verify)

export class TokenValidator {
  #event: null
  #config: null
  #token: null
  #decodedToken: null

  constructor(event) {
    this.#event = event
  }

  async validate() {
    try {
      const { config } = useRuntimeConfig().clientOidc
      const session = await getIdTokenSession(this.#event)

      this.#config = config
      this.#token = session?.data?.id_token

      if (!this.#token) throw new Error('No token here')

      this.#decodedToken = await jwt.decode(this.#token, { complete: true })

      if (!this.#decodedToken) throw new Error('Invalid JWT token')

      await this.#validateClaims()

      const jwks = await this.#fetchPublicKeys()

      const key = await this.#filterPublicKey(jwks)

      const verifyOptions = {
        algorithms: ['RS256'],
      }

      await verifyJWT(this.#token, key, verifyOptions)

      return true
    }
    catch (error) {
      Logger.error(error.stack)
      return false
    }
  }

  async #validateClaims() {
    try {
      const now = Math.floor(Date.now() / 1000)
      const TOKEN_ALGORITHM = 'RS256'

      const header = this.#decodedToken.header
      const payload = this.#decodedToken.payload

      if (payload.iss !== this.#config.issuer) {
        throw new Error('Invalid issuer')
      }

      if (!payload.aud || payload.aud !== this.#config.clientId) {
        throw new Error('Invalid audience')
      }

      if (header.alg !== TOKEN_ALGORITHM) {
        throw new Error('Wrong algorithm')
      }

      if (payload.exp < now) {
        throw new Error('Token has expired')
      }

      if (payload.iat > now) {
        throw new Error('Token issued in the future')
      }

      if (payload.nonce) {
        const session = await getLoginSession(this.#event)
        if (session?.data?.nonce !== payload.nonce)
          throw new Error('Nonce does not match')
      }
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async #fetchPublicKeys() {
    try {
      const jwksUri = `${this.#config.issuer}${this.#config.jwkUri}`
      const response = await fetch(jwksUri)
      const jwks = await response.json()
      return jwks
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async #filterPublicKey(jwks) {
    try {
      const kid = this.#decodedToken.header.kid
      const key = jwks.keys.find(k => k.kid === kid)
      if (!key) {
        throw new Error('Unable to find the key matching the JWT `kid`')
      }

      return `-----BEGIN CERTIFICATE-----\n${key.x5c[0]
        .match(/.{1,64}/g)
        .join('\n')}\n-----END CERTIFICATE-----`
    }
    catch (error) {
      throw new Error(error)
    }
  }
}
