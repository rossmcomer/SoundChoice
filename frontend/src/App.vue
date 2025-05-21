<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

import { useGlobalStore } from '@/stores/GlobalStore';
import { useUserStore } from '@/stores/UserStore';
import { useProductStore } from './stores/ProductStore';

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
    <div class="bg-black/20 text-[var(--black-soft)] py-4 px-4 text-left z-10 space-y-1 mt-10">
  <p class="font-semibold">Have Questions? Need A Quote?</p>

  <p class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>

    <a href="tel:+19707590574" class="hover:underline">(970) 759-0574</a>
  </p>

  <p class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

    <a href="mailto:kyle.soundchoice@gmail.com" class="hover:underline">kyle.soundchoice@gmail.com</a>
  </p>
</div>
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
