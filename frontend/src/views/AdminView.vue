<script setup lang="ts">
import { useRouter } from 'vue-router';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';

const router = useRouter();
</script>
<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div class="relative h-full z-10 flex flex-col items-center">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Admin</h1>
      </div>
      <div
        class="max-w-lg sm:min-w-lg min-w-[200px] p-4 gap-4 text-[var(--black-soft)] flex flex-col justify-center"
      >
        <button
          @click="router.push(`/admin/email-list`)"
          class="bg-[var(--grey-soft)] hover:bg-[var(--black-soft)] text-[var(--white-soft)] px-4 py-2 rounded cursor-pointer shadow-md"
        >
          Email List
        </button>
        <button
          @click="router.push('/admin/bookings-list')"
          class="bg-[var(--grey-soft)] hover:bg-[var(--black-soft)] text-[var(--white-soft)] px-4 py-2 rounded cursor-pointer shadow-md"
        >
          Bookings List
        </button>
        <button
          @click="router.push('/admin/availability')"
          class="bg-[var(--grey-soft)] hover:bg-[var(--black-soft)] text-[var(--white-soft)] px-4 py-2 rounded cursor-pointer shadow-md"
        >
          Edit Availability
        </button>
        <button
          @click="router.push('/admin/testimonials')"
          class="bg-[var(--grey-soft)] hover:bg-[var(--black-soft)] text-[var(--white-soft)] px-4 py-2 rounded cursor-pointer shadow-md"
        >
          Edit Testimonials
        </button>
      </div>
    </div>
  </div>
</template>
