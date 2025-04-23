<script setup lang="ts">

</script>
<template>
  <div class="relative h-full overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center scaleAnimation"></div>

    <div class="h-full flex flex-col place-items-center justify-start pt-20 relative z-10">
      <video
        class="w-4/5 h-auto max-w-3xl rounded-lg shadow-lg mb-8 border-2 border-yellow-600"
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
.scaleAnimation {
  background-image: url('../assets/SoundChoice-Logo/SoundChoice-DJ-Services.svg');
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
}
</style>
