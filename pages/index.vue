<script setup lang="ts">
import { getProfile } from '~/services/profile'

const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)
const profile = ref({})
const loading = ref(false)

async function updateContent() {
  loading.value = true
  const { data } = await getProfile()
  profile.value = { ...data.value }
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
    <SkeletonsHome v-if="loading" />
    <div v-else class="flex flex-col justify-center items-center gap-y-4">
      <h2 class="text-2xl">
        Welcome {{ profile.first_name }} {{ profile.last_name }}!
      </h2>
      <div class="flex flex-col gap-y-4">
        <UButton class="flex justify-center items-center" size="lg" to="/movies" label="SEE MOVIES" />
        <UButton class="flex justify-center items-center" size="lg" to="/profile" label="SEE RENTALS" />
        <UDivider label="OR" />
        <UButton class="flex justify-center items-center" size="lg" color="rose" to="/movies/create" label="ADD MOVIE" />
        <UButton class="flex justify-center items-center" size="lg" color="rose" to="/movies/statistics" label="SEE STATISTICS" />
      </div>
    </div>
  </div>
</template>
