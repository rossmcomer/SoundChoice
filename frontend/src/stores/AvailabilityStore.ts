import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getUnavailableDates, createUnavailableDate } from '@/services/availabilityService';
import type { UnavailableDate } from '@/types';

export const useAvailabilityStore = defineStore('AvailabilityStore', () => {
  const unavailableDates = ref<UnavailableDate[]>([]);

  const fetchDates = async () => {
    try {
      const dates = await getUnavailableDates();
      unavailableDates.value = dates;
    } catch (err) {
      console.error('Failed to fetch unavailable dates:', err);
    }
  };

  const addDate = async (date: string, startTime: string, endTime: string) => {
    try {
      const newDate = await createUnavailableDate({ date, startTime, endTime });
      unavailableDates.value.push(newDate);
    } catch (err) {
      console.error('Error adding date:', err);
    }
  };

  return { unavailableDates, fetchDates, addDate };
});
