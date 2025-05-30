<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AdminStore } from '@/stores/AdminStore';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';

const adminStore = AdminStore();
const { clientEmails } = storeToRefs(adminStore);
const router = useRouter();

const emailListRef = ref<HTMLElement | null>(null);

const goBack = () => {
  router.back();
};

//Copy email list to clipboard
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
    <BackgroundVideoDefault />
    <div class="p-6 space-y-4 text-[var(--black-soft)] z-10 relative">
      <button
        @click="goBack"
        class="mb-4 bg-gray-200 text-[var(--black-soft)] px-4 py-2 rounded hover:bg-gray-300 border border-[var(--black-soft)] transition cursor-pointer min-w-[82px]"
      >
        ← Back
      </button>
      <div class="flex items-center mb-4">
        <h2 class="text-2xl font-medium mr-2">Email List:</h2>
        <button
          @click="copyEmails"
          class="btnMain font-medium shadow-md px-4 py-2 rounded-lg transition cursor-pointer min-w-[82px]"
        >
          Copy
        </button>
      </div>
      <ul v-if="clientEmails.length" ref="emailListRef" class="text-md space-y-1">
        <li v-for="(email, index) in clientEmails" :key="index">{{ email }}</li>
      </ul>
    </div>
  </div>
</template>
