<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <button @click="$oidc.login('en', '/secured')">Login</button>
    <button @click="$oidc.logout()">Logout</button>
    <div>{{ name }}</div>
  </div>
</template>

<script setup>
const { $oidc } = useNuxtApp()
const user = await $oidc.getUser()
const name = ref(user.value ?? 'No data')
</script>
