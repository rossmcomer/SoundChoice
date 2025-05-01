<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useAvailabilityStore } from '@/stores/AvailabilityStore';
import BookingInstructionsCard from '@/components/BookingInstructionsCards.vue';
import EventTypeDropdown from '@/components/EventTypeDropdown.vue';
import EventTimeSelector from '@/components/EventTimeSelector.vue';

const userStore = useUserStore();
const availabilityStore = useAvailabilityStore();

const user = computed(() => userStore.user);

const date = ref<Date | null>(null);
const eventType = ref<string>('');
const startTime = ref<string>('00:00');
const endTime = ref<string>('00:00');

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
        <BookingInstructionsCard />
        <div class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10">
          Pick A Day For Your Event!
        </div>
        <div class="sm:text-sm text-center pb-4 text-gray-800">
          Date not available? Please contact us!
        </div>
        <div class="flex justify-center">
          <VueDatePicker
            v-model="date"
            :min-date="today"
            :disabled-dates="availabilityStore.unavailableDates.map((d) => new Date(d.date))"
            inline
            auto-apply
            dark
            :enable-time-picker="false"
          ></VueDatePicker>
        </div>

        <EventTypeDropdown v-model="eventType" />
        <EventTimeSelector v-model:startTime="startTime" v-model:endTime="endTime" />

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
<style>
.dp__theme_dark {
  --dp-primary-color: #daa520;
  --dp-primary-text-color: var(--black-soft);
  --dp-background-color: var(--black-soft);
  --dp-text-color: var(--white-soft);
}
</style>
