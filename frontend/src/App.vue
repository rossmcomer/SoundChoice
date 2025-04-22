<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/UserStore';
import AppLoader from '@/components/AppLoader.vue';

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar />
    </div>
  </header>

  <main class="pt-20">
    <RouterView />
  </main>
  <AppLoader />
</template>

<style>
main {
  color: var(--color6);
}

h1 {
  font-family: 'RoyaleSmith';
}</style>
