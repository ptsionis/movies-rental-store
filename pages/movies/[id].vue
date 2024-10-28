<script setup lang="ts">
import { getMovie } from '~/services/movies'

const route = useRoute()
const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)
const movie = ref({})
const loading = ref(false)

async function updateContent() {
  loading.value = true
  const { data } = await getMovie(route.params.id)
  movie.value = data.value
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
  <div v-if="loading" class="page-wrapper">
    <SkeletonsMovieDetails />
  </div>
  <div v-else class="page-wrapper">
    <div class="flex flex-col lg:flex-row justify-center items-center gap-x-0 lg:gap-x-6 gap-y-6 lg:gap-y-6 container">
      <MovieDetails :poster-url="movie.poster_url" :title="movie.title" :pub-date="movie.pub_date" :categories="movie.categories" :duration="movie.duration" :rating="movie.rating" :description="movie.description" />
    </div>
    <RentButton :uuid="route.params.id" />
  </div>
</template>
