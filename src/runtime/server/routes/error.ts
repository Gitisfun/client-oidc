import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  return {
    error: 'An error occurred',
  }
})
