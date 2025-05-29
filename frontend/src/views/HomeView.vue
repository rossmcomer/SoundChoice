<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { initFlowbite } from 'flowbite';
import { useUserStore } from '@/stores/UserStore';
import BackgroundVideoHome from '@/components/BackgroundVideoHome.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  initFlowbite();
});

const userStore = useUserStore();
const user = computed(() => userStore.user);

const showOverlay = ref(true);
const promoVideo = ref<HTMLVideoElement | null>(null);

function playWithSound() {
  if (promoVideo.value) {
    promoVideo.value.muted = false;
    promoVideo.value.play();
    showOverlay.value = false;
  }
}

function handleLogout() {
  userStore.logoutUser();
  router.push('/login-sign-up');
}
</script>

<template>
  <div class="relative h-full overflow-hidden">
    <BackgroundVideoHome />
    <div class="w-full flex justify-left p-[2vh]">
      <a
        class="relative z-10 w-[100px]"
        target="_blank"
        href="https://www.theknot.com/marketplace/redirect-2087136?utm_source=vendor_website&utm_medium=banner&utm_term=232778f0-9067-40ac-8bff-f57d64cca8a1&utm_campaign=vendor_badge_assets"
        ><img
          alt="As Seen on The Knot"
          src="https://d13ns7kbjmbjip.cloudfront.net/For_Your_Website/TK-badge_AsSeen.png"
      /></a>
    </div>
    <div
      class="h-full flex flex-col place-items-center justify-start md:pt-0 relative z-10 sm:mt-10 md:mt-0 mt-15"
    >
      <div class="relative w-4/5 h-auto max-w-2xl mb-8">
        <video
          ref="promoVideo"
          class="rounded-xl shadow-lg border-3 border-[rgb(34,34,34)] w-full"
          muted
          controls
        >
          <source src="@/assets/Promo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          v-if="showOverlay"
          class="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer rounded-xl z-20"
          @click="playWithSound"
        >
          <button
            class="text-[var(--black-soft)] sm:text-xl text-xs bg-[var(--color6)] px-4 py-2 rounded-lg shadow-lg cursor-pointer hover:translate-0.5 animate-bounce"
          >
            ▶ Get Started With Our Welcome Video!
          </button>
        </div>
      </div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        class="focus:outline-none focus:ring-2 focus:ring-[var(--color6)] font-medium rounded-lg text-sm px-5 py-2.5 shadow-md text-center inline-flex items-center bg-[var(--black-soft)] text-[var(--color6)] cursor-pointer"
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
        class="z-20 hidden divide-y divide-[var(--divider-medium)] rounded-lg shadow-md w-44"
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
            <button
              @click="handleLogout"
              class="block w-full text-center px-4 py-2 hover:bg-[var(--color6)] hover:text-[var(--black-soft)] cursor-pointer"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
