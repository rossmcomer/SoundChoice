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

  const removeAccountName = () => {
    const referrals = document.querySelectorAll('.j-poster h3')
    referrals.forEach(el => el.remove())
  }

  const runInitialCleanup = () => {
    removeReferralHeadings()
    removeAccountName()
    // normalizeFeedItemHeights()
  }

  // Observe DOM changes since Juicer injects dynamically
  const observer = new MutationObserver(() => {
    removeReferralHeadings()
    removeAccountName()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  // Initial check (in case content is already loaded)
  setTimeout(runInitialCleanup, 3000)
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
  height: 750px !important;
  border-radius: 4px !important;
  background-color: var(--white-soft) !important;
}

.j-text{
  height: 100% !important;
} 

.j-meta {
  height:24px !important;
}
</style>