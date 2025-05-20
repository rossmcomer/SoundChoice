<script setup lang="ts">
import { ref, computed } from 'vue';
import type { EventType } from '@/types';
import { PRODUCTS } from '@/assets/PRODUCTS';

const eventType = defineModel<EventType | ''>('eventType');
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const eventOptions = computed(() =>
  PRODUCTS.filter((p) => p.value !== 'uplights' && p.value !== 'addTime'),
);

const selectOption = (option: { value: string; label: string }) => {
  eventType.value = option.value as EventType;
  isOpen.value = false;
};
</script>

<template>
  <div
    class="relative text-center w-full flex flex-col max-w-sm mx-auto items-center mt-4 lg:mt-0 mb-2 lg:mb-0"
  >
    <label class="sm:text-2xl text-xl text-center font-bold text-gray-800 mb-2">
      Select Your Event Type!
    </label>
    <button
      @click="toggleDropdown"
      class="focus:outline-none focus:ring-2 focus:ring-[var(--color6)] font-medium rounded-lg text-lg px-2 py-2.5 text-center inline-flex justify-center items-center w-[190px] bg-[var(--black-soft)] text-[var(--white-soft)] shadow-md cursor-pointer"
      type="button"
    >
      {{ eventOptions.find((o) => o.value === eventType)?.label || 'Choose Event Type' }}
      <svg
        class="w-2.5 h-2.5 ml-2 text-[var(--color6)]"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div
      v-show="isOpen"
      class="z-10 mt-2 divide-y divide-[var(--divider-medium)] rounded-lg shadow-sm w-[160px] absolute left-1/2 -translate-x-1/2 text-center bg-[var(--black-soft)] text-[var(--color6)]"
    >
      <ul class="py-2 text-sm text-center">
        <li
          v-for="option in eventOptions"
          :key="option.value"
          @click="selectOption(option)"
          class="cursor-pointer block px-4 py-2 hover:bg-[var(--color6)] hover:text-[var(--black-soft)]"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
