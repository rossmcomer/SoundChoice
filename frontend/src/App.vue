<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { storeToRefs } from 'pinia';

import { useGlobalStore } from '@/stores/GlobalStore';
import { useUserStore } from '@/stores/UserStore';
import AppLoader from '@/components/AppLoader.vue';

const global = useGlobalStore();

const { user } = storeToRefs(useUserStore());


global.startLoading();

global.stopLoading();
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar />
    </div>
  </header>

  <main class="pt-17 h-screen">
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
