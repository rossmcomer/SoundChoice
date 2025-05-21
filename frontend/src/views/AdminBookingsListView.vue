<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { AdminStore } from '@/stores/AdminStore';
import { useProductLabel } from '@/composables/useProductLabel';
import { onMounted } from 'vue';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';

const adminStore = AdminStore();
const { bookings } = storeToRefs(adminStore);
const router = useRouter();

onMounted(async () => {
  await adminStore.fetchBookings();
});

const viewBooking = (bookingId: string) => {
  router.push(`/admin/booking/${bookingId}`);
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div class="relative z-10 p-6 space-y-4 text-[var(--black-soft)]">
      <button
        @click="goBack"
        class="mb-4 bg-gray-200 text-[var(--black-soft)] px-4 py-2 rounded hover:bg-gray-300 border-2 border-[var(--black-soft)] transition cursor-pointer"
      >
        ← Back
      </button>
      <h2 class="text-3xl font-bold mb-4 text-center">All Bookings</h2>
      <ul v-if="bookings.length" class="space-y-2">
        <li
          v-for="booking in bookings"
          :key="booking.id"
          class="flex justify-between items-center p-4 border-2 border-[rgb(34,34,34)] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent rounded-xl"
        >
          <div class="text-black font-medium">
            {{ new Date(booking.eventDate).toLocaleDateString() }} -
            {{ useProductLabel(booking.type) }} – {{ booking.location }}
          </div>
          <button
            @click="viewBooking(booking.id)"
            class="cursor-pointer btnMain flex justify-center items-center w-4/5 sm:w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center sm:text-sm sm:px-4 sm:py-2"
          >
            View Details
          </button>
        </li>
      </ul>
      <div v-else>Loading or no bookings available...</div>
    </div>
  </div>
</template>
