<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AdminStore } from '@/stores/AdminStore';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

const adminStore = AdminStore();
const { clientEmails } = storeToRefs(adminStore);
const router = useRouter();

const emailListRef = ref<HTMLElement | null>(null);

const goBack = () => {
  router.back();
};

const copyEmails = async () => {
  if (!emailListRef.value) return;
  const text = emailListRef.value.innerText;
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Emails copied to clipboard');
  } catch (err) {
    toast.error('Failed to copy');
    console.error(err);
  }
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

      <h2 class="text-3xl font-bold mb-2">Email List:</h2>
      <button
        @click="copyEmails"
        class="text-2xl bg-gray-200 text-[var(--black-soft)] px-2 pb-1 rounded hover:bg-gray-300 border-2 border-[var(--black-soft)] transition cursor-pointer"
      >
        Copy
      </button>
      <ul v-if="clientEmails.length" ref="emailListRef" class="text-lg space-y-1">
        <li v-for="(email, index) in clientEmails" :key="index">{{ email }}</li>
      </ul>
    </div>
  </div>
</template>
