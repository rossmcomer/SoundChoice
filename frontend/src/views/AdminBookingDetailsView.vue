<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Booking, PaymentMethod } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import adminService from '@/services/adminService';
import { addPayment, getBookingInfo, updateBooking } from '@/services/adminService';
import { useFormatPaymentStatus } from '@/composables/useFormatPaymentStatus';

const route = useRoute();
const router = useRouter();
const booking = ref<Booking | null>(null);

//Payment editing refs
const amount = ref<number | null>(null);
const method = ref<PaymentMethod>('cash');
const submitting = ref(false);
const error = ref<string | null>(null);
//End payment editing refs

const fetchBooking = async () => {
  const id = route.params.bookingId as string;
  booking.value = await getBookingInfo(id);
};

const goBack = () => {
  router.back();
};

onMounted(fetchBooking);

const handleAddPayment = async () => {
  if (!booking.value || amount.value === null || !method.value) return;
  submitting.value = true;
  error.value = null;

  try {
    await addPayment({
      bookingId: booking.value.id,
      amount: amount.value,
      deposit: false,
      method: method.value,
    });

    await updateBooking(booking.value.id, { paymentStatus: 'paidInFull' });

    await fetchBooking(); // Refresh booking data
    amount.value = null; // Reset form
    method.value = 'cash';
  } catch (err) {
    error.value = 'Failed to add payment.';
    console.error(err);
  } finally {
    submitting.value = false;
  }
};
</script>
<template>
  <div class="p-4 text-[var(--black-soft)]">
    <button
      @click="goBack"
      class="mb-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition cursor-pointer"
    >
      ← Back
    </button>
    <h2 class="text-xl font-bold mb-4">Booking Details</h2>

    <div v-if="booking">
      <ul class="space-y-2">
        <li><strong>Name:</strong> {{ booking.user.name }}</li>
        <li><strong>Date:</strong> {{ new Date(booking.eventDate).toLocaleDateString() }}</li>
        <li><strong>Location:</strong> {{ booking.location }}</li>
        <li>
          <strong>Start Time:</strong>
          {{
            new Date(booking.startTime).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
          }}
        </li>
        <li>
          <strong>End Time:</strong>
          {{
            new Date(booking.endTime).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
          }}
        </li>
        <li><strong>Type:</strong> {{ booking.type }}</li>
        <li><b>Total Amount:</b> ${{ booking.totalAmount / 100 }}</li>
        <li>
          <p
            v-if="
              booking.paymentStatus === 'depositReceived' ||
              booking.paymentStatus === 'remainingPaymentFailed'
            "
            class="flex"
          >
            <b>Remaining Balance:</b>
            <span class="text-red-600">&nbsp${{ booking.totalAmount / 200 }}</span>
          </p>
          <p v-else-if="booking.paymentStatus === 'paidInFull'"><b>Remaining Balance:</b> $0</p>
        </li>
        <li><b>Payment Status:</b> {{ useFormatPaymentStatus(booking.paymentStatus) }}</li>
        <li v-if="booking.payment">
          <strong>Payments ({{ booking.payment.length }})</strong>
          <ul>
            <li v-for="p in booking.payment" :key="p.id">
              ${{ p.amount }} – {{ p.method }} – {{ p.deposit ? 'Deposit' : 'Balance' }}
            </li>
          </ul>
          <div class="mt-6 border-t pt-4">
            <h3 class="font-semibold mb-2">Add Payment</h3>
            <div class="space-y-2">
              <div>
                <label>Amount:</label>
                <input
                  v-model.number="amount"
                  type="number"
                  class="border rounded px-2 py-1 w-32"
                />
              </div>
              <div>
                <label>Method:</label>
                <select v-model="method" class="border rounded px-2 py-1">
                  <option>cash</option>
                  <option>paypal</option>
                  <option>other</option>
                </select>
              </div>
              <div>
                <button
                  :disabled="submitting"
                  @click="handleAddPayment"
                  class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Payment
                </button>
              </div>
              <p v-if="error" class="text-red-500">{{ error }}</p>
            </div>
          </div>
        </li>

        <li v-if="booking.questionnaire">
          <strong>Questionnaire:</strong>
          <pre>{{ booking.questionnaire }}</pre>
        </li>
      </ul>
    </div>

    <div v-else>Loading booking...</div>
  </div>
</template>
