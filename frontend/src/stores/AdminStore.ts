import { defineStore } from 'pinia';
import adminService from '@/services/adminService';
import type { Booking } from '@/types';
import testimonialService from '@/services/testimonialService';

export const AdminStore = defineStore('AdminStore', {
  state: () => ({
    clientEmails: [] as string[],
    bookings: [] as Booking[],
  }),
  actions: {
    async fetchClientEmails() {
      try {
        this.clientEmails = await adminService.getClientEmails();
      } catch (err) {
        console.error('Failed to fetch client emails:', err);
      }
    },
    async fetchBookings() {
      try {
        this.bookings = await adminService.getAllBookings();
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    },
  },
});
