<script setup lang="ts">
import { logout } from '~/services/auth'
</script>

<template>
  <div class="flex justify-between items-center">
    <nav>
      <ul class="flex items-center justify-center gap-x-4">
        <li class="hover:text-green-400">
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
        <li class="hover:text-green-400">
          <NuxtLink to="/movies">
            Movies
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex items-center justify-center gap-x-4">
      <NuxtLink title="Profile" class="hover:outline hover:outline-1 hover:outline-green-400 rounded-full" to="/profile">
        <UAvatar
          size="sm"
          src="/images/isshin.jpg"
          alt="Avatar"
        />
      </NuxtLink>
      <div title="Logout" @click="logout">
        <UButton size="sm" icon="ic:baseline-logout" />
      </div>
    </div>
  </div>
</template>
