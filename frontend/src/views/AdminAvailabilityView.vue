<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, onMounted } from 'vue';
import { useAvailabilityStore } from '@/stores/AvailabilityStore';
import adminService from '@/services/adminService';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';
import { toUTCDateString } from '@/util/time';

const availabilityStore = useAvailabilityStore();
const router = useRouter();

const today = new Date();
const date = ref<Date | null>(null); // This is the selected date
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(() => {
  availabilityStore.fetchDates();
});

// Add unavailable date
const addUnavailableDate = async () => {
  if (!date.value) return;
  loading.value = true;
  error.value = null;

  try {
    const isoDate = toUTCDateString(date.value);
    const startTime = new Date(isoDate); // midnight
    const endTime = new Date(startTime);
    endTime.setHours(23, 59, 59, 999); // end of day

    await adminService.addUnavailability({
      date: isoDate,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });

    toast.success('Successfully added unavailable date.');
    await availabilityStore.fetchDates();
    date.value = null;
  } catch (err) {
    toast.error('Failed to add unavailable date.');
    error.value = 'Failed to add unavailable date.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Remove unavailable date
const removeUnavailableDate = async (id: string) => {
  loading.value = true;
  error.value = null;

  try {
    await adminService.removeAvailability(id);
    toast.success('Successfully removed unavailable date.');
    await availabilityStore.fetchDates();
  } catch (err) {
    toast.error('Failed to remove unavailable date.');
    error.value = 'Failed to remove unavailable date.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const removePastUnavailableDates = async () => {
  loading.value = true;
  error.value = null;
  try {
    const now = new Date().setHours(0, 0, 0, 0);
    const pastDates = availabilityStore.unavailableDates.filter(
      (d) => new Date(d.date).getTime() < now,
    );

    await Promise.all(pastDates.map((date) => adminService.removeAvailability(date.id)));

    toast.success('Removed all past unavailable dates.');
    await availabilityStore.fetchDates();
  } catch (err) {
    toast.error('Failed to remove past dates.');
    error.value = 'Failed to remove past dates.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.back();
};
</script>
<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div class="relative z-10 p-6 space-y-4">
      <button
        @click="goBack"
        class="mb-4 bg-gray-200 text-[var(--black-soft)] px-4 py-2 rounded hover:bg-gray-300 border border-[var(--black-soft)] transition cursor-pointer min-w-[82px]"
      >
        ← Back
      </button>
      <div class="flex flex-col items-center justify-center flex-wrap text-[var(--black-soft)]">
        <h2 class="text-3xl font-bold mb-4 text-center">Add Unavailability</h2>
        <div class="flex flex-col items-center gap-4">
          <VueDatePicker
            class="shadow-lg"
            v-model="date"
            :min-date="today"
            :disabled-dates="availabilityStore.unavailableDates.map((d) => new Date(d.date))"
            inline
            auto-apply
            dark
            :enable-time-picker="false"
            no-today
          />
          <button
            class="btnMain text-[var(--white-soft)] px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer font-medium"
            @click="addUnavailableDate"
            :disabled="!date || loading"
          >
            Add Unavailable
          </button>
        </div>
        <div class="flex flex-col items-center justify-center gap-4 my-4 mx-auto">
          <h2 class="text-3xl font-bold text-center">Remove Unavailability</h2>
          <button
            @click="removePastUnavailableDates"
            class="mt-2 cursor-pointer btnMain text-[var(--white-soft)] px-4 py-2 rounded-lg disabled:opacity-50 shadow-md font-medium"
            :disabled="loading"
          >
            Remove All Past Dates
          </button>
          <div v-if="availabilityStore.unavailableDates.length" class="text-center">
            <strong>Unavailable Dates:</strong>
            <ul class="list-disc list-inside ml-4 space-y-2 mt-2">
              <li
                v-for="(date, index) in availabilityStore.unavailableDates"
                :key="index"
                class="flex items-center justify-between gap-2"
              >
                <div>{{ new Date(date.date).toLocaleDateString() }}</div>
                <button
                  class="btnMain text-[var(--white-soft)] px-3 py-1 rounded disabled:opacity-50 cursor-pointer shadow-md font-medium"
                  @click="removeUnavailableDate(date.id)"
                  :disabled="loading"
                >
                  Remove
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="error" class="text-red-500 text-center mt-2">{{ error }}</div>
    </div>
  </div>
</template>
<style>
.dp__main {
  width: auto;
}

.dp__theme_dark {
  --dp-primary-color: #daa520;
  --dp-primary-text-color: var(--black-soft);
  --dp-background-color: var(--black-soft);
  --dp-text-color: var(--white-soft);
  --dp-border-radius: 8px;
}
</style>
