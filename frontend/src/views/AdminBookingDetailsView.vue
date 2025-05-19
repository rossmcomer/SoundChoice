<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Booking } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import adminService from '@/services/adminService';
import { getUTCISOString } from '@/composables/useUTCISOString'

const route = useRoute();
const router = useRouter();
const booking = ref<Booking | null>(null);

const fetchBooking = async () => {
  const id = route.params.bookingId as string;
  booking.value = await adminService.getBookingInfo(id);
};

const goBack = () => {
  router.back();
};

onMounted(fetchBooking
);
</script>
<template>
    <div class="p-4">
      <button
      @click="goBack"
      class="mb-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition cursor-pointer"
    >
      ← Back
    </button>
      <h2 class="text-xl font-bold mb-4">Booking Details</h2>
  
      <div v-if="booking">
        <ul class="space-y-2">
          <li><strong>Name:</strong> {{ booking.user.name }}</li>
          <li><strong>Date:</strong> {{ new Date(booking.eventDate) }}</li>
          <li><strong>Location:</strong> {{ booking.location }}</li>
          <li><strong>Start Time:</strong> {{ new Date(booking.startTime) }}</li>
          <li><strong>End Time:</strong> {{ new Date(booking.endTime) }}</li>
          <li><strong>Type:</strong> {{ booking.type }}</li>
  
          <li v-if="booking.payment"><strong>Payments:</strong>
            <ul>
              <li v-for="p in booking.payment" :key="p.id">
                ${{ p.amount }} – {{ p.method }} – {{ p.deposit ? 'Deposit' : 'Balance' }}
              </li>
            </ul>
          </li>
  
          <li v-if="booking.questionnaire"><strong>Questionnaire:</strong>
            <pre>{{ booking.questionnaire }}</pre>
          </li>
        </ul>
      </div>
  
      <div v-else>
        Loading booking...
      </div>
    </div>
  </template>
  