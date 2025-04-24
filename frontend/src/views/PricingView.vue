<script setup lang="ts">
import { ref } from 'vue';

const pricingPlans = ref([
  {
    name: 'Wedding',
    price: '$1500',
    description: 'Perfect for any wedding.',
    features: {
      rate: '5 hours',
      increment: 'All included',
      music: 'Custom playlist',
      microphones: 'Microphones',
      speakers: 'Speakers',
      lighting: 'Dancefloor lighting',
    },
  },
  {
    name: 'Classic',
    price: '$150',
    description: 'Perfect for any corporate event, birthday, or mitzvah.',
    features: {
      rate: 'Up to a full day',
      increment: '/hr',
      music: 'Custom playlist',
      microphones: 'Microphones',
      speakers: 'Speakers',
      lighting: 'Dancefloor lighting',
    },
  },
  {
    name: 'Uplights',
    price: '$200',
    description: 'Custom color uplights for any event.',
    features: {
      rate: '',
      increment: '',
      music: '',
      microphones: '',
      speakers: '',
      lighting: '',
    },
  },
  {
    name: 'Extra Hours',
    price: '$150',
    description: 'Add additional time for any event.',
    features: {
      rate: '',
      increment: '/hr',
      music: '',
      microphones: '',
      speakers: '',
      lighting: '',
    },
  },
]);
</script>
<template>
  <div class="relative min-h-full">
  <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not lighting the video tag.
  </video>
  <div class="relative z-10 pt-10">
  <div class="flex justify-center py-7">
    <h1 class="text-6xl">Pricing</h1>
  </div>
  <section
    class="relative z-10 text-gray-800 overflow-hidden dark:bg-dark p-4 sm:p-10"
  >
    <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap justify-center">
        <div
          v-for="(plan, index) in pricingPlans"
          :key="index"
          class="w-4/5 px-4 md:w-1/2 lg:w-1/4"
        >
          <div
            class="relative z-10 mb-10 overflow-hidden rounded-[10px] border-[rgb(34,34,34)] border-2 border-stroke py-10 px-8 shadow-lg sm:p-12 lg:py-10 lg:px-6 xl:p-[50px] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent"
          >
            <span class="mb-3 block text-lg font-bold"
            style="color: var(--black-soft)">{{ plan.name }}</span>
            <h2 class="mb-5 text-[42px] font-bold" style="color: var(--black-soft)">
              <span>{{ plan.price }}</span>
              <span class="text-base font-medium text-body-color dark:text-dark-6"
              v-if="plan.features.increment === '/hr' ">{{ plan.features.increment }}</span>
            </h2>
            <p
              class="h-20 mb-8 border-b border-stroke dark:border-dark-3 pb-8 text-base text-body-color dark:text-dark-6 font-semibold"
            >
              {{ plan.description }}
            </p>
            <div v-if="plan.features.rate !== ''"
            class="flex flex-col gap-[14px]">
              <p class="text-base text-body-color dark:text-dark-6">{{ plan.features.rate }}</p>
              <p class="text-base text-body-color dark:text-dark-6">{{ plan.features.music }}</p>
              <p class="text-base text-body-color dark:text-dark-6">{{ plan.features.microphones }}</p>
              <p class="text-base text-body-color dark:text-dark-6">{{ plan.features.speakers }}</p>
              <p class="text-base text-body-color dark:text-dark-6">{{ plan.features.lighting }}</p>
            </div>
            <div>
              <span class="absolute right-0 top-7 z-[-1]">
                <svg
                  width="77"
                  height="172"
                  viewBox="0 0 77 172"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="86"
                      y1="0"
                      x2="86"
                      y2="172"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#222222" stop-opacity="0.2" />
                      <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span class="absolute right-4 top-4 z-[-1]">
                <svg
                  width="41"
                  height="89"
                  viewBox="0 0 41 89"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="38.9138"
                    cy="87.4849"
                    r="1.42021"
                    transform="rotate(180 38.9138 87.4849)"
                    fill="#222222"
                  />
                  <circle
                    cx="38.9138"
                    cy="74.9871"
                    r="1.42021"
                    transform="rotate(180 38.9138 74.9871)"
                    fill="#222222"
                  />
                  <circle
                    cx="38.9138"
                    cy="62.4892"
                    r="1.42021"
                    transform="rotate(180 38.9138 62.4892)"
                    fill="#222222"
                  />
                  <circle
                    cx="38.9138"
                    cy="38.3457"
                    r="1.42021"
                    transform="rotate(180 38.9138 38.3457)"
                    fill="#222222"
                  />
                  <circle
                    cx="38.9138"
                    cy="13.634"
                    r="1.42021"
                    transform="rotate(180 38.9138 13.634)"
                    fill="#222222"
                  />
                  <circle
                    cx="38.9138"
                    cy="50.2754"
                    r="1.42021"
                    transform="rotate(180 38.9138 50.2754)"
                    fill="#222222"
                  />
                  <circle
                    cx="38.9138"
                    cy="26.1319"
                    r="1.42021"
                    transform="rotate(180 38.9138 26.1319)"
                    fill="#222222"
                  />
                  <circle
                    cx="38.9138"
                    cy="1.42021"
                    r="1.42021"
                    transform="rotate(180 38.9138 1.42021)"
                    fill="#222222"
                  />
                  <circle
                    cx="26.4157"
                    cy="87.4849"
                    r="1.42021"
                    transform="rotate(180 26.4157 87.4849)"
                    fill="#222222"
                  />
                  <circle
                    cx="26.4157"
                    cy="74.9871"
                    r="1.42021"
                    transform="rotate(180 26.4157 74.9871)"
                    fill="#222222"
                  />
                  <circle
                    cx="26.4157"
                    cy="62.4892"
                    r="1.42021"
                    transform="rotate(180 26.4157 62.4892)"
                    fill="#222222"
                  />
                  <circle
                    cx="26.4157"
                    cy="38.3457"
                    r="1.42021"
                    transform="rotate(180 26.4157 38.3457)"
                    fill="#222222"
                  />
                  <circle
                    cx="26.4157"
                    cy="13.634"
                    r="1.42021"
                    transform="rotate(180 26.4157 13.634)"
                    fill="#222222"
                  />
                  <circle
                    cx="26.4157"
                    cy="50.2754"
                    r="1.42021"
                    transform="rotate(180 26.4157 50.2754)"
                    fill="#222222"
                  />
                  <circle
                    cx="26.4157"
                    cy="26.1319"
                    r="1.42021"
                    transform="rotate(180 26.4157 26.1319)"
                    fill="#222222"
                  />
                  <circle
                    cx="26.4157"
                    cy="1.4202"
                    r="1.42021"
                    transform="rotate(180 26.4157 1.4202)"
                    fill="#222222"
                  />
                  <circle
                    cx="13.9177"
                    cy="87.4849"
                    r="1.42021"
                    transform="rotate(180 13.9177 87.4849)"
                    fill="#222222"
                  />
                  <circle
                    cx="13.9177"
                    cy="74.9871"
                    r="1.42021"
                    transform="rotate(180 13.9177 74.9871)"
                    fill="#222222"
                  />
                  <circle
                    cx="13.9177"
                    cy="62.4892"
                    r="1.42021"
                    transform="rotate(180 13.9177 62.4892)"
                    fill="#222222"
                  />
                  <circle
                    cx="13.9177"
                    cy="38.3457"
                    r="1.42021"
                    transform="rotate(180 13.9177 38.3457)"
                    fill="#222222"
                  />
                  <circle
                    cx="13.9177"
                    cy="13.634"
                    r="1.42021"
                    transform="rotate(180 13.9177 13.634)"
                    fill="#222222"
                  />
                  <circle
                    cx="13.9177"
                    cy="50.2754"
                    r="1.42021"
                    transform="rotate(180 13.9177 50.2754)"
                    fill="#222222"
                  />
                  <circle
                    cx="13.9177"
                    cy="26.1319"
                    r="1.42021"
                    transform="rotate(180 13.9177 26.1319)"
                    fill="#222222"
                  />
                  <circle
                    cx="13.9177"
                    cy="1.42019"
                    r="1.42021"
                    transform="rotate(180 13.9177 1.42019)"
                    fill="#222222"
                  />
                  <circle
                    cx="1.41963"
                    cy="87.4849"
                    r="1.42021"
                    transform="rotate(180 1.41963 87.4849)"
                    fill="#222222"
                  />
                  <circle
                    cx="1.41963"
                    cy="74.9871"
                    r="1.42021"
                    transform="rotate(180 1.41963 74.9871)"
                    fill="#222222"
                  />
                  <circle
                    cx="1.41963"
                    cy="62.4892"
                    r="1.42021"
                    transform="rotate(180 1.41963 62.4892)"
                    fill="#222222"
                  />
                  <circle
                    cx="1.41963"
                    cy="38.3457"
                    r="1.42021"
                    transform="rotate(180 1.41963 38.3457)"
                    fill="#222222"
                  />
                  <circle
                    cx="1.41963"
                    cy="13.634"
                    r="1.42021"
                    transform="rotate(180 1.41963 13.634)"
                    fill="#222222"
                  />
                  <circle
                    cx="1.41963"
                    cy="50.2754"
                    r="1.42021"
                    transform="rotate(180 1.41963 50.2754)"
                    fill="#222222"
                  />
                  <circle
                    cx="1.41963"
                    cy="26.1319"
                    r="1.42021"
                    transform="rotate(180 1.41963 26.1319)"
                    fill="#222222"
                  />
                  <circle
                    cx="1.41963"
                    cy="1.4202"
                    r="1.42021"
                    transform="rotate(180 1.41963 1.4202)"
                    fill="#222222"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
</div>
</div>
</template>
<style></style>
