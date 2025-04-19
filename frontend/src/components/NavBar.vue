<script setup lang="ts">
import { ref } from 'vue'
import SCLogoPhones from '@/assets/SoundChoice-Logo/SC-Logo-Small.png'
import SCLogoText from '@/assets/SoundChoice-Logo/SC-Logo-Text-Only.png'

const isMenuOpen = ref(false)
</script>

<template>
  

<nav class="navBar !mt-0">
  <div class="max-w-screen-xl flex flex-nowrap items-center justify-between mx-auto h-25">
    <div class="flex h-20 items-center py-1 min-w-[310px]">
      <a href="/" class="h-full px-5">
          <img :src="SCLogoPhones" class="h-full" alt="SoundChoice Logo Headphones" />
      </a>
      <img :src="SCLogoText" class="w-50" alt="SoundChoice Logo Text" />
    </div>
    <button
        @click="isMenuOpen = !isMenuOpen"
        type="button"
        class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-menu"
        :aria-expanded="isMenuOpen"
      >
        <span class="sr-only">Toggle main menu</span>
        <svg class="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
          <path
            style="color: var(--color6)"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      <!-- Navigation Links -->
      <div
        id="navbar-menu"
        :class="[
          'w-full mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700',
          isMenuOpen ? 'block' : 'hidden'
        ]"
      >
        <ul class="flex flex-col font-medium">
          <li><a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded-sm dark:bg-blue-600" aria-current="page">Home</a></li>
          <li><a href="/about" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">About</a></li>
          <li><a href="/pricing" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a></li>
          <li><a href="/testimonials" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Testimonials</a></li>
          <li><a href="/media" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Media</a></li>
          <li><a href="/login" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Login</a></li>
          <li><a href="/profile" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Profile</a></li>
          <li><a href="/logout" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Logout</a></li>
        </ul>
      </div>
  </div>
</nav>
</template>

<style scoped>
.navBar {
  background-color: var(--black-soft) !important;
}
</style>
