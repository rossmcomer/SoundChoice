<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useAvailabilityStore } from '@/stores/AvailabilityStore';

const userStore = useUserStore();
const availabilityStore = useAvailabilityStore();

const user = computed(() => userStore.user);
const date = ref();

const today = new Date();

onMounted(() => {
  availabilityStore.fetchDates();
});
</script>

<template>
  <div class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Booking</h1>
      </div>
      <div class="flex flex-col items-center p-4 sm:p-10">
      <div class="flex-1 sm:max-w-xl font-medium p-8 space-y-4 border-2 border-[rgb(34,34,34)] rounded-xl shadow-lg text-gray-800 min-h-[250px] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent">
        <div class="sm:text-2xl text-xl text-center font-bold pb-4">Reserve your special date in 5 easy steps!</div>
        <div class="sm:text-lg"><b>Step 1:</b> Create an account and login.</div>
        <div class="sm:text-lg"><b>Step 2:</b> Click "Book Now!"</div>
        <div class="sm:text-lg"><b>Step 3:</b> Choose your date, time, location, and event type.</div>
        <div class="sm:text-lg"><b>Step 4:</b> Add uplights and any additional time.</div>
        <div class="sm:text-lg"><b>Step 5:</b> Pay your deposit equal to 50% of the total cost.</div>
        <div class="sm:text-2xl text-xl text-center font-bold">Done!</div>
      </div>
      <div>Pick A Day For Your Event! Date not available? Please contact us @</div>
      <VueDatePicker
        v-model="date"
        :min-date="today"
        :disabled-dates="availabilityStore.unavailableDates.map((d) => new Date(d.date))"
        inline
        auto-apply
        dark
      ></VueDatePicker>

      <form class="max-w-sm mx-auto">
        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select an option</label
        >
        <select
          id="eventType"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose Event Type</option>
          <option value="wedding">Wedding</option>
          <option value="corporate">Corporate</option>
          <option value="birthday">Birthday</option>
          <option value="barBatMitzvah">Mitzvah</option>
          <option value="other">Other</option>
        </select>
      </form>

      <form class="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
        <div>
          <label
            for="start-time"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Start time:</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="start-time"
              class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="09:00"
              max="18:00"
              value="00:00"
              required
            />
          </div>
        </div>
        <div>
          <label for="end-time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >End time:</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="end-time"
              class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="09:00"
              max="18:00"
              value="00:00"
              required
            />
          </div>
        </div>
      </form>

      <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Would you like to add the additional uplighting package for only $200 extra?
      </h3>
      <ul class="grid w-full gap-6 md:grid-cols-2">
        <li>
          <input
            type="radio"
            id="hosting-small"
            name="hosting"
            value="hosting-small"
            class="hidden peer"
            required
          />
          <label
            for="hosting-small"
            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div class="block">
              <div class="w-full text-lg font-semibold">Yes</div>
            </div>
            <svg
              class="w-5 h-5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="hosting-big"
            name="hosting"
            value="hosting-big"
            class="hidden peer"
          />
          <label
            for="hosting-big"
            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div class="block">
              <div class="w-full text-lg font-semibold">No</div>
            </div>
            <svg
              class="w-5 h-5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </label>
        </li>
      </ul>
    </div>
    </div>
  </div>
  <!-- <div class="flex place-content-center">
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
    </div> -->
</template>
<style></style>
