<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { EventType } from '@/types';
import { useUserStore } from '@/stores/UserStore';
import BookingInstructionsCard from '@/components/BookingInstructionsCards.vue';
import DateSelector from '@/components/DateSelector.vue';
import EventTypeDropdown from '@/components/EventTypeDropdown.vue';
import EventTimeSelector from '@/components/EventTimeSelector.vue';
import UplightingSelector from '@/components/UplightingSelector.vue';
import AdditionalHours from '@/components/AdditionalHours.vue';
import { useTimeZoneAbbr } from '@/composables/useTimeZoneAbbr';

const userStore = useUserStore();

const user = computed(() => userStore.user);

const date = ref<Date | null>(null);
const eventType = ref<EventType | ''>('');
const startTime = ref<string>('12:00');
const endTime = ref<string>('-');
const uplights = ref<boolean>(false);
const addHours = ref<boolean>(false);
const additionalHours = ref<number>(1);
const timeZoneAbbr = useTimeZoneAbbr();

function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

watch([startTime, eventType, addHours, additionalHours], () => {
  const start = parseTime(startTime.value);
  let totalHours = 0;

  if (eventType.value === 'wedding') {
    totalHours = 5;
    if (addHours.value) {
      totalHours += additionalHours.value;
    }
  } else {
    totalHours = additionalHours.value ?? 0;
  }

  const newEnd = new Date(start);
  newEnd.setHours(start.getHours() + totalHours);
  endTime.value = formatTime(newEnd);
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
      <div class="flex flex-col place-items-center justify-center my-8">
        <div class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10 mb-10">
          Please login/create an account to proceed with booking.
        </div>
        <button
          type="button"
          @click="$router.push('/login-sign-up')"
          class="btnMain flex justify-center items-center w-4/5 sm:w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center sm:text-sm sm:px-4 sm:py-2"
        >
          Proceed To Login
          <svg
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
        <div
          class="flex flex-col p-4 items-center md:grid md:grid-cols-3 md:gap-2 md:items-start rounded-xl shadow-lg border-3 border-[rgb(34,34,34)] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent"
        >
          <div class="w-full flex flex-col justify-center">
            <DateSelector v-model="date" />
          </div>
          <div class="w-full flex flex-1 flex-col items-center">
            <EventTypeDropdown v-model:eventType="eventType" />
            <EventTimeSelector
              v-model:startTime="startTime"
              v-model:timeZoneAbbr="timeZoneAbbr"
              v-model:endTime="endTime"
              v-model:eventType="eventType"
            />
          </div>
          <div class="w-full flex flex-col items-center">
            <AdditionalHours
              v-if="eventType !== ''"
              v-model:eventType="eventType"
              v-model:addHours="addHours"
              v-model:additionalHours="additionalHours"
            />
            <UplightingSelector v-model:uplights="uplights" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
