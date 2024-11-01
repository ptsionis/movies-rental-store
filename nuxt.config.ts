// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/ui', 'nuxt-plotly'],
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/api/**': { proxy: 'http://3.235.214.44:8000/**' },
  },
  vite: {
    optimizeDeps: {
      include: ['plotly.js-dist-min'],
    },
  },
})
