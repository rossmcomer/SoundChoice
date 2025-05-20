<script setup lang="ts">
import { watch } from 'vue';

const addHours = defineModel<boolean>('addHours');
const totalHours = defineModel<number>('totalHours');
const eventType = defineModel<string>('eventType');
const additionalHours = defineModel<number>('additionalHours');

// Handle logic on totalHours change
watch(totalHours, (val) => {
  const hours = val!; // assert val is not undefined
  if (eventType.value === 'wedding') {
    if (hours < 5) totalHours.value = 5;
    addHours.value = hours > 5;
    additionalHours.value = Math.max(0, hours - 5);
  } else {
    addHours.value = true;
    additionalHours.value = hours;
  }
});

// Adjust increment/decrement
function increment() {
  totalHours.value!++;
}

function decrement() {
  if (eventType.value === 'wedding' && totalHours.value! > 5) {
    totalHours.value!--;
  } else if (eventType.value !== 'wedding' && totalHours.value! > 1) {
    totalHours.value!--;
  }
}
</script>

<template>
  <div class="flex items-center justify-between gap-2 mt-2">
    <button
      type="button"
      @click="decrement"
      :class="[
        'rounded-lg text-xl font-bold pb-1 shadow-md bg-[var(--black-soft)] text-[var(--white-soft)] w-12 h-12',
        'cursor-pointer'
      ]"
    >
      –
    </button>
    <span class="text-lg font-semibold text-[var(--black-soft)]">
      {{ totalHours }} hour{{ totalHours !== 1 ? 's' : '' }}
    </span>
    <button
      type="button"
      @click="increment"
      class="rounded-lg text-xl font-bold pb-1 shadow-md bg-[var(--black-soft)] text-[var(--white-soft)] w-12 h-12 cursor-pointer"
    >
      +
    </button>
  </div>
</template>
