<script setup lang="ts">
import type {
  NuxtPlotlyConfig,
  NuxtPlotlyData,
  NuxtPlotlyLayout,
} from 'nuxt-plotly'
import { getAllMovies } from '~/services/movies'

const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)
const allMovies = ref([])
const x = ref<number[]>([])
const y = ref<number[]>([])
const markerSizes = ref<number[]>([])
const layout: NuxtPlotlyLayout = {
  title: 'Movies per publication date',
  xaxis: {
    tickformat: 'd',
  },
}
const config: NuxtPlotlyConfig = { scrollZoom: true, displayModeBar: false }
const updatedData = ref([])
const loading = ref(false)

async function updateContent() {
  loading.value = true
  const { allMovies: data } = await getAllMovies()
  allMovies.value = [...data]
  const moviesByYear = countMoviesByYear(allMovies.value)
  Object.keys(moviesByYear).map(year => x.value.push(Number(year)))
  Object.values(moviesByYear).map(count => y.value.push(Number(count)))
  getMarkerSizes()
  const plotlyData: NuxtPlotlyData = [
    { x: x.value, y: y.value, type: 'scatter', mode: 'markers', marker: { size: [...markerSizes.value] } },
  ]
  return plotlyData
}

function countMoviesByYear(movies: object[]) {
  return movies.reduce((acc, movie) => {
    const year = movie.pub_date
    if (year !== null) {
      if (acc[year]) {
        acc[year]++
      }
      else {
        acc[year] = 1
      }
    }

    return acc
  }, {})
}

function getMarkerSizes() {
  const maxCount = Math.max(...y.value)
  const sizeScale = (count: number) => (count / maxCount) * 100 + 10
  y.value.map(count => markerSizes.value.push(Math.round(sizeScale(count))))
}

accessToken.value = localStorage.getItem('accessToken')
refreshToken.value = localStorage.getItem('refreshToken')
if (!refreshToken.value) {
  navigateTo('/login', { redirectCode: 301 })
}

// onMounted so that await will not delay the router swtiching
onMounted(async () => {
  updatedData.value = await updateContent()
  loading.value = false
})
</script>

<template>
  <div class="page-wrapper">
    <Logo />
    <div v-if="loading" class="w-full">
      <SkeletonsNuxtPlotly />
    </div>
    <NuxtPlotly
      v-else
      :data="updatedData"
      :layout="layout"
      :config="config"
      style="width: 100%"
    />
  </div>
</template>
