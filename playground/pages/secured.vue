<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <div>Secured page</div>
    <button @click="$oidc.login()">Login</button>
    <button @click="$oidc.logout()">Logout</button>
    <div>{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['oots-fas-auth-middleware'],
  // or middleware: 'auth'
})
const { $oidc } = useNuxtApp()
const user = await $oidc.getUser()
const name = ref(user.value ?? 'No data')
</script>
