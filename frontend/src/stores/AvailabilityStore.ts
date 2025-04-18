import type { Availability } from '@/types';
import { ref } from 'vue';
import { defineStore } from 'pinia';

import availabilityService from '@/services/availabilityService';


export const useAvailabilityStore = defineStore('AvailabilityStore', () => {
  const unavailableDates = ref<Availability[]>([]);

  const fetchDates = async () => {
    try {
      const dates = await availabilityService.getUnavailableDates();
      unavailableDates.value = dates;
    } catch (err) {
      console.error('Failed to fetch unavailable dates:', err);
    }
  };

  return { unavailableDates, fetchDates };
});
