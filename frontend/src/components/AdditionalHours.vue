<script setup lang="ts">
import type { EventType } from '@/types';
import HourStepper from './HourStepper.vue';

const eventType = defineModel<EventType | ''>('eventType');
const addHours = defineModel<boolean>('addHours');
const additionalHours = defineModel<number>('additionalHours');
</script>

<template>
  <div v-if="eventType === 'wedding'" class="sm:max-w-sm w-[261px]">
    <h2 class="text-xl text-center text-[var(--black-soft)] italic w-[261px] mt-4">
      <b>Important:</b>
    </h2>
    <h2 class="text-[var(--black-soft)] text-justify italic w-[261px] mt-4">
      Wedding pricing includes <b>5 hours</b> by default! If you would like to add additional hours,
      please specify below. The cost is $150 for each added hour.
    </h2>
    <h3 class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-4 mb-5">
      Additional Hours
    </h3>
    <ul class="grid w-full gap-6 md:grid-cols-2">
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
          class="inline-flex items-center justify-between w-full py-2 px-5 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border-2 peer-checked:border-green-500 peer-checked:text-green-500 hover:border-green-500 hover:ring-2 transition-[var(--transition-default)] shadow-md"
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
          class="inline-flex items-center justify-between w-full py-2 px-5 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border-2 peer-checked:border-red-500 peer-checked:text-red-500 hover:border-red-500 hover:ring-2 transition-[var(--transition-default)] shadow-md"
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
    <HourStepper v-if="addHours" v-model:additionalHours="additionalHours" />
  </div>
  <div v-else class="sm:max-w-sm w-[261px] mx-auto pt-10">
    <h3 class="sm:text-2xl text-xl text-center font-bold text-gray-800 mb-5">Total Hours</h3>
    <HourStepper v-model:additionalHours="additionalHours" />
  </div>
</template>
