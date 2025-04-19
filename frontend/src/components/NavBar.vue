<script setup lang="ts">
import {
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLink,
  FwbNavbarLogo,
} from 'flowbite-vue'
import SCLogoPhones from '@/assets/SoundChoice-Logo/SC-Logo-Small.png'
import SCLogoText from '@/assets/SoundChoice-Logo/SC-Logo-Text-Only.png'
</script>

<template>
  

<nav class="navBar !mt-0">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-25">
    <a href="/" class="flex h-20 py-1 items-start">
        <img :src="SCLogoPhones" class="h-full px-5" alt="SoundChoice Logo Headphones" />
        <img :src="SCLogoText" class="h-full" alt="SoundChoice Logo Text" />
    </a>
    <button data-collapse-toggle="navbar-hamburger" type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div class="hidden w-full" id="navbar-hamburger">
      <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <li>
          <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded-sm dark:bg-blue-600" aria-current="page">Home</a>
        </li>
        <li>
          <a href="/about" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">About</a>
        </li>
        <li>
          <a href="/pricing" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
        </li>
        <li>
          <a href="/testimonials" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Testimonials</a>
        </li>
        <li>
          <a href="/media" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Media</a>
        </li>
        <li>
          <a href="/login" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Login</a>
        </li>
        <li>
          <a href="/profile" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Profile</a>
        </li>
        <li>
          <a href="/logout" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  <!-- <fwb-navbar>
    <template #logo>
      <fwb-navbar-logo alt="Sound Choice DJ Services Logo" :image-url="soundChoiceBrand" link="/">
      </fwb-navbar-logo>
    </template>
    <template #default="{isShowMenu}">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link link="/">Home</fwb-navbar-link>
        <fwb-navbar-link link="/about">About</fwb-navbar-link>
        <fwb-navbar-link link="/pricing" >Pricing</fwb-navbar-link>
        <fwb-navbar-link link="/testimonials">Testimonials</fwb-navbar-link>
        <fwb-navbar-link link="/media">Media</fwb-navbar-link>
        <fwb-navbar-link link="/login">Login</fwb-navbar-link>
        <fwb-navbar-link link="/profile">Profile</fwb-navbar-link>
        <fwb-navbar-link link="/logout">Logout</fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
    <template #menu-icon>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </template>
  </fwb-navbar> -->
</template>

<style scoped>
.navBar {
  background-color: var(--black-soft) !important;
}
</style>
