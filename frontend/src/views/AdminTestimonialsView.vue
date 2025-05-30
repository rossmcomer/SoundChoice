<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTestimonialStore } from '@/stores/TestimonialStore';
import { onMounted, ref } from 'vue';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';
import adminService from '@/services/adminService';
import { toast } from 'vue3-toastify';

const testimonialStore = useTestimonialStore();
const { testimonials } = storeToRefs(testimonialStore);
const router = useRouter();

const loading = ref(true);

onMounted(async () => {
  await testimonialStore.fetchTestimonials();
  loading.value = false;
});

const newTestimonial = ref({
  stars: 5,
  starsLabel: '',
  message: '',
  author: '',
});

const addTestimonial = async () => {
  try {
    await adminService.addTestimonial(newTestimonial.value);
    toast.success('Testimonial added successfully!');
    newTestimonial.value = {
      stars: 5,
      starsLabel: '',
      message: '',
      author: '',
    };
    await testimonialStore.fetchTestimonials();
  } catch (error) {
    toast.error('Failed to add testimonial.');
    console.error(error);
  }
};

const removeTestimonial = async (id: string) => {
  try {
    await adminService.removeTestimonial(id);
    toast.success('Testimonial removed successfully!');
    await testimonialStore.fetchTestimonials();
  } catch (error) {
    toast.error('Failed to remove testimonial.');
    console.error(error);
  }
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div class="relative z-10 p-6 space-y-4 text-[var(--black-soft)]">
      <button
        @click="goBack"
        class="mb-4 bg-gray-200 text-[var(--black-soft)] px-4 py-2 rounded hover:bg-gray-300 border border-[var(--black-soft)] transition cursor-pointer min-w-[82px]"
      >
        ← Back
      </button>
      <div class="space-y-4 flex flex-col items-center min-w-[300px]">
        <!-- Add Testimonial Form -->
        <form
          @submit.prevent="addTestimonial"
          class="space-y-4 border-2 w-full sm:w-xl p-4 rounded-xl bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent"
        >
          <h3 class="text-2xl text-center font-bold">Add New Testimonial</h3>

          <div>
            <label class="block mb-1 font-medium">Stars</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              v-model.number="newTestimonial.stars"
              class="w-full border border-gray-500 rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div>
            <label class="block mb-1 font-medium">Headline</label>
            <input
              type="text"
              v-model="newTestimonial.starsLabel"
              class="w-full border border-gray-500 rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div>
            <label class="block mb-1 font-medium">Message</label>
            <textarea
              v-model="newTestimonial.message"
              class="w-full border border-gray-500 rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-0"
              required
            ></textarea>
          </div>

          <div>
            <label class="block mb-1 font-medium">Author</label>
            <input
              type="text"
              v-model="newTestimonial.author"
              class="w-full border border-gray-500 rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-0"
              required
            />
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              class="px-4 py-2 btnMain rounded-lg cursor-pointer transition font-medium shdaow-md sm:w-auto w-full"
            >
              Add Testimonial
            </button>
          </div>
        </form>
        <h2 class="text-3xl font-bold mb-4 text-center">
          Testimonials ({{ testimonials.length }})
        </h2>
        <!-- Testimonials List -->
        <ul v-if="testimonials.length && !loading" class="space-y-2">
          <li
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="flex justify-between items-start p-4 border border-[rgb(34,34,34)] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent rounded-xl"
          >
            <div class="text-black space-y-1">
              <div>
                <span class="font-bold">Stars:</span>
                <span> ⭐ {{ Number(testimonial.stars).toFixed(1) }}</span>
              </div>
              <div>
                <span class="font-bold">Headline: </span>
                <span class="italic"> {{ testimonial.starsLabel }}</span>
              </div>
              <div>
                <span class="font-bold">Message: </span>
                <span> "{{ testimonial.message }}"</span>
              </div>
              <div class="text-sm text-gray-700">
                <span class="font-bold">Author: </span>
                <span> {{ testimonial.author }}</span>
              </div>
            </div>
            <button
              @click="removeTestimonial(testimonial.id)"
              class="ml-4 px-4 py-2 btnMain font-medium shadow-md rounded-lg cursor-pointer h-fit min-w-[82px]"
            >
              Remove
            </button>
          </li>
        </ul>
        <div v-else>Loading...</div>
      </div>
    </div>
  </div>
</template>
