<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, onMounted } from 'vue';
import { useAvailabilityStore } from '@/stores/AvailabilityStore';
import adminService from '@/services/adminService';

const availabilityStore = useAvailabilityStore();

const today = new Date();
const date = ref<Date | null>(null); // This is the selected date
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(() => {
  availabilityStore.fetchDates();
});

// Convert local date to UTC ISO (at midnight)
function toUTCDateString(d: Date): string {
  const localMidnight = new Date(d);
  localMidnight.setHours(0, 0, 0, 0); // Local midnight
  return localMidnight.toISOString();
}

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

    await availabilityStore.fetchDates(); // Refresh store
  } catch (err) {
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
    await availabilityStore.fetchDates();
  } catch (err) {
    error.value = 'Failed to remove unavailable date.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="flex justify-center">
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
  </div>
  <div class="flex justify-center gap-4 my-4">
    <button
      class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
      @click="addUnavailableDate"
      :disabled="!date || loading"
    >
      Add Unavailable
    </button>
    <li v-if="availabilityStore.unavailableDates.length">
      <strong>Unavailable Dates:</strong>
      <ul class="list-disc list-inside ml-4">
        <li v-if="availabilityStore.unavailableDates.length">
          <strong>Unavailable Dates:</strong>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li
              v-for="(date, index) in availabilityStore.unavailableDates"
              :key="index"
              class="flex items-center gap-2"
            >
              {{ new Date(date.date).toLocaleDateString() }}
              <button
                class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
                @click="removeUnavailableDate(date.id)"
                :disabled="loading"
              >
                Remove
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </div>

  <div v-if="error" class="text-red-500 text-center mt-2">{{ error }}</div>
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
