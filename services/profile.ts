import { useRefreshToken } from './auth'

export async function getProfile() {
  const { accessToken } = await useRefreshToken(localStorage.getItem('refreshToken'))
  const { data } = await useFetch('/api/rent-store/profile/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return { data }
}
