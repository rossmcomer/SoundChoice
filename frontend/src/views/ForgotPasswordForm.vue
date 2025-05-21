<script setup lang="ts">
import { ref } from 'vue';
import { handleForgotPassword } from '@/services/userService';
import { toast } from 'vue3-toastify';

const emit = defineEmits(['close']);

const email = ref('');

const onSubmit = () => {
  try {
    handleForgotPassword(email.value);
    toast.info('Check your email for a reset link.');
    emit('close');
  } catch (err: any) {
    toast.error(err.response?.data?.error || 'Something went wrong');
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col">
    <div class="relative z-50 mb-5 group">
      <input
        v-model="email"
        type="email"
        id="reset_email"
        required
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
        placeholder=" "
      />
      <label
        for="reset_email"
        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Email
      </label>
    </div>
    <button
      class="btnMain shadow-md focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center md:text-sm md:px-4 md:py-2 sm:text-sm sm:px-2 sm:py-1 w-full"
      type="submit"
    >
      Reset Password
    </button>
  </form>
</template>
