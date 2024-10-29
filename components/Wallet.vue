<script setup lang="ts">
import { depositProfile } from '~/services/profile'

const props = defineProps(['wallet'])
const wallet = ref(props.wallet)
const cashAmount = ref(0)
const loading = ref(false)

async function handleDeposit() {
  if (cashAmount.value <= 0)
    return
  loading.value = true
  const { data } = await depositProfile(cashAmount.value)
  wallet.value = data.value.wallet
  loading.value = false
}
</script>

<template>
  <span>Wallet: {{ wallet }}&euro;</span>
  <form class="flex gap-x-2" @submit.prevent="handleDeposit">
    <UInput v-model="cashAmount" type="number" min="0" placeholder="Add money..." />
    <UButton :label="loading ? 'Loading...' : 'Deposit (&euro;)'" :loading="loading" type="submit" :disabled="loading === true || cashAmount <= 0" />
  </form>
</template>
