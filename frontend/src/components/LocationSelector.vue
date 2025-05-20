<script setup lang="ts">
const location = defineModel<string>();
</script>
<template>
  <div class="mb-2 flex-1 lg:mb-0 flex flex-col justify-center">
    <label
      for="location-input"
      class="block mb-2 sm:text-2xl text-xl text-center font-bold text-[var(--black-soft)]"
    >
      Event Location:
    </label>
    <input
      type="text"
      id="location-input"
      v-model="location"
      placeholder="Venue Address"
      class="bg-[var(--black-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--color6)] text-[var(--white-soft)] text-sm rounded-lg block h-[48px] w-[190px] p-2.5"
    />
  </div>
</template>
