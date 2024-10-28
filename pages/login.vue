<script setup lang="ts">
import { login } from '~/services/auth'

definePageMeta({
  layout: 'login',
})

const username = ref('')
const password = ref('')
const loading = ref(false)
const isError = ref(false)
const isErrorMessage = ref('Error.')

onMounted(() => {
  if (localStorage.getItem('refreshToken')) {
    return navigateTo('/', { redirectCode: 301 })
  }
})

async function handleLogin() {
  loading.value = true
  const { data, error } = await login(username.value, password.value)
  loading.value = false
  if (error.value) {
    isError.value = true
    isErrorMessage.value = error.value.data.detail
  }
  else {
    localStorage.setItem('accessToken', data.value?.access)
    localStorage.setItem('refreshToken', data.value?.refresh)
    isError.value = false
    await navigateTo('/')
  }
}
</script>

<template>
  <div class="page-wrapper">
    <Logo />
    <form class="flex flex-col justify-center items-center gap-y-6" @submit.prevent="handleLogin">
      <UFormGroup label="Username" :error="isError" required>
        <UInput v-model="username" type="text" :trailing-icon="isError ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" placeholder="Enter your username..." required />
      </UFormGroup>
      <UFormGroup label="Password" :error="isError" required>
        <UInput v-model="password" type="password" :trailing-icon="isError ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" placeholder="Enter your password..." required />
      </UFormGroup>
      <UButton :label="loading ? 'Loading...' : 'Login'" :loading="loading" type="submit" block />
    </form>
    <div :class="`${isError ? '' : 'invisible'} text-rose-500 text-center`">
      <span>{{ isErrorMessage }}</span>
    </div>
  </div>
</template>
