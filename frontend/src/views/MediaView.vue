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

  const removeReferralHeadings = () => {
    const referrals = document.querySelectorAll('h1.referral')
    referrals.forEach(el => el.remove())
  }

  const runLayoutCleanup = () => {
    removeReferralHeadings()
  }

  // Observe DOM changes since Juicer injects dynamically
  const observer = new MutationObserver(() => {
    removeReferralHeadings()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  // Initial check (in case content is already loaded)
  setTimeout(runLayoutCleanup, 3000)
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
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.juicer-feed {
  overflow: hidden !important;
}

.feed-item {
  min-height: 750px !important;
  border-radius: 10px !important;
  background-color: var(--white-soft) !important;
  border-color: rgb(34, 34, 34);
  border: solid !important;
  border-width: 2px;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

.j-text {
  display: flex !important;
  flex-direction: column !important;
  flex-grow: 1 !important;
}

.j-poster {
  min-height: 56px !important;
}

.j-meta {
  margin-top: auto !important;
}

.j-social {
  color: var(--black-soft) !important;
}

.j-post-overlay {
  border-radius: 10px !important;
}

.j-overlay-text {
  flex-grow: 1 !important;
  min-height: 450px !important;
  display: flex !important;
  flex-direction: column !important;
}

.j-overlay-content {
  border-radius: 10px !important;
}

.media-preview {
  max-height: 570px !important;
}

.image-post {
  display:flex !important;
  flex-direction: column !important;
}

.j-bottom {
  margin-top: auto !important;
}
</style>