<script setup lang="ts">
import { ref, onMounted } from 'vue';
import adminService from '@/services/adminService';
import userService from '@/services/userService';
import type { Booking } from '@/types';
import { useRouter } from 'vue-router';

const router = useRouter();

const clientEmails = ref<string[]>([]);
const bookings = ref<Booking[]>([]);
const user = ref<{ role: string } | null>(null);

const checkAdminAccess = async () => {
  try {
    user.value = await userService.getUserData();
    if (user.value?.role !== 'admin') {
      router.push('/'); // Redirect to home if not admin
    }
  } catch (err) {
    console.error('Error checking user role:', err);
    router.push('/');
  }
};

const fetchClientEmails = async () => {
  try {
    clientEmails.value = await adminService.getClientEmails();
  } catch (err) {
    console.error('Failed to fetch client emails:', err);
  }
};

const fetchBookings = async () => {
  try {
    bookings.value = await adminService.getAllBookings();
  } catch (err) {
    console.error('Failed to fetch bookings:', err);
  }
};

const viewBooking = async (bookingId: string) => {
  router.push(`/admin/booking/${bookingId}`);
};

onMounted(() => {
  checkAdminAccess();
});
</script>
<template>
    <div class="relative h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Admin</h1>
      </div>
      <div class="p-4 space-y-4">
    <button @click="fetchClientEmails" class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
      Load Client Emails
    </button>
    <ul v-if="clientEmails.length">
      <li v-for="(email, index) in clientEmails" :key="index">{{ email }}</li>
    </ul>

    <button @click="fetchBookings" class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
      Load All Bookings
    </button>
    <ul v-if="bookings.length" class="space-y-2">
      <li v-for="booking in bookings" :key="booking.id" class="flex justify-between items-center bg-gray-100 p-2 rounded">
        <div>
          {{ booking.user.name }} – {{ booking.eventDate }} – {{ booking.location }}
        </div>
        <button
          @click="viewBooking(booking.id)"
          class="bg-indigo-500 text-white px-3 py-1 rounded"
        >
          View Details
        </button>
      </li>
    </ul>
  </div>
      </div>
</template>