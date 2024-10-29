<script setup lang="ts">
import { getProfile } from '~/services/profile'

const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)
const profile = ref({})
const loading = ref(false)

async function updateContent() {
  loading.value = true
  const { data: profileData } = await getProfile()
  profile.value = { ...profileData.value }
  loading.value = false
}

accessToken.value = localStorage.getItem('accessToken')
refreshToken.value = localStorage.getItem('refreshToken')
if (!refreshToken.value) {
  navigateTo('/login', { redirectCode: 301 })
}
else {
  updateContent()
}
</script>

<template>
  <div class="page-wrapper">
    <Logo />
    <SkeletonsProfile v-if="loading" />
    <div v-else class="flex flex-col justify-center items-center gap-y-4">
      <span>Name: {{ profile.first_name + profile.last_name }}</span>
      <div class="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-y-4 lg:gap-x-4">
        <span>Email: {{ profile.email }}</span>
        <Wallet :wallet="profile.wallet" />
      </div>
    </div>
    <RentalsTable :user="profile.email" />
  </div>
</template>
