<script setup lang="ts">
import { watch } from 'vue';
import type { EventType } from '@/types';

const eventType = defineModel<EventType | ''>('eventType');
const additionalHours = defineModel<number>('additionalHours');
const addHours = defineModel<boolean>('addHours');

watch(addHours, (newVal) => {
  if (!newVal) {
    additionalHours.value = 0;
  }
});

function increment() {
  additionalHours.value = (additionalHours.value ?? 1) + 1;
}

function decrement() {
  if ((additionalHours.value ?? 1) > 1) {
    additionalHours.value!--;
  }
}
</script>
<template>
  <div class="flex items-center justify-center gap-4 mt-4">
    <button
      type="button"
      @click="decrement"
      :disabled="!addHours"
      :class="[
        eventType !== 'wedding' ? 'w-10 h-10' : 'w-8 h-8',
        'rounded-lg text-xl font-bold pb-1 shadow-md bg-[var(--black-soft)] text-[var(--white-soft)]',
        addHours ? 'cursor-pointer' : 'cursor-not-allowed'
      ]"
    >
      –
    </button>
    <span class="text-lg font-semibold text-[var(--black-soft)]">
      {{ additionalHours ?? 1 }} hour{{ (additionalHours ?? 1) != 1 ? 's' : '' }}
    </span>
    <button
      type="button"
      @click="increment"
      :disabled="!addHours"
      :class="[
        eventType !== 'wedding' ? 'w-10 h-10' : 'w-8 h-8',
        'rounded-lg text-xl font-bold pb-1 shadow-md bg-[var(--black-soft)] text-[var(--white-soft)]',
        addHours ? 'cursor-pointer' : 'cursor-not-allowed'
      ]"
    >
      +
    </button>
  </div>
</template>
