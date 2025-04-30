<script setup lang="ts">
import { ref, computed } from 'vue';
import SCLogoPhones from '@/assets/SoundChoice-Logo/SC-Logo-Small.png';
import SCLogoText from '@/assets/SoundChoice-Logo/SC-Logo-Text-Only.png';
import { useUserStore } from '@/stores/UserStore';

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const userStore = useUserStore();
const user = computed(() => userStore.user);
</script>

<template>
  <nav class="fixed w-full z-20 top-0 start-0 min-w-[344px] shadow-lg">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img :src="SCLogoPhones" class="h-8" alt="SoundChoice Logo" />
        <img :src="SCLogoText" class="h-8" alt="SoundChoice Logo" />
      </router-link>
      <div class="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          @click="$router.push('/booking')"
          class="btnMain focus:ring-4 shadow-md focus:outline-none font-medium rounded-lg text-xs px-2 py-1 text-center md:text-sm md:px-4 md:py-2 sm:text-sm sm:px-2 sm:py-1"
        >
          Book Now!
        </button>
        <button
          @click="toggleMenu"
          type="button"
          class="toggleMenu inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        :class="[
          'items-center justify-between w-full md:flex md:w-auto md:order-1',
          isOpen ? 'flex' : 'hidden',
        ]"
        id="navbar-sticky"
      >
        <ul
          class="flex w-full flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
        >
          <li>
            <router-link
              to="/"
              class="block py-2 px-3 text-white rounded-sm nav-link-md"
              aria-current="page"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="block py-2 px-3 nav-link-md"> About </router-link>
          </li>
          <li>
            <router-link to="/testimonials" class="block py-2 px-3 nav-link-md">
              Testimonials
            </router-link>
          </li>
          <li>
            <router-link to="/media" class="block py-2 px-3 nav-link-md"> Media </router-link>
          </li>
          <li>
            <router-link to="/pricing" class="block py-2 px-3 nav-link-md"> Pricing </router-link>
          </li>
          <li v-if="!user">
            <router-link to="/login-sign-up" class="block py-2 px-3 nav-link-md">
              Login / Signup
            </router-link>
          </li>
          <li v-else>
            <router-link to="/logout" class="block py-2 px-3 nav-link-md"> Logout </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media (hover: hover) {
  .nav-link-md:hover {
    background-color: transparent !important;
    color: var(--color6) !important;
    transform: scale(1.25);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  .toggleMenu:hover {
    color: var(--color6);
    cursor: pointer;
  }
}

@media (min-width: 768px) {
  .nav-link-md {
    padding: 0 !important;
    background-color: transparent !important;
  }
}

nav {
  width: 100%;
  z-index: 100;
  font-size: 12px;
  text-align: center;
  color: var(--white-soft);
  background-color: var(--black-soft) !important;
}

nav a.router-link-exact-active {
  color: var(--color6);
}

.toggleMenu:focus {
  color: var(--color6);
  cursor: pointer;
}
</style>
