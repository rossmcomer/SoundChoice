<script setup lang="ts">
import type { EventType } from '@/types';
import HourStepper from './HourStepper.vue';

const eventType = defineModel<EventType | ''>('eventType');
const addHours = defineModel<boolean>('addHours');
const additionalHours = defineModel<number>('additionalHours');
</script>

<template>
  <div v-if="eventType === 'wedding'" class="sm:max-w-sm w-[261px] place-items-center">
    <h3 class="sm:text-2xl text-xl text-center font-bold text-gray-800 mt-4 lg:mt-0 mb-4">
      Additional Hours?
    </h3>
    <ul class="grid w-[190px] gap-2 grid-cols-2 mb-2">
      <li>
        <input
          type="radio"
          id="add-hours-yes"
          class="hidden peer"
          :checked="addHours === true"
          @change="addHours = true"
        />
        <label
          for="add-hours-yes"
          class="h-[48px] inline-flex items-center justify-between w-full py-2.5 px-4 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-2 peer-checked:border-green-500 peer-checked:text-green-500 hover:border-green-500 hover:ring-2 transition-[var(--transition-default)] shadow-md"
        >
          <div class="block">
            <div class="w-full text-lg font-semibold">Yes</div>
          </div>
          <svg
            class="w-5 h-5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="add-hours-no"
          class="hidden peer"
          :checked="addHours === false"
          @change="addHours = false"
        />
        <label
          for="add-hours-no"
          class="h-[48px] inline-flex items-center justify-between w-full py-2.5 px-4 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-2 peer-checked:border-red-500 peer-checked:text-red-500 hover:border-red-500 hover:ring-2 transition-[var(--transition-default)] shadow-md"
        >
          <div class="block">
            <div class="w-full text-lg font-semibold">No</div>
          </div>
          <svg
            class="w-5 h-5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </li>
    </ul>
    <HourStepper
      v-model:additionalHours="additionalHours"
      v-model:addHours="addHours"
      v-model:eventType="eventType"
    />
    <div>
      <h2 class="text-xl text-center text-[var(--black-soft)] italic w-[261px] mt-3">
        <b>Important:</b>
      </h2>
      <h2 class="text-[var(--black-soft)] text-justify italic w-[261px]">
        Wedding pricing includes <b>5 hours</b> by default! If you would like to add additional
        hours, please specify. The cost is $150 for each added hour.
      </h2>
    </div>
  </div>
  <div v-else class="sm:max-w-sm w-[190px] mx-auto mb-4 lg:mb-0">
    <h3 class="sm:text-2xl text-xl text-center font-bold text-gray-800 mt-0 mb-4">Total Hours:</h3>
    <HourStepper
      v-model:additionalHours="additionalHours"
      v-model:addHours="addHours"
      v-model:eventType="eventType"
    />
  </div>
</template>
