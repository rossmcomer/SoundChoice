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
      <NavBar />
    </div>
  </header>

  <RouterView />
  <AppLoader />
</template>

<style scoped>
</style>
