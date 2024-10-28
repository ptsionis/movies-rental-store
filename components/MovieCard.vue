<script setup lang="ts">
const props = defineProps(['title', 'releaseYear', 'duration', 'rating', 'posterUrl'])
</script>

<template>
  <UCard class="h-full flex flex-col items-center hover:outline hover:outline-1 hover:outline-green-400">
    <template #header>
      <h3 class="font-bold h-fit">
        {{ props.title }} ({{ props.releaseYear }})
      </h3>
    </template>
    <div class="flex flex-col justify-center items-center gap-y-4">
      <img class="rounded-md" :src="props.posterUrl" :alt="`${props.title} poster`" width="65%">
      <div class="flex justify-center items-center gap-x-4">
        <div class="flex justify-center items-center gap-x-1">
          <UIcon name="material-symbols:timelapse-rounded" class="w-5 h-5 text-green-400" />
          <span class="text-xs font-extralight">{{ props.duration }} mins</span>
        </div>

        <span>|</span>
        <div class="flex justify-center items-center gap-x-1">
          <span class="text-xs font-extralight">{{ props.rating }} / 10</span>
          <UIcon name="material-symbols:kid-star-sharp" class="w-5 h-5 text-green-400" />
        </div>
      </div>
    </div>
  </UCard>
</template>
