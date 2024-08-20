import { defineEventHandler } from 'h3'
import { getCurrentSession } from './../../utils/session'

export default defineEventHandler(async (event) => {
  const session = await getCurrentSession(event)

  if (session.data?.user) return session.data?.user
  return null
})
