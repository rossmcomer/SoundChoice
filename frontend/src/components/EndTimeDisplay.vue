<script setup lang="ts">
const timeZoneAbbr = defineModel<string>('timeZoneAbbr');
const endTime = defineModel<string>('endTime');
</script>
<template>
  <div class="text-center">
    <div class="sm:text-2xl text-xl font-bold text-[var(--black-soft)] mb-2">
      End Time ({{ timeZoneAbbr }}):
    </div>
    <div
      class="text-lgs font-medium text-[var(--white-soft)] bg-[var(--black-soft)] w-[190px] h-[48px] rounded-lg px-2 py-2.5 text-center inline-flex justify-center items-center shadow-md"
    >
      {{ endTime }}
    </div>
  </div>
</template>
