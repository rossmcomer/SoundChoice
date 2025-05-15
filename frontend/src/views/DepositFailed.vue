<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import animationData from '@/assets/RedCanceled.json';
</script>
<template>
  <div class="relative min-h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not lighting the video tag.
    </video>
    <Vue3Lottie
      :animation-data="animationData"
      :loop="false"
      :autoplay="true"
      :height="400"
      :width="400"
    />
  </div>
</template>
