<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import { useRoute } from 'vue-router';

import { useGlobalStore } from '@/stores/GlobalStore';
import { useUserStore } from '@/stores/UserStore';
import { useProductStore } from './stores/ProductStore';

const route = useRoute();

const global = useGlobalStore();

const userStore = useUserStore();
const productStore = useProductStore();

onMounted(async () => {
  global.startLoading();
  await Promise.all([userStore.fetchUser(), productStore.fetchProducts()]);
  global.stopLoading();
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <div class="wrapper">
        <NavBar />
      </div>
    </header>

    <main class="flex-grow pt-17">
      <RouterView />
    </main>
    <Footer v-if="!route.path.startsWith('/admin')" />
  </div>
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
  transition: var(--transition-default);
}

.btnMain:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 1px var(--color6);
}
</style>
