<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();
const user = computed(() => userStore.user);</script>
<template>
    <div class="flex justify-center mt-5">
        <h1 class="text-6xl">Booking</h1>
    </div>
    <div class="flex place-content-center">
    <div v-if="!user"
    class="flex flex-col place-items-center justify-center my-8">
        <div class="text-center mb-4">Please login/create an account to proceed with booking.</div>
        <button
          type="button"
          @click="$router.push('/login-sign-up')"
          class="btnMain focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-2 py-1 text-center md:text-sm md:px-4 md:py-2 sm:text-sm sm:px-2 sm:py-1"
        >
        Proceed to login.
        </button>
    </div>
    <div v-else></div>
    </div>
</template>
<style>
@media (hover: hover) {
  .btnMain:hover {
    background-color: var(--grey-soft);
    box-shadow: 0 0 0 2px var(--color6);
    color: var(--black-soft);
    cursor: pointer;
  }
}

.btnMain {
  background-color: var(--color6);
  color: var(--black-soft);
}

.btnMain:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 1px var(--color6);
}
</style>
