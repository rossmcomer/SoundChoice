<script setup lang="ts">
import { testimonials } from '@/assets/testimonials';
</script>
<template>
  <div class="relative min-h-full">
  <video class="absolute inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative z-10 pt-10">
  <div class="flex justify-center py-7">
    <h1 class="text-6xl">Testimonials</h1>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center px-7">
    <div
      v-for="(testimonial, index) in testimonials"
      :key="index"
      class="bg-[rgba(255,255,255,0.7)] p-6 rounded-lg shadow divide-y divide-gray-200 w-full max-w-[500px] border-2 border-black"
    >
      <div class="flex items-center mb-4">
        <div class="flex items-center space-x-1">
          <svg
            v-for="n in Math.floor(testimonial.stars)"
            :key="n"
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.14 3.513a1 1 0 00.95.69h3.688c.969 0 1.371 1.24.588 1.81l-2.985 2.17a1 1 0 00-.364 1.118l1.14 3.513c.3.921-.755 1.688-1.538 1.118l-2.985-2.17a1 1 0 00-1.176 0l-2.985 2.17c-.783.57-1.838-.197-1.538-1.118l1.14-3.513a1 1 0 00-.364-1.118L2.69 8.94c-.783-.57-.38-1.81.588-1.81h3.688a1 1 0 00.95-.69l1.14-3.513z"
            ></path>
          </svg>
        </div>
        <span class="ml-2 text-sm text-gray-600 font-bold">"{{ testimonial.starsLabel }}"</span>
      </div>
      <p class="text-gray-800 mb-2">{{ testimonial.message }}</p>
      <p class="text-sm text-gray-500">- {{ testimonial.author }}</p>
    </div>
  </div>
</div>
</div>
</template>
<style></style>
