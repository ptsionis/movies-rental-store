<script setup lang="ts">
const isHydrated = ref(false)
onMounted(async () => {
  isHydrated.value = true
})
</script>

<template>
  <header class="sticky top-0 w-full backdrop-blur-2xl px-8 py-4 z-50">
    <Navbar />
  </header>
  <main :class="isHydrated ? '' : 'invisible'">
    <slot />
  </main>
  <footer class="w-full flex justify-center items-center text-sm font-extralight text-center px-6 py-2">
    <span>&copy; {{ new Date().getFullYear() }}</span>
    <a class="hover:text-green-400" href="https://www.ptsionis.com" target="_blank">ptsionis</a>
  </footer>
</template>
