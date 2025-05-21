<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<template>
  <div class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative h-full z-10 flex flex-col items-center">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Admin</h1>
      </div>
      <div
        class="max-w-lg sm:min-w-lg min-w-[200px] p-4 gap-4 text-[var(--black-soft)] flex flex-col justify-center"
      >
        <button
          @click="router.push(`/admin/email-list`)"
          class="bg-blue-500 hover:bg-blue-600 text-[var(--white-soft)] px-4 py-2 rounded cursor-pointer shadow-md"
        >
          Email List
        </button>
        <button
          @click="router.push('/admin/bookings-list')"
          class="bg-green-500 hover:bg-green-600 text-[var(--white-soft)] px-4 py-2 rounded cursor-pointer shadow-md"
        >
          Bookings List
        </button>
        <button
          @click="router.push('/admin/availability')"
          class="bg-red-500 hover:bg-red-600 text-[var(--white-soft)] px-4 py-2 rounded cursor-pointer shadow-md"
        >
          Edit Availability
        </button>
      </div>
    </div>
  </div>
</template>
