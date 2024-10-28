<script setup lang="ts">
import { getCategories, postMovie } from '~/services/movies'

const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)
const categories = ref([])
const title = ref('')
const pubDate = ref(0)
const duration = ref(0)
const rating = ref(0)
const description = ref('')
const selectedCategories = ref([])
const loading = ref(false)
const isError = ref(false)
const isErrorMessage = ref('Error.')

async function handleCreateMovie() {
  loading.value = true
  const { data, error } = await postMovie(title.value, pubDate.value, duration.value, rating.value, description.value, selectedCategories.value)
  loading.value = false
  if (data.value) {
    navigateTo('/movies')
  }
  if (error.value) {
    isError.value = true
    isErrorMessage.value = error.value.data.detail
  }
}

accessToken.value = localStorage.getItem('accessToken')
refreshToken.value = localStorage.getItem('refreshToken')
if (!refreshToken.value) {
  navigateTo('/login', { redirectCode: 301 })
}
else {
  const categoriesData = await getCategories()
  categories.value = [...categoriesData.data.value]
}
</script>

<template>
  <form class="w-full md:w-3/4 lg:w-1/2 2xl:w-2/5 flex flex-col justify-center items-center gap-y-6" @submit.prevent="handleCreateMovie">
    <UFormGroup class="w-full" label="Title" :error="isError" required>
      <UInput v-model="title" type="text" maxlength="200" :trailing-icon="isError ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" placeholder="Enter movie title... (max 200 characters)" required />
    </UFormGroup>
    <UFormGroup class="w-full" label="Published Date" :error="isError" hint="(optional)">
      <UInput v-model="pubDate" type="number" min="0" max="32767" :trailing-icon="isError ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" placeholder="Enter movie published date..." />
    </UFormGroup>
    <UFormGroup class="w-full" label="Duration" :error="isError" hint="(optional)">
      <UInput v-model="duration" type="number" min="0" max="32767" :trailing-icon="isError ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" placeholder="Enter movie duration..." />
    </UFormGroup>
    <UFormGroup class="w-full" label="Rating" :error="isError" hint="(optional)">
      <UInput v-model="rating" type="rating" :trailing-icon="isError ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" placeholder="Enter movie duration..." />
    </UFormGroup>
    <UFormGroup class="w-full" label="Description" :error="isError" hint="(optional)">
      <UTextarea v-model="description" :trailing-icon="isError ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" placeholder="Enter movie description..." />
    </UFormGroup>
    <UFormGroup class="w-full" label="Category" :error="isError" required>
      <USelectMenu v-model="selectedCategories" :options="categories" value-attribute="name" option-attribute="name" multiple :trailing-icon="isError ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" placeholder="Select movie categories..." required />
    </UFormGroup>
    <UButton :label="loading ? 'Loading...' : 'Create Movie'" :loading="loading" type="submit" />
  </form>
  <div :class="`${isError ? '' : 'invisible'} text-rose-500 text-center`">
    <span>{{ isErrorMessage }}</span>
  </div>
</template>
