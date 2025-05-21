<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { createAccount } from '@/services/userService';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();

const userStore = useUserStore();

const loginForm = ref({
  email: '',
  password: '',
});

const showModal = ref(false);
const signUpForm = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: '',
});

const handleLogin = async () => {
  try {
    await userStore.loginUser({
      email: loginForm.value.email,
      password: loginForm.value.password,
    });
    toast.success('Successfully logged in.');
    router.push('/');
  } catch (err) {
    console.error(err);
    toast.error('Failed to login');
  }
};

const handleSignUpSubmit = async () => {
  if (signUpForm.value.password !== signUpForm.value.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  try {
    await createAccount({
      email: signUpForm.value.email,
      password: signUpForm.value.password,
      name: signUpForm.value.name,
      phone: signUpForm.value.phone,
    });
    showModal.value = false;
    toast.success('Successfully created account.');
  } catch (err) {
    console.error(err);
    toast.error('Failed to create account');
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

      <form @submit.prevent="handleLogin" class="max-w-sm mx-auto px-2 pt-4 sm:py-10">
        <div class="relative w-full mb-5 group">
          <input
            v-model="loginForm.email"
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
            v-model="loginForm.password"
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
          <div>( Don't have an account?&nbsp;</div>
          <a
            class="cursor-pointer text-blue-800 text-md font-medium hover:scale-105"
            @click="showModal = true"
            >Sign up!</a
          >
          <div>&nbsp)</div>

          <div
            v-if="showModal"
            class="fixed inset-0 bg-[rgba(34,34,34,0.7)] flex items-center justify-center z-50"
            @click.self="showModal = false"
          >
            <div
              class="relative bg-white rounded-lg p-6 w-full max-w-md border-[rgb(34,34,34)] border-2"
            >
              <h1 class="text-center text-xl pt-4" style="color: var(--color6)">Create Account</h1>
              <form @submit.prevent="handleSignUpSubmit" class="px-2 pt-4">
                <div class="relative z-50 mb-5 group">
                  <input
                    v-model="signUpForm.email"
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
                    v-model="signUpForm.password"
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
                    v-model="signUpForm.confirmPassword"
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
                    v-model="signUpForm.name"
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
                    v-model="signUpForm.phone"
                    type="tel"
                    id="phone"
                    required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
                    placeholder=" "
                    pattern="^(\d{10}|\d{3}-\d{3}-\d{4})$"
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
