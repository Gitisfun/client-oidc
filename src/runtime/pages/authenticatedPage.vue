<template>
  <div>Redirecting...</div>
</template>

<script setup lang="ts">
import { useRoute, useNuxtApp } from '#imports'

const { $oidc } = useNuxtApp()
const route = useRoute()

if (route.query?.postLoginUrl) {
  const postLoginUrl = route.query?.postLoginUrl
  $oidc.login(null, postLoginUrl)
}
else {
  $oidc.login()
}
</script>
