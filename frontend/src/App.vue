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
  <!-- <AppLoader /> -->
</template>

<style>
main {
  color: var(--color6);
}

h1 {
  font-family: 'RoyaleSmith';
}

@media (hover: hover) {
  .btnMain:hover {
    background-color: var(--black-soft);
    box-shadow: 0 0 0 2px var(--color6);
    color: var(--white-soft);
    cursor: pointer;
  }
}

.btnMain {
  background-color: var(--color6);
  color: var(--black-soft);
  box-shadow: 0 0 0 2px var(--color6);
  transition: var(--transition-default)
}

.btnMain:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 1px var(--color6);
}
</style>
