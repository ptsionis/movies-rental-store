export async function useRefreshToken(refreshToken: string) {
  const { data } = await useFetch('/api/auth/refresh/', {
    method: 'POST',
    body: {
      refresh: refreshToken,
    },
  })
  if (data.value) {
    localStorage.setItem('accessToken', data.value.access)
  }
  else {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigateTo('/login', { redirectCode: 301 })
    return null
  }
  const accessToken = localStorage.getItem('accessToken')
  return { accessToken }
}

export async function login(username: string, password: string) {
  const { data, error } = await useFetch('/api/auth/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: {
      username: username.trim(),
      password: password.trim(),
    },
  })

  return { data, error }
}

export async function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  navigateTo('/login', { redirectCode: 301 })
}
