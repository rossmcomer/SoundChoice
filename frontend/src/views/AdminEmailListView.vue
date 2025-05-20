<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AdminStore } from '@/stores/AdminStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const adminStore = AdminStore();
const { clientEmails } = storeToRefs(adminStore);
const router = useRouter();

const goBack = () => {
  router.back();
};

onMounted(() => {
  adminStore.fetchClientEmails();
});
</script>
<template>
  <div class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="p-6 space-y-4 text-[var(--black-soft)] z-10 relative">
      <button
        @click="goBack"
        class="mb-4 bg-gray-200 text-[var(--black-soft)] px-4 py-2 rounded hover:bg-gray-300 border-2 border-[var(--black-soft)] transition cursor-pointer"
      >
        ← Back
      </button>
      <h2 class="text-3xl font-bold mb-4">Email List</h2>
      <ul v-if="clientEmails.length">
        <li v-for="(email, index) in clientEmails" :key="index">{{ email }}</li>
      </ul>
    </div>
  </div>
</template>
