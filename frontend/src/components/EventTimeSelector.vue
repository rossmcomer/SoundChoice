<script setup lang="ts">
import type { EventType } from '@/types';

const startTime = defineModel<string>('startTime');
const timeZoneAbbr = defineModel<string>('timeZoneAbbr');
const endTime = defineModel<string>('endTime');
const eventType = defineModel<EventType | ''>('eventType');
</script>

<template>
  <form class="max-w-[10rem] mx-auto">
    <div class="w-full flex flex-col items-center">
      <label
        for="start-time"
        class="block mb-2 text-xl font-medium text-[var(--black-soft)] text-center"
        >Start Time <span v-if="timeZoneAbbr">({{ timeZoneAbbr }})</span>:</label
      >
      <div class="relative shadow-md w-[125px] mb-4">
        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-4 pointer-events-none">
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
          step="900"
          id="start-time"
          v-model="startTime"
          class="bg-[var(--black-soft)] leading-none text-[var(--white-soft)] font-medium rounded-lg focus:ring-amber-400 focus:border-amber-400 block w-full p-3"
          min="09:00"
          max="18:00"
          value="00:00"
          required
        />
      </div>
      <div class="text-center">
        <div class="text-xl font-medium text-[var(--black-soft)]">
          End Time ({{ timeZoneAbbr }}):
        </div>
        <div class="text-lg font-medium text-[var(--black-soft)]">{{ endTime }}</div>
      </div>
      <div v-if="eventType === 'wedding'">
        <h2 class="text-xl text-center text-[var(--black-soft)] italic w-[261px]">
          <b>Important:</b>
        </h2>
        <h2 class="text-[var(--black-soft)] text-justify italic w-[261px]">
          Wedding pricing includes <b>5 hours</b> by default! If you would like to add additional
          hours, please specify. The cost is $150 for each added hour.
        </h2>
      </div>
    </div>
  </form>
</template>
<style scoped></style>
