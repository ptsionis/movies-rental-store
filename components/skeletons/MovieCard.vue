<template>
  <UCard class="h-full flex flex-col items-center">
    <template #header>
      <USkeleton class="w-36 h-4 mt-2" />
    </template>
    <div class="flex flex-col justify-center items-center gap-y-4 w-full">
      <USkeleton class="w-36 h-48 rounded-md" />
      <USkeleton class="w-4/5 h-4" />
      <USkeleton class="w-3/5 h-4" />
      <USkeleton class="w-3/4 h-4" />
    </div>
  </UCard>
</template>
