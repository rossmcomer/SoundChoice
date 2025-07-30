<script setup lang="ts">
import { onMounted } from 'vue'
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue'

// Load Juicer script on component mount
onMounted(() => {
  const existingScript = document.querySelector('script[src="https://www.juicer.io/embed/soundchoice-dj/embed-code.js"]')
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = 'https://www.juicer.io/embed/soundchoice-dj/embed-code.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }
})
</script>

<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div class="relative h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Media</h1>
      </div>
      <div class="flex flex-col items-center p-4 sm:p-10">
        <!-- Juicer Feed Embed -->
        <ul class="juicer-feed" data-feed-id="soundchoice-dj">
          <h1 class="title">Loading feed...</h1>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>