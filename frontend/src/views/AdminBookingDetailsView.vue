<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import adminService from '@/services/adminService';

const route = useRoute();
const booking = ref<any>(null);

const fetchBooking = async () => {
  const id = route.params.bookingId as string;
  booking.value = await adminService.getBookingInfo(id);
  console.log(booking.value)
};

onMounted(fetchBooking
);
</script>
<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Booking Details</h2>
  
      <div v-if="booking">
        <ul class="space-y-2">
          <li><strong>Name:</strong> {{ booking.user.name }}</li>
          <li><strong>Date:</strong> {{ booking.eventDate }}</li>
          <li><strong>Location:</strong> {{ booking.location }}</li>
          <li><strong>Start Time:</strong> {{ booking.startTime }}</li>
          <li><strong>End Time:</strong> {{ booking.endTime }}</li>
          <li><strong>Type:</strong> {{ booking.type }}</li>
  
          <li v-if="booking.payment"><strong>Payment:</strong>
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
  