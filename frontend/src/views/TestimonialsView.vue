<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTestimonialStore } from '@/stores/TestimonialStore';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';

const testimonialStore = useTestimonialStore();
const { testimonials } = storeToRefs(testimonialStore);

const loading = ref(true);

onMounted(async () => {
  await testimonialStore.fetchTestimonials();
  loading.value = false;
});
</script>
<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div v-if="!loading" class="relative flex flex-col h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Testimonials</h1>
      </div>
      <div class="flex-1 flex min-h-[700px]">
        <swiper-container
          class="mySwiper px-2 sm:px-0 pt-4 sm:py-10"
          initial-slide="4"
          pagination="true"
          effect="coverflow"
          grab-cursor="true"
          centered-slides="true"
          slides-per-view="auto"
          coverflow-effect-rotate="0"
          coverflow-effect-stretch="0"
          coverflow-effect-depth="100"
          coverflow-effect-modifier="1"
          coverflow-effect-slide-shadows="false"
          coverflow-effect-scale="0.8"
          autoplay-delay="3000"
          autoplay-disable-on-interaction="false"
          loop="true"
          style="--swiper-theme-color: var(--black-soft); --swiper-pagination-bottom: 8%"
        >
          <swiper-slide
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="flex flex-col justify-between p-6 border-[rgb(34,34,34)] border-2 rounded-xl shadow-lg w-full max-w-[500px] sm:max-h-fit max-h-[561px] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent"
          >
            <div class="flex items-center mb-4">
              <div class="flex items-center space-x-1">
                <svg
                  v-for="n in Math.floor(testimonial.stars)"
                  :key="n"
                  class="w-5 h-5 text-[var(--color6)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.14 3.513a1 1 0 00.95.69h3.688c.969 0 1.371 1.24.588 1.81l-2.985 2.17a1 1 0 00-.364 1.118l1.14 3.513c.3.921-.755 1.688-1.538 1.118l-2.985-2.17a1 1 0 00-1.176 0l-2.985 2.17c-.783.57-1.838-.197-1.538-1.118l1.14-3.513a1 1 0 00-.364-1.118L2.69 8.94c-.783-.57-.38-1.81.588-1.81h3.688a1 1 0 00.95-.69l1.14-3.513z"
                  ></path>
                </svg>
              </div>
              <span class="ml-2 text-sm font-bold" style="color: var(--black-soft)">
                "{{ testimonial.starsLabel }}"
              </span>
            </div>
            <div class="flex-1">
              <p class="text-gray-800 mb-4 sm:mb-0 font-medium min-h-[275px] h-auto">
                {{ testimonial.message }}
              </p>
            </div>
            <div class="border-t border-gray-400 pt-2">
              <p class="text-sm text-gray-700">- {{ testimonial.author }}</p>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>
<style scoped>
swiper-container {
  width: 100%;
}
</style>
