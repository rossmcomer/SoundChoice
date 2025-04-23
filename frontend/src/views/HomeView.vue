<script setup lang="ts">
</script>

<template>
  <div class="relative h-full overflow-hidden">
    <video
      class="absolute inset-0 w-full h-full object-cover z-0"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="@/assets/movies/movie1-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="h-full flex flex-col place-items-center justify-start pt-[25vh] md:justify-center md:pt-0 relative z-10">
      <video
        class="w-4/5 h-auto max-w-3xl rounded-lg shadow-lg mb-8 border-2 border-black"
        autoplay
        muted
        controls
      >
        <source src="@/assets/Promo-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<style scoped>
/* .scaleAnimation {
  background-image: url('../assets/Waves-sunny.svg');
  z-index: -1;
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
} */
</style>
