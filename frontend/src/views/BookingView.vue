<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, computed, onMounted } from 'vue';
import type { EventType } from '@/types';
import { useUserStore } from '@/stores/UserStore';
import { useAvailabilityStore } from '@/stores/AvailabilityStore';
import BookingInstructionsCard from '@/components/BookingInstructionsCards.vue';
import EventTypeDropdown from '@/components/EventTypeDropdown.vue';
import EventTimeSelector from '@/components/EventTimeSelector.vue';
import UplightingSelector from '@/components/UplightingSelector.vue';
import AdditionalHours from '@/components/AdditionalHours.vue';

const userStore = useUserStore();
const availabilityStore = useAvailabilityStore();

const user = computed(() => userStore.user);

const date = ref<Date | null>(null);
const eventType = ref<EventType | ''>('');
const startTime = ref<string>('00:00');
const endTime = ref<string>('00:00');
const uplights = ref<boolean>(false);
const addHours = ref<boolean>(false);
const additionalHours = ref<number>(1);

const today = new Date();

onMounted(() => {
  availabilityStore.fetchDates();
});
</script>

<template>
  <div v-if="!user" class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  <div class="relative h-full z-10">
    <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Booking</h1>
      </div>
    <div 
    class="flex flex-col place-items-center justify-center my-8">
        <div class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10 mb-10">Please login/create an account to proceed with booking.</div>
        <button
          type="button"
          @click="$router.push('/login-sign-up')"
          class="btnMain flex justify-center items-center w-4/5 sm:w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center sm:text-sm sm:px-4 sm:py-2"
        >
        Proceed To Login <svg
              class="w-4 h-4 sm:w-5 sm:h-5 ms-1.5 rtl:rotate-180"
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
        </button>
    </div>
    <div></div>
    </div>
  </div>
  <div v-else class="relative h-full">
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
        <h2 v-if="eventType === 'wedding'" class="text-[var(--black-soft)] italic">
          Important: Wedding pricing includes 5 hours by default! If you would like to add
          additional hours, please specify below. The cost is $150 for each added hour.
        </h2>
        <UplightingSelector v-model="uplights" />
        <AdditionalHours
          v-if="eventType === 'wedding'"
          v-model:addHours="addHours"
          v-model:additionalHours="additionalHours"
        />
      </div>
    </div>
  </div>
</template>
<style>
.dp__theme_dark {
  --dp-primary-color: #daa520;
  --dp-primary-text-color: var(--black-soft);
  --dp-background-color: var(--black-soft);
  --dp-text-color: var(--white-soft);
}
</style>
