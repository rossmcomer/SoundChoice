<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { AdminStore } from '@/stores/AdminStore';
import { useProductLabel } from '@/composables/useProductLabel';
import { onMounted, ref, computed } from 'vue';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';

const adminStore = AdminStore();
const { bookings } = storeToRefs(adminStore);
const router = useRouter();

const showFutureOnly = ref(false);

const filteredBookings = computed(() => {
  if (!showFutureOnly.value) return bookings.value;
  const today = new Date().setHours(0, 0, 0, 0);
  return bookings.value.filter((booking) => new Date(booking.eventDate).getTime() >= today);
});

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
        class="mb-4 bg-gray-200 text-[var(--black-soft)] px-4 py-2 rounded hover:bg-gray-300 border border-[var(--black-soft)] transition cursor-pointer min-w-[82px]"
      >
        ← Back
      </button>
      <h2 v-if="!showFutureOnly" class="text-3xl font-bold mb-4 text-center">All Bookings</h2>
      <h2 v-else class="text-3xl font-bold mb-4 text-center">Future Bookings</h2>
      <div class="flex justify-center">
        <button
          @click="showFutureOnly = !showFutureOnly"
          class="mb-4 bg-gray-200 hover:bg-gray-300 border border-[var(--black-soft)] text-[var(--black-soft)] px-4 py-2 rounded transition cursor-pointer"
        >
          {{ showFutureOnly ? 'Show All Bookings' : 'Show Upcoming Only' }}
        </button>
      </div>
      <ul v-if="filteredBookings.length">
        <li
          v-for="(booking, index) in filteredBookings"
          :key="booking.id"
          class="flex justify-between items-center p-4 border border-[rgb(34,34,34)] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent"
          :class="{
            'rounded-t-xl': index === 0,
            'rounded-b-xl': index === filteredBookings.length - 1,
            'border-b-0': index !== filteredBookings.length - 1,
          }"
        >
          <div class="text-black font-medium">
            {{ new Date(booking.eventDate).toLocaleDateString() }} -
            {{ useProductLabel(booking.type) }} – {{ booking.location }}
          </div>
          <button
            @click="viewBooking(booking.id)"
            class="cursor-pointer ml-2 bg-gray-200 hover:bg-gray-300 border border-[var(--black-soft)] flex justify-center items-center focus:outline-none font-medium rounded text-sm px-2 py-1 text-center sm:text-sm sm:px-4 sm:py-2 min-w-[96px]"
          >
            View Details
          </button>
        </li>
      </ul>
      <div v-else>No bookings available.</div>
    </div>
  </div>
</template>
