<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import animationData from '@/assets/RedCanceled.json';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';
</script>
<template>
  <div class="relative min-h-full">
    <BackgroundVideoDefault />
    <div class="relative z-10 flex flex-col items-center justify-center min-h-full">
      <Vue3Lottie
        :animation-data="animationData"
        :loop="false"
        :autoplay="true"
        :height="300"
        :width="300"
      />
      <div class="text-[var(--black-soft)] text-center my-4 px-4 max-w-lg font-medium">
        Remaining Payment Failed. Please visit your profile and try again.
      </div>
      <button
        type="button"
        @click="$router.push('/profile')"
        class="btnMain flex justify-center items-center w-4/5 sm:w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center sm:text-sm sm:px-4 sm:py-2"
      >
        Go To Profile
        <svg
          class="w-4 h-4 sm:w-5 sm:h-5 ms-1.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
