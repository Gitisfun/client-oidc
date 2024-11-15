<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <button @click="$oidc.login('en', '/secured')">Login</button>
    <button @click="$oidc.logout()">Logout</button>
    <div>{{ name }}</div>
    <div>
      <a href="/oots-sdg/evidence-picker/secured">Secured page</a>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['client-oidc-auth-middleware'],
  // or middleware: 'auth'
})
const { $oidc } = useNuxtApp()
const user = await $oidc.getUser()
const name = ref(user.value ?? 'No data')
</script>
