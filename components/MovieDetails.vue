<script setup lang="ts">
const props = defineProps(['posterUrl', 'title', 'pubDate', 'categories', 'duration', 'rating', 'description'])
</script>

<template>
  <img class="w-3/4 sm:w-3/6 md:w-2/6 lg:w-2/4 rounded-md" :src="props.posterUrl" :alt="`${props.title} poster`">
  <div class="flex flex-col gap-y-8">
    <h2 class="font-extrabold text-2xl lg:text-4xl text-center lg:text-start">
      {{ props.title }} ({{ props.pubDate }})
    </h2>
    <div class="flex flex-col items-center lg:items-start gap-y-2 font-extralight">
      <div class="flex justify-start items-center gap-x-2">
        <UIcon name="material-symbols:domino-mask" class="w-5 h-5 text-green-400" />
        <ul class="flex">
          <li v-for="(category, index) in props.categories" :key="index">
            <span>{{ category }}</span>
            <span v-if="index < props.categories.length - 1" class="mx-2">|</span>
          </li>
        </ul>
      </div>
      <div class="flex justify-start items-center gap-x-2">
        <UIcon name="material-symbols:timelapse-rounded" class="w-5 h-5 text-green-400" />
        <span>{{ props.duration }} minutes</span>
      </div>
      <div class="flex justify-start items-center gap-x-2">
        <UIcon name="material-symbols:kid-star-sharp" class="w-5 h-5 text-green-400" />
        <span>{{ props.rating }} / 10</span>
      </div>
    </div>
    <div class="flex flex-col gap-y-2 text-center lg:text-start">
      <h5 class="text-lg font-bold text-green-400">
        Description:
      </h5>
      <p class="font-light text-sm lg:text-base">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
