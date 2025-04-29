<script lang="ts">
import { ref, onMounted } from 'vue';
</script>
<template>
  <div class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Media</h1>
      </div>
      <div class="flex flex-col items-center p-4 sm:p-10">          
      </div>
    </div>
  </div>
</template>
<style></style>
