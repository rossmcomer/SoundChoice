<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import { updateName, updateEmail, updatePhone, updatePassword } from '@/services/userService';
import BookingsAccordion from '@/components/BookingsAccordion.vue';
import { toast } from 'vue3-toastify';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';

const router = useRouter();

const userStore = useUserStore();
const user = computed(() => userStore.user);

const handleLogout = async () => {
  try {
    await userStore.logoutUser();
    router.push('/login-sign-up');
    setTimeout(() => {
      toast.error('Successfully logged out.');
    }, 1000);
  } catch (err) {
    console.error('Logout failed:', err);
    toast.error('Failed to log out');
  }
};

const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, ''); // Remove non-digit characters
  if (digits.length !== 10) return phone; // Return original if not 10 digits
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};
</script>
<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div class="relative h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Profile</h1>
      </div>
      <div v-if="user" class="flex flex-col items-center my-8">
        <div class="sm:max-w-4/5 sm:w-2xl w-full px-4">
          <div class="flex justify-between">
            <div class="text-[var(--black-soft)]">
              <div class="flex"><p class="min-w-[50px]"><b>Name:</b></p> {{ user.name }}</div>
              <div class="flex"><p class="min-w-[50px]"><b>Email:</b></p> {{ user.email }}</div>
              <div class="flex"><p class="min-w-[50px]"><b>Phone:</b></p> {{ formatPhone(user.phone) }}</div>
            </div>
            <div class="flex items-center">
              <button
                @click="handleLogout"
                class="bg-[var(--black-soft)] text-[var(--color6)] hover:bg-[var(--color6)] hover:text-[var(--black-soft)] hover:shadow-md flex justify-center items-center w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center px-4 py-2 cursor-pointer transition-[var(--transition-default)] h-min"
              >
                Logout
              </button>
            </div>
          </div>
          <BookingsAccordion />
        </div>
      </div>
      <div v-else class="flex flex-col place-items-center justify-center my-8">
        <div class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10 mb-10">
          Please sign in to view your profile.
        </div>
        <button
          type="button"
          @click="$router.push('/login-sign-up')"
          class="btnMain flex justify-center items-center w-4/5 sm:w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center sm:text-sm sm:px-4 sm:py-2"
        >
          Proceed To Login
          <svg
            class="w-4 h-4 sm:w-5 sm:h-5 ms-1.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<style></style>
