<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import {
  createAccount,
  updateName,
  updateEmail,
  updatePhone,
  updatePassword,
} from '@/services/userService';

const userStore = useUserStore();
const user = computed(() => userStore.user);

const showModal = ref(false);
const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: '',
});

const handleSubmit = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    await createAccount({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      phone: form.value.phone,
    });
    showModal.value = false;
  } catch (err) {
    console.error(err);
    alert('Failed to create account');
  }
};
</script>
<template>
  <div class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative h-full z-10">
      <div class="flex flex-col items-center sm:flex-row sm:justify-center pb-7 pt-17">
        <div class="flex sm:p-0 pb-10">
          <h1 class="text-6xl">Login</h1>
          <p class="font-serif text-5xl">&nbsp; / &nbsp;</p>
        </div>
        <h1 class="text-6xl">Signup</h1>
      </div>

      <form class="max-w-sm mx-auto px-2 pt-4 sm:py-10">
        <div class="relative w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Email address</label
          >
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Password</label
          >
        </div>
        <button
          type="submit"
          class="btnMain shadow-md focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center md:text-sm md:px-4 md:py-2 sm:text-sm sm:px-2 sm:py-1 w-full sm:w-auto"
        >
          Submit
        </button>
        <div class="text-sm text-gray-500 flex mt-4">
          <div>(Don't have an account?&nbsp;</div>
          <a class="cursor-pointer text-blue-800 text-md" @click="showModal = true">Sign up!</a>
          <div>)</div>

          <div
            v-if="showModal"
            class="fixed inset-0 bg-[rgba(34,34,34,0.7)] flex items-center justify-center z-50"
            @click.self="showModal = false"
          >
            <div class="bg-white rounded-lg p-6 w-full max-w-md relative">
              <h1 class="text-center text-xl pt-4" style="color: var(--color6)">Create Account</h1>
              <form @submit.prevent="handleSubmit" class="px-2 pt-4">
                <div class="relative z-50 mb-5 group">
                  <input
                    v-model="form.email"
                    type="email"
                    id="email"
                    required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
                    placeholder=" "
                  />
                  <label
                    for="email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Email</label
                  >
                </div>
                <div class="relative z-50 mb-5 group">
                  <input
                    v-model="form.password"
                    type="password"
                    id="password"
                    required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
                    placeholder=" "
                  />
                  <label
                    for="password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Password</label
                  >
                </div>

                <div class="relative z-50 mb-5 group">
                  <input
                    v-model="form.confirmPassword"
                    type="password"
                    id="confirmPassword"
                    required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
                    placeholder=" "
                  />
                  <label
                    for="confirmPassword"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Confirm Password</label
                  >
                </div>
                <div class="relative z-50 mb-5 group">
                  <input
                    v-model="form.name"
                    type="text"
                    id="name"
                    required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
                    placeholder=" "
                  />
                  <label
                    for="name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Full Name</label
                  >
                </div>
                <div class="relative z-50 mb-5 group">
                  <input
                    v-model="form.phone"
                    type="tel"
                    id="phone"
                    required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
                    placeholder=" "
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  />
                  <label
                    for="phone"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Phone (123-456-7890)</label
                  >
                </div>
                <button
                  type="submit"
                  class="btnMain shadow-md focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center md:text-sm md:px-4 md:py-2 sm:text-sm sm:px-2 sm:py-1 w-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style></style>
