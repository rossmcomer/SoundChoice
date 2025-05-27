import type { Testimonial } from '@/types';
import { ref } from 'vue';
import { defineStore } from 'pinia';

import testimonialService from '@/services/testimonialService';

export const useTestimonialStore = defineStore('TestimonialStore', () => {
  const testimonials = ref<Testimonial[]>([]);

  const fetchTestimonials = async () => {
    try {
      const testimonials = await testimonialService.getTestimonials();
      testimonials.value = testimonials;
    } catch (err) {
      console.error('Failed to fetch unavailable dates:', err);
    }
  };

  return { fetchTestimonials, testimonials };
});
