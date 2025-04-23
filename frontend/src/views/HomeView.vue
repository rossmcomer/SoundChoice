<script setup lang="ts">

</script>
<template>
  <div class="homeContainer h-full">
    <div class="h-full flex flex-col place-items-center justify-center">
      <video class="w-full h-auto max-w-2xl rounded-lg shadow-lg mb-8" autoplay muted controls>
        <source src="@/assets/Promo-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>
<style scoped>
.homeContainer {
  background-image: url('../assets/SoundChoice-Logo/SoundChoice-DJ-Services.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: scalePulse 20s ease-in-out infinite;
}

@keyframes scalePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
