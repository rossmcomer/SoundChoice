<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { initFlowbite } from 'flowbite';
import { useUserStore } from '@/stores/UserStore';

onMounted(() => {
  initFlowbite();
});

const userStore = useUserStore();
const user = computed(() => userStore.user);
</script>

<template>
  <div class="relative h-full overflow-hidden">
    <video class="absolute inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie1-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div
      class="h-full flex flex-col place-items-center justify-start pt-[25vh] md:justify-center md:pt-0 relative z-10"
    >
      <video
        class="w-4/5 h-auto max-w-3xl rounded-lg shadow-lg mb-8 border-2 border-[rgb(34,34,34)]"
        autoplay
        muted
        controls
      >
        <source src="@/assets/Promo-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        class="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Get Started<svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdown"
        class="z-10 hidden divide-y divide-[var(--divider-medium)] rounded-lg shadow-sm w-44"
        style="background-color: var(--black-soft); color: var(--color6)"
      >
        <ul class="py-2 text-sm text-center" aria-labelledby="dropdownDefaultButton">
          <li>
            <router-link
              to="/about"
              class="block px-4 py-2 hover:bg-[var(--color6)] hover:text-[var(--black-soft)]"
              >About</router-link
            >
          </li>
          <li>
            <router-link
              to="/testimonials"
              class="block px-4 py-2 hover:bg-[var(--color6)] hover:text-[var(--black-soft)]"
              >Testimonials</router-link
            >
          </li>
          <li>
            <router-link
              to="/media"
              class="block px-4 py-2 hover:bg-[var(--color6)] hover:text-[var(--black-soft)]"
              >Media</router-link
            >
          </li>
          <li>
            <router-link
              to="/pricing"
              class="block px-4 py-2 hover:bg-[var(--color6)] hover:text-[var(--black-soft)]"
              >Pricing</router-link
            >
          </li>
          <li v-if="!user">
            <router-link
              to="/login-sign-up"
              class="block px-4 py-2 hover:bg-[var(--color6)] hover:text-[var(--black-soft)]"
              >Login / Signup</router-link
            >
          </li>
          <li v-else>
            <router-link
              to="/logout"
              class="block px-4 py-2 hover:bg-[var(--color6)] hover:text-[var(--black-soft)]"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  color: var(--color6);
  background-color: var(--black-soft) !important;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color6);
}

@media (hover: hover) {
  button:hover {
    cursor: pointer;
    background-color: var(--color6);
  }
}
/* .scaleAnimation {
  background-image: url('../assets/Waves-sunny.svg');
  z-index: -1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: scalePulse 20s ease-in-out infinite;
}

@keyframes scalePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
} */
</style>
