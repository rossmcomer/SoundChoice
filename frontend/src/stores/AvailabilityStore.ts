import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getUnavailableDates } from '@/services/availabilityService';
import type { Availability } from '@/types';

export const useAvailabilityStore = defineStore('AvailabilityStore', () => {
  const unavailableDates = ref<Availability[]>([]);

  const fetchDates = async () => {
    try {
      const dates = await getUnavailableDates();
      unavailableDates.value = dates;
    } catch (err) {
      console.error('Failed to fetch unavailable dates:', err);
    }
  };

  return { unavailableDates, fetchDates };
});
