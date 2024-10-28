<template>
  <div class="flex justify-center gap-x-6 container">
    <USkeleton class="rounded-md w-96 h-96" />
    <div class="flex flex-col gap-y-6">
      <USkeleton class="w-96 h-12" />
      <div class="flex flex-col gap-y-2 font-extralight">
        <div class="flex justify-start items-center gap-x-2">
          <ul class="flex gap-x-2">
            <li><USkeleton class="w-16 h-4" /></li>
            <li><USkeleton class="w-16 h-4" /></li>
            <li><USkeleton class="w-16 h-4" /></li>
          </ul>
        </div>
        <div class="flex justify-start items-center gap-x-2" />
        <div class="flex justify-start items-center gap-x-2" />
      </div>
      <USkeleton class="w-1/2 h-6" />
      <USkeleton class="w-1/2 h-6" />
      <USkeleton class="w-96 h-32" />
    </div>
  </div>
</template>
