<script setup lang="ts">
const startTime = defineModel<string>('startTime');
const timeZoneAbbr = defineModel<string>('timeZoneAbbr');
</script>

<template>
  <form class="mx-auto flex flex-col justify-end">
    <div class="w-full flex flex-col items-center">
      <div class="flex flex-col items-center">
        <label
          for="start-time"
          class="block mb-2 sm:text-2xl text-xl font-bold text-[var(--black-soft)] text-center"
          >Start Time <span v-if="timeZoneAbbr">({{ timeZoneAbbr }})</span>:</label
        >
        <div class="relative shadow-md w-[190px] mb-2 lg:mb-0">
          <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-[var(--color6)]"
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
            step="900"
            id="start-time"
            v-model="startTime"
            class="bg-[var(--black-soft)] pl-15 focus:outline-none focus:ring-2 focus:ring-[var(--color6)] leading-none text-[var(--white-soft)] font-medium rounded-lg block w-full h-[48px] p-2.5"
            min="09:00"
            max="18:00"
            value="00:00"
            required
          />
        </div>
      </div>
    </div>
  </form>
</template>
<style scoped></style>
