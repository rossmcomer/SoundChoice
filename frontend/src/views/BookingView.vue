<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, computed, onMounted } from 'vue';
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
const eventType = ref<string>('');
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
        <UplightingSelector v-model="uplights" />
        <AdditionalHours v-model:addHours="addHours" v-model:additionalHours="additionalHours" />
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
