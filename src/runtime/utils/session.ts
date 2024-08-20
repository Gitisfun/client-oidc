import { useSession } from 'h3'
import { useRuntimeConfig } from '#imports'

export const getCurrentSession = async (event) => {
  const { sessionConfig } = useRuntimeConfig().public.ootsFas

  return await useSession(event, {
    name: sessionConfig.name,
    password: sessionConfig.password,
    cookie: {
      httpOnly: true,
      secure: true,
    },
    maxAge: sessionConfig.maxAge,
  })
}
