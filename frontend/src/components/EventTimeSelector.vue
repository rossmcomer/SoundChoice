<script setup lang="ts">
const startTime = defineModel<string>('startTime');
</script>

<template>
  <form class="max-w-[16rem] mx-auto">
    <div>
      <label
        for="start-time"
        class="block mb-2 text-md font-medium text-[var(--black-soft)] text-center"
        >Start time:</label
      >
      <div class="relative shadow-md">
        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg
            class="w-4 h-4 text-[var(--color6)]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="time"
          id="start-time"
          v-model="startTime"
          class="bg-[var(--black-soft)] leading-none text-[var(--white-soft)] font-medium rounded-lg focus:ring-amber-400 focus:border-amber-400 block w-full p-2.5"
          min="09:00"
          max="18:00"
          value="00:00"
          required
        />
      </div>
    </div>
  </form>
</template>
<style scoped></style>
