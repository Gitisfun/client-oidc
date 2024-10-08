import { joinRelativeURL } from 'ufo'
import { useRuntimeConfig } from '#internal/nitro'
const appConfig = useRuntimeConfig().app
export const baseURL = () => appConfig.baseURL
export const buildAssetsDir = () => appConfig.buildAssetsDir
export const buildAssetsURL = (...path) => joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path)
export const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase
}
if (import.meta.client) {
  globalThis.__buildAssetsURL = buildAssetsURL
  globalThis.__publicAssetsURL = publicAssetsURL
}