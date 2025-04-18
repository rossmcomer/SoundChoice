<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/UserStore';
import AppLoader from '@/components/AppLoader.vue';

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/pricing">Pricing</RouterLink>
        <RouterLink to="/testimonials">Testimonials</RouterLink>
        <RouterLink to="/media">Media</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <AppLoader />
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
