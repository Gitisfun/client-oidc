import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const test = getCustomSession()
  return {
    name: 'sundrops',
    test,
  }
})
