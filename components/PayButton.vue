<script setup lang="ts">
import { payRental } from '~/services/rentals'

const props = defineProps(['uuid', 'isPaid'])
const loading = ref(false)
async function returnMovie() {
  loading.value = true
  await payRental(props.uuid)
  reloadNuxtApp()
}
</script>

<template>
  <div @click="returnMovie">
    <UButton :disabled="props.isPaid ? true : false || loading" :color="props.isPaid ? 'gray' : 'green'" :label="props.isPaid ? 'Returned' : 'Pay'" />
  </div>
</template>
