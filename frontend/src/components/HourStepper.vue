<script setup lang="ts">
const additionalHours = defineModel<number>('additionalHours');

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
  <div class="mt-6 flex items-center justify-center gap-4">
    <button
      type="button"
      @click="decrement"
      class="w-10 h-10 rounded-lg bg-[var(--black-soft)] text-[var(--white-soft)] text-xl font-bold cursor-pointer pb-1 shadow-md"
    >
      –
    </button>
    <span class="text-xl font-semibold text-[var(--black-soft)]">
      {{ additionalHours ?? 1 }} hour{{ (additionalHours ?? 1) > 1 ? 's' : '' }}
    </span>
    <button
      type="button"
      @click="increment"
      class="w-10 h-10 rounded-lg bg-[var(--black-soft)] text-[var(--white-soft)] text-xl font-bold cursor-pointer pb-1 pl-0.5 shadow-md"
    >
      +
    </button>
  </div>
</template>
