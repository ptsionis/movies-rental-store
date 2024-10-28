<script setup lang="ts">
import { getRentals } from '~/services/rentals'

const props = defineProps(['user'])
const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)
const rentals = ref([])
const page = ref(1)
const pageSize = ref(15)
const totalRentals = ref(0)
const loading = ref(false)
const columns = [
  {
    key: 'user',
    label: 'User',
    sortable: false,
  },
  {
    key: 'movie',
    label: 'Title',
    sortable: true,
    sort: (a: string, b: string, direction: 'asc' | 'desc') => {
      if (!a || !b)
        return 0
      const comparison = a.localeCompare(b)
      return direction === 'asc' ? comparison : -comparison
    },
  },
  {
    key: 'rental_date',
    label: 'Rental Date',
    sortable: true,
  },
  {
    key: 'is_paid',
    label: 'Returned',
    sortable: true,
  },
  {
    key: 'return_date',
    label: 'Return Date',
    sortable: false,
  },
  {
    key: 'charge',
    label: 'Charge (€)',
    sortable: false,
  },
  {
    key: 'actions',
  },
]

async function updateRentals() {
  loading.value = true
  const { data: rentalsData } = await getRentals(page.value, pageSize.value)
  rentals.value = [...rentalsData.value.results]
  totalRentals.value = rentalsData.value.count
  loading.value = false
}

accessToken.value = localStorage.getItem('accessToken')
refreshToken.value = localStorage.getItem('refreshToken')
if (!refreshToken.value) {
  navigateTo('/login', { redirectCode: 301 })
}
else {
  updateRentals()
}

watch(page, () => {
  updateRentals()
})
</script>

<template>
  <UTable
    :columns="columns"
    :rows="rentals"
    :loading="loading"
    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
  >
    <template #actions-data="{ row }">
      <PayButton v-if="props.user === row.user" :uuid="row.uuid" :is-paid="row.is_paid" />
    </template>
  </UTable>
  <UPagination v-model="page" :page-count="pageSize" :total="totalRentals" show-last show-first />
</template>
