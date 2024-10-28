import { useRefreshToken } from './auth'

export async function getCategories() {
  const { accessToken } = await useRefreshToken(localStorage.getItem('refreshToken'))
  const { data } = await useFetch('/api/rent-store/categories/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return { data }
}

export async function getAllMovies() {
  const pageSize = 100
  const allMovies = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const { data } = await getMovies(page, pageSize)
    if (data.value.results) {
      allMovies.push(...data.value.results)
    }
    hasNextPage = !!data.value.next
    page += 1
  }
  return { allMovies }
}

export async function getMovies(page: number, page_size: number) {
  const { accessToken } = await useRefreshToken(localStorage.getItem('refreshToken'))
  const { data } = await useFetch('/api/rent-store/movies/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      page_size,
    },
  })

  return { data }
}

export async function getMovie(movie_uuid: string) {
  const { accessToken } = await useRefreshToken(localStorage.getItem('refreshToken'))
  const { data } = await useFetch(`/api/rent-store/movies/${movie_uuid}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return { data }
}

export async function postMovie(title: string, pub_date: number, duration: number, rating: number, description: string, categories: string[]) {
  const { accessToken } = await useRefreshToken(localStorage.getItem('refreshToken'))
  const { data, error } = await useFetch(`/api/rent-store/movies/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      title,
      pub_date,
      duration,
      rating,
      description,
      categories,
    },
  })

  return { data, error }
}
