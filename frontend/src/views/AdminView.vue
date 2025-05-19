<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { AdminStore } from '@/stores/AdminStore';
import userService from '@/services/userService';
import AdminDateSelector from '@/components/AdminDateSelector.vue';
import { useProductStore } from '@/stores/ProductStore';
import { toast } from 'vue3-toastify';

const router = useRouter();
const adminStore = AdminStore();
const { clientEmails, bookings } = storeToRefs(adminStore);

const productsStore = useProductStore();
const products = computed(() => productsStore.products);

function productLabel(type: string): string {
  const product = products.value.find((p) => p.value === type);
  return product?.label ?? 'Unknown';
}
const checkAdminAccess = async () => {
  try {
    const user = await userService.getUserData();
    if (user?.role !== 'admin') {
      router.push('/');
    }
  } catch (err) {
    console.error('Error checking user role:', err);
    router.push('/');
  }
};

const viewBooking = (bookingId: string) => {
  router.push(`/admin/booking/${bookingId}`);
};

onMounted(() => {
  checkAdminAccess();
});
</script>
<template>
  <div class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Admin</h1>
      </div>
      <div class="p-4 space-y-4">
        <button
          @click="adminStore.fetchClientEmails"
          class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Load Client Emails
        </button>
        <ul v-if="clientEmails.length">
          <li v-for="(email, index) in clientEmails" :key="index">{{ email }}</li>
        </ul>

        <button
          @click="adminStore.fetchBookings"
          class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Load All Bookings
        </button>
        <ul v-if="bookings.length" class="space-y-2">
          <li
            v-for="booking in bookings"
            :key="booking.id"
            class="flex justify-between items-center p-4 border-2 border-[rgb(34,34,34)] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent rounded-xl"
          >
            <div class="text-black font-medium">
              {{ new Date(booking.eventDate).toLocaleDateString() }} -
              {{ productLabel(booking.type) }} – {{ booking.location }}
            </div>
            <button
              @click="viewBooking(booking.id)"
              class="cursor-pointer btnMain flex justify-center items-center w-4/5 sm:w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center sm:text-sm sm:px-4 sm:py-2"
            >
              View Details
            </button>
          </li>
        </ul>
        <AdminDateSelector />
      </div>
    </div>
  </div>
</template>
