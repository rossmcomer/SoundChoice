<script setup lang="ts">
import type { EventType } from '@/types';
import HourStepper from './HourStepper.vue';

const eventType = defineModel<EventType | ''>('eventType');
const addHours = defineModel<boolean>('addHours');
const additionalHours = defineModel<number>('additionalHours');
const totalHours = defineModel<number>('totalHours');
</script>

<template>
  <div class="sm:max-w-sm w-[190px] mx-auto mb-2 lg:mb-0">
    <h3 class="sm:text-2xl text-xl text-center font-bold text-gray-800 mt-0 mb-2">Total Hours:</h3>
    <HourStepper
      v-model:additionalHours="additionalHours"
      v-model:addHours="addHours"
      v-model:eventType="eventType"
      v-model:totalHours="totalHours"
    />
  </div>
</template>
