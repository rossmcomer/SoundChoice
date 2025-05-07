<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import { onMounted } from 'vue';
import { useAvailabilityStore } from '@/stores/AvailabilityStore';

const availabilityStore = useAvailabilityStore();

const today = new Date();
const date = defineModel<Date | null>();

onMounted(() => {
  availabilityStore.fetchDates();
});
</script>
<template>
  <div class="sm:text-2xl text-xl text-center font-bold text-gray-800 mb-4">Pick A Day!</div>

  <div class="flex justify-center">
    <VueDatePicker
      class="shadow-lg"
      v-model="date"
      :min-date="today"
      :disabled-dates="availabilityStore.unavailableDates.map((d) => new Date(d.date))"
      inline
      auto-apply
      dark
      :enable-time-picker="false"
    ></VueDatePicker>
  </div>
  <div class="sm:text-sm text-center pt-1 text-gray-800">
    Date not available? Please contact us!
  </div>
</template>
<style>
.dp__main {
  width: auto;
}

.dp__theme_dark {
  --dp-primary-color: #daa520;
  --dp-primary-text-color: var(--black-soft);
  --dp-background-color: var(--black-soft);
  --dp-text-color: var(--white-soft);
  --dp-border-radius: 8px;
}
</style>
