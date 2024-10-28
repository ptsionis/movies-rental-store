<script setup lang="ts">
import { rentMovie } from '~/services/rentals'

const props = defineProps(['uuid'])
const toast = useToast()
const loading = ref(false)
const status = ref('pending')

async function handleRent() {
  loading.value = true
  const { data } = await rentMovie(props.uuid)
  if (data.value) {
    status.value = 'success'
    toast.add({ title: 'Rental was successful!' })
  }
  else {
    status.value = 'fail'
    toast.add({ title: 'Movie is already rented...' })
  }
  loading.value = false
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-y-2">
    <UButton :disabled="status !== 'pending'" :loading="loading" class="text-xl" :label="status === 'pending' ? 'Rent now' : 'Rented'" :color="status === 'pending' ? 'green' : 'gray'" @click="handleRent" />
    <UNotifications />
  </div>
</template>
