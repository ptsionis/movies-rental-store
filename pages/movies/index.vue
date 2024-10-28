<script setup lang="ts">
import { getMovies } from '~/services/movies'

const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)
const movies = ref([])
const page = ref(1)
const pageSize = ref(4)
const totalMovies = ref(0)
const loading = ref(false)

async function updateContent() {
  loading.value = true
  const { data } = await getMovies(page.value, pageSize.value)
  movies.value = [...data.value.results]
  totalMovies.value = data.value.count
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

watch(page, () => {
  updateContent()
})
</script>

<template>
  <div class="page-wrapper">
    <Logo />
    <ul v-if="loading" class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <li v-for="item in Array(4)" :key="`movie-skeleton-${item}`">
        <SkeletonsMovieCard />
      </li>
    </ul>
    <ul v-else class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <li v-for="movie in movies" :key="movie.uuid">
        <NuxtLink :to="`/movies/${movie.uuid}`">
          <MovieCard :title="movie.title" :release-year="movie.pub_date" :duration="movie.duration" :rating="movie.rating" :poster-url="movie.poster_url" />
        </NuxtLink>
      </li>
    </ul>
    <UPagination v-model="page" :page-count="pageSize" :total="totalMovies" show-last show-first />
  </div>
</template>
