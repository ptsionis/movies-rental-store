import { useRefreshToken } from './auth'

export async function rentMovie(movie: string) {
  const { accessToken } = await useRefreshToken(localStorage.getItem('refreshToken'))
  const { data } = await useFetch('/api/rent-store/rentals/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      movie,
    },
  })

  return { data }
}

export async function getRentals(page: number, page_size: number) {
  const { accessToken } = await useRefreshToken(localStorage.getItem('refreshToken'))
  const { data } = await useFetch('/api/rent-store/rentals/', {
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

export async function payRental(rental_uuid: string) {
  const { accessToken } = await useRefreshToken(localStorage.getItem('refreshToken'))
  const { data } = await useFetch(`/api/rent-store/rentals/${rental_uuid}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return { data }
}
