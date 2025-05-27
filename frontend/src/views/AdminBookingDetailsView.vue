<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Booking, PaymentMethod } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import { addPayment, getBookingInfo, updateBooking } from '@/services/adminService';
import { useFormatPaymentStatus } from '@/composables/useFormatPaymentStatus';
import { useProductLabel } from '@/composables/useProductLabel';
import { getTimeZoneAbbr } from '@/util/time';
import { toast } from 'vue3-toastify';
import BackgroundVideoDefault from '@/components/BackgroundVideoDefault.vue';

const route = useRoute();
const router = useRouter();
const booking = ref<Booking | null>(null);
const questionnaireRef = ref<HTMLElement | null>(null);

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
    toast.success('Succesfully added payment.');

    await fetchBooking(); // Refresh booking data
    amount.value = null; // Reset form
    method.value = 'cash';
  } catch (err) {
    toast.error('Failed to add payment.');
    error.value = 'Failed to add payment.';
    console.error(err);
  } finally {
    submitting.value = false;
  }
};

const copyQuestionnaire = async () => {
  if (!questionnaireRef.value) return;

  const html = Array.from(questionnaireRef.value.querySelectorAll('div'))
    .map((el) => {
      const question = el.querySelector('strong')?.innerText || '';
      const answer = el.innerText.replace(question, '').trim();
      return `<p><strong>${question}</strong> ${answer}</p>`;
    })
    .join('');

  const blob = new Blob([html], { type: 'text/html' });
  const data = [new ClipboardItem({ 'text/html': blob })];

  try {
    await navigator.clipboard.write(data);
    toast.success('Questionnaire copied to clipboard.');
  } catch (err) {
    toast.error('Failed to copy');
    console.error(err);
  }
};
</script>
<template>
  <div class="relative h-full">
    <BackgroundVideoDefault />
    <div class="relative p-6 space-y-4 h-full z-10">
      <div class="text-[var(--black-soft)]">
        <button
          @click="goBack"
          class="mb-4 bg-gray-200 text-[var(--black-soft)] px-4 py-2 rounded hover:bg-gray-300 border-2 border-[var(--black-soft)] transition cursor-pointer"
        >
          ← Back
        </button>
        <h2 class="text-2xl font-bold mb-4">Booking Details</h2>

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
              {{ getTimeZoneAbbr() }}
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
              {{ getTimeZoneAbbr() }}
            </li>
            <li><strong>Type:</strong> {{ useProductLabel(booking.type) }}</li>
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
              <div class="overflow-x-auto max-w-full">
                <table class="w-auto table-auto border border-gray-300 mt-4">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-2 text-left">$</th>
                      <th class="px-4 py-2 text-left">Method</th>
                      <th class="px-4 py-2 text-left">Transaction ID</th>
                      <th class="px-4 py-2 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="p in booking.payment" :key="p.id" class="border-t border-gray-200">
                      <td class="px-4 py-2">${{ p.amount }}</td>
                      <td class="px-4 py-2">{{ p.method }}</td>
                      <td class="px-4 py-2">{{ p.transactionId }}</td>
                      <td class="px-4 py-2">{{ p.deposit ? 'Deposit' : 'Remaining Balance' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-6 border-t pt-4">
                <h3 class="font-semibold mb-2">Add Payment</h3>
                <div class="space-y-2">
                  <div>
                    <label>Amount: </label>
                    <input
                      v-model.number="amount"
                      type="number"
                      class="border rounded px-2 py-1 w-32"
                    />
                  </div>
                  <div>
                    <label>Method: </label>
                    <select v-model="method" class="border rounded px-2 py-1 cursor-pointer">
                      <option>cash</option>
                      <option>paypal</option>
                      <option>venmo</option>
                      <option>other</option>
                    </select>
                  </div>
                  <div>
                    <button
                      :disabled="submitting"
                      @click="handleAddPayment"
                      class="bg-green-600 cursor-pointer text-[var(--white-soft)] px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Add Payment
                    </button>
                  </div>
                  <p v-if="error" class="text-red-500">{{ error }}</p>
                </div>
              </div>
            </li>
            <li
              v-if="booking.questionnaire"
              class="text-2xl mt-6 border-t pt-4"
              ref="questionnaireRef"
            >
              <strong>Questionnaire: </strong
              ><button
                @click="copyQuestionnaire"
                class="text-md bg-gray-200 text-[var(--black-soft)] px-2 pb-1 rounded hover:bg-gray-300 border-2 border-[var(--black-soft)] transition cursor-pointer"
              >
                Copy
              </button>
              <div
                v-for="(answer, question) in booking.questionnaire.answers"
                :key="question"
                class="text-lg"
              >
                <strong>{{ question }}:</strong> {{ answer }}
              </div>
            </li>
          </ul>
        </div>
        <div v-else>Loading booking...</div>
      </div>
    </div>
  </div>
</template>
