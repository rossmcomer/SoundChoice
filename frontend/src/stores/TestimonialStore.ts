import type { Testimonial } from '@/types';
import { ref } from 'vue';
import { defineStore } from 'pinia';

import testimonialService from '@/services/testimonialService';

export const useTestimonialStore = defineStore('TestimonialStore', () => {
  const testimonials = ref<Testimonial[]>([]);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialService.getTestimonials();
      testimonials.value = response;
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
    }
  };

  return { fetchTestimonials, testimonials };
});
