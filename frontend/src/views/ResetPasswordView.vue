<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { submitNewPassword } from '@/services/userService';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';

const router = useRouter();

const route = useRoute();
const token = route.query.token as string;

const newPassword = ref('');

const onSubmit = async () => {
  if (!token) {
    toast.warn('Missing reset token.');
    return;
  }
  try {
    await submitNewPassword(token, newPassword.value);
    router.push('/login-sign-up');
    setTimeout(() => {
      toast.success('Password reset successful. You can now log in.');
    }, 1000);
  } catch (err: any) {
    toast.error(err.response?.data?.error || 'Something went wrong');
  }
};
</script>

<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div class="relative h-full z-10">
      <div class="flex flex-col items-center mt-40">
        <form
          @submit.prevent="onSubmit"
          class="max-w-sm min-w-[250px] flex flex-col justify-center pt-17"
        >
          <div class="relative z-50 mb-5 group">
            <input
              v-model="newPassword"
              type="password"
              id="newPassword"
              required
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
              placeholder=" "
            />
            <label
              for="newPassword"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
          </div>
          <button
            class="btnMain cursor-pointer shadow-md focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center md:text-sm md:px-4 md:py-2 sm:text-sm sm:px-2 sm:py-1 w-full"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
