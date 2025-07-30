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

  const normalizeFeedItemHeights = () => {
  const feedItems = document.querySelectorAll<HTMLElement>('.feed-item');
  if (!feedItems.length) return;

  let maxHeight = 0;

  // Reset any previously set heights
  feedItems.forEach(item => {
    item.style.height = 'auto';
  });

  // Find max height
  feedItems.forEach(item => {
    const height = item.offsetHeight;
    if (height > maxHeight) maxHeight = height;
  });

  // Apply max height to all
  feedItems.forEach(item => {
    item.style.height = `${maxHeight}px`;
  });
};

  const runInitialCleanup = () => {
    removeReferralHeadings()
    removeAccountName()
    normalizeFeedItemHeights()
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
.feed-item {
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