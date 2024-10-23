import { useRuntimeConfig } from '#imports'

const colors = {
  title: '\x1B[38;5;43m', // Teal
  success: '\x1B[38;5;48m', // Greenish
  info: '\x1B[38;5;27m', // Blue
  error: '\x1B[38;5;196m', // Bright Red
  warning: '\x1B[38;5;214m', // Orange/Yellow
  reset: '\x1B[0m', // Reset color
}

function logMessage(level, levelLabel, message) {
  const isDevMode = useRuntimeConfig().public.clientOidc.isDev

  if (isDevMode) {
    console.log(`${colors.title}[CLIENT OIDC]${colors.reset}${colors[level]}${levelLabel}${colors.reset} ${message}`)
  }
}

const Logger = {
  success(msg) {
    logMessage('success', '[Success]', msg)
  },
  info(msg) {
    logMessage('info', '[Info]', msg)
  },
  warning(msg) {
    logMessage('warning', '[Warning]', msg)
  },
  error(msg) {
    logMessage('error', '[Error]', msg)
  },
}

export default Logger
