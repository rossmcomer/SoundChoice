<script setup lang="ts">
const timeZoneAbbr = defineModel<string>('timeZoneAbbr');
const endTime = defineModel<string>('endTime');
</script>
<template>
    <div class="text-center">
        <div class="sm:text-2xl text-xl font-bold text-[var(--black-soft)]">
          End Time ({{ timeZoneAbbr }}):
        </div>
        <div class="text-lg font-medium text-[var(--black-soft)]">{{ endTime }}</div>
      </div>
</template>