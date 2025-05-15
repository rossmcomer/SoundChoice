<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import animationData from '@/assets/GreenCheckmark.json';
</script>
<template>
  <div class="relative min-h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not lighting the video tag.
    </video>
    <div class="relative z-10 flex flex-col items-center justify-center min-h-full">
      <Vue3Lottie
        :animation-data="animationData"
        :loop="false"
        :autoplay="true"
        :height="300"
        :width="300"
      />
      <div class="text-[var(--black-soft)] text-center mt-4 px-4 max-w-lg">
        Deposit successful. Please visit your profile to complete your questionnaire and pay the remaining 50% of your total balance at least 1 month before your event.
      </div>
    </div>
  </div>
</template>
