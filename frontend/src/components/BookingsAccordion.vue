<script setup lang="ts">
import type { CheckoutRequestBody } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import { initAccordions } from 'flowbite';
import { onMounted, ref, computed } from 'vue';
import questionnaireService from '@/services/questionnaireService';
import weddingQuestions from '@/assets/wedding-questionnaire.json';
import nonWeddingQuestions from '@/assets/non-wedding-questionnaire.json';
import { useProductStore } from '@/stores/ProductStore';
import { useUserStore } from '@/stores/UserStore';
import checkoutService from '@/services/checkoutService';
import { getTimeZoneAbbr } from '@/util/time';
import { toast } from 'vue3-toastify';
import { useFormatPaymentStatus } from '@/composables/useFormatPaymentStatus';

const userStore = useUserStore();
const user = computed(() => userStore.user);

const productsStore = useProductStore();
const products = computed(() => productsStore.products);

const timeZoneAbbr = getTimeZoneAbbr();

const answers = ref<Record<string, Record<string, string>>>({});

//Initialize answers for questionnaire
function initializeAnswer(bookingId: string, question: string) {
  if (!answers.value[bookingId]) {
    answers.value[bookingId] = {};
  }
  if (!(question in answers.value[bookingId])) {
    answers.value[bookingId][question] = '';
  }
}

function getQuestions(type: string): string[] {
  return type === 'wedding' ? weddingQuestions : nonWeddingQuestions;
}

onMounted(() => {
  initAccordions();

  if (!user || !user.value?.bookings) return;

  user.value?.bookings.forEach((booking) => {
    const bookingId = booking.id;
    const questions = getQuestions(booking.type);

    // Find matching questionnaire for this booking
    const questionnaire = user.value?.questionnaires?.find((q) => q.bookingId === bookingId);
    const savedAnswers = questionnaire?.answers || {};

    // Initialize answers object if not present
    if (!answers.value[bookingId]) {
      answers.value[bookingId] = {};
    }

    questions.forEach((question) => {
      // Use saved answer if available, otherwise blank
      answers.value[bookingId][question] = savedAnswers[question] || '';
    });
  });
});

// Get display label from products array
function getProductLabel(type: string): string {
  const product = products.value.find((p) => p.value === type);
  return product ? product.label : 'Unknown Type';
}

// Check if questionnaire has blank answers
function hasBlankAnswers(bookingId: string): boolean {
  const bookingAnswers = answers.value[bookingId];
  if (!bookingAnswers) return false;

  return Object.values(bookingAnswers).some((answer) => answer === '');
}

//Resize textareas based on input
function autoResize(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto'; // Reset height
  textarea.style.height = `${textarea.scrollHeight}px`; // Set to fit content
}

// Redirect to Stripe for paying remaining balance
const checkoutRemaining = async (
  bookingId: string,
  eventDate: string,
  startTime: string,
  endTime: string,
  location: string,
  type: string,
  addUplights: boolean,
  addedHours: number,
) => {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

  if (!stripe) {
    console.error('Stripe failed to initialize');
    return;
  }

  const PRODUCTS = [];

  // Add main event type product
  const mainProduct = products.value.find((p) => p.value === type);
  if (mainProduct) {
    PRODUCTS.push({
      id: mainProduct.id,
      label: mainProduct.label,
      price: mainProduct.price,
      quantity: 1,
    });
  }

  // Add additional hours product if applicable
  if (addedHours > 0) {
    const addTimeProduct = products.value.find((p) => p.value === 'addTime');
    if (addTimeProduct) {
      PRODUCTS.push({
        id: addTimeProduct.id,
        label: addTimeProduct.label,
        price: addTimeProduct.price,
        quantity: addedHours,
      });
    }
  }

  // Add uplights product if selected
  if (addUplights) {
    const uplightProduct = products.value.find((p) => p.value === 'uplights');
    if (uplightProduct) {
      PRODUCTS.push({
        id: uplightProduct.id,
        label: uplightProduct.label,
        price: uplightProduct.price,
        quantity: 1,
      });
    }
  }

  try {
    const body = {
      products: PRODUCTS,
      bookingId,
      eventDate: new Date(eventDate),
      startTime,
      endTime,
      type,
      location,
      addedHours,
      addUplights,
    };

    const session = await checkoutService.checkoutRemainingBalance(body as CheckoutRequestBody);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  } catch (error) {
    console.error('Checkout error:', error);
  }
};

async function submitQuestionnaire(bookingId: string) {
  const data = answers.value[bookingId];
  const questionnaireId = user?.value?.questionnaires?.find((q) => q.bookingId === bookingId)?.id;
  if (!data || !questionnaireId) return;
  try {
    await questionnaireService.saveAnswers({ questionnaireId, answers: data });
    await userStore.fetchUser();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const hasEmptyAnswers = Object.values(data).some(
      (value) => value === '' || value === null || value === undefined,
    );
    if (hasEmptyAnswers) {
      toast.error(
        'Answers saved successfully. You still have some questions that remain unanswered.',
      );
    } else {
      toast.success('Answers saved successfully. Thank you for completing your questionnaire!');
    }
  } catch (error) {
    console.error('Failed to save answers:', error);
    toast.error('Failed to save answers. Please try again.');
  }
}
</script>
<template>
  <div v-if="user && user.bookings && user.bookings.length > 0">
    <div class="text-2xl text-center font-bold text-[var(--black-soft)] pt-10 mb-10">Bookings</div>
    <div id="accordion-nested-parent" data-accordion="collapse">
      <div v-for="(booking, index) in user.bookings" :key="booking.id">
        <h2 :id="`accordion-heading-${index}`">
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium !text-[var(--black-soft)] border border-[rgb(34,34,34)] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent cursor-pointer"
            :class="{
              'rounded-t-xl': index === 0,
              'border-b-0': index !== user.bookings.length - 1,
            }"
            :data-accordion-target="`#accordion-body-${index}`"
            aria-expanded="false"
            :aria-controls="`accordion-body-${index}`"
          >
            <span class="text-left"
              >{{ new Date(booking.eventDate).toLocaleDateString() }} --
              {{ products.find((p) => p.value === booking.type)?.label ?? '' }}</span
            >
            <div class="flex items-center">
              <div
                v-if="!hasBlankAnswers(booking.id) && booking.paymentStatus === 'paidInFull'"
                class="flex items-center space-x-2 p-2 mr-2 text-green-700 transition-[var(--transition-default)]"
              >
                COMPLETE
              </div>
              <div
                v-else
                class="flex items-center space-x-2 p-2 mr-2 text-red-600 transition-[var(--transition-default)]"
              >
                INCOMPLETE
              </div>
              <svg class="w-3 h-3 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 10 6">
                <path
                  d="M10 5a1 1 0 01-.3.7 1 1 0 01-1.4 0L5 2.4 1.7 5.7A1 1 0 11.3 4.3l4-4a1 1 0 011.4 0l4 4A1 1 0 0110 5z"
                />
              </svg>
            </div>
          </button>
        </h2>
        <div
          :id="`accordion-body-${index}`"
          class="hidden border border-[rgb(34,34,34)] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent"
          :class="{
              'border-b-0': index !== user.bookings.length - 1,
              'border-t-0': index === user.bookings.length - 1,
              'rounded-b-xl': index === user.bookings.length - 1,
            }"
          :aria-labelledby="`accordion-heading-${index}`"
        >
          <div class="p-5 !text-[var(--black-soft)]">
            <p><b>Date:</b> {{ new Date(booking.eventDate).toLocaleDateString() }}</p>
            <p><b>Event Type:</b> {{ getProductLabel(booking.type) }}</p>
            <p>
              <b>Start Time:</b>
              {{
                new Date(booking.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
              {{ timeZoneAbbr }}
            </p>
            <p>
              <b>End Time:</b>
              {{
                new Date(booking.endTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
              {{ timeZoneAbbr }}
            </p>
            <p><b>Total Amount:</b> ${{ booking.totalAmount / 100 }}</p>
            <p><b>Payment Status:</b> {{ useFormatPaymentStatus(booking.paymentStatus) }}</p>
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
            <div
              v-if="booking.payment && booking.payment.length > 0"
              class="mt-4 py-4 border-b border-t"
            >
              <h3 class="font-bold text-[var(--black-soft)]">
                Payments ({{ booking.payment.length }})
              </h3>
              <div
                v-for="(payment, pIndex) in booking.payment"
                :key="pIndex"
                class="pl-4 py-2 border-l-2 border-gray-500"
              >
                <p v-if="payment.deposit">Type: Deposit</p>
                <p v-else>Type: Remaining Balance</p>
                <p>Amount: ${{ payment.amount }}</p>
                <p>Transaction ID: {{ payment.transactionId }}</p>
              </div>
              <div v-if="booking.paymentStatus === 'depositReceived'">
                <b><i>Please pay remaining balance at least one month before your event.</i></b>
              </div>
              <button
                v-if="booking.paymentStatus === 'depositReceived'"
                @click="
                  checkoutRemaining(
                    booking.id,
                    booking.eventDate,
                    booking.startTime,
                    booking.endTime,
                    booking.location,
                    booking.type,
                    booking.addUplights,
                    booking.addedHours,
                  )
                "
                class="my-2 btnMain font-medium stroke-1 px-4 py-2 rounded-lg shadow-md cursor-pointer w-full sm:w-auto"
              >
                Pay Remaining Balance
              </button>
            </div>
            <div v-if="answers[booking.id]" class="mt-4 items-center flex flex-col">
              <h3 class="font-bold text-center text-2xl mb-2">
                Questionnaire<span v-if="hasBlankAnswers(booking.id)">❌ </span>
                <span v-else>✅</span>
              </h3>
              <div class="mb-2 italic text-lg text-center">
                <b>Important!</b> Please complete questionnaire one month before your event. If a
                question doesn't apply to your event, please type 'N/A'. If any answers remain
                blank, questionnaire will show as incomplete.
              </div>
              <button
                @click="submitQuestionnaire(booking.id)"
                class="my-2 btnMain focus:ring-4 shadow-md focus:outline-none font-medium rounded-lg text-center px-4 py-2 w-full sm:w-auto"
              >
                Save Answers
              </button>
              <form @submit.prevent="submitQuestionnaire(booking.id)" class="w-full">
                <div v-for="(question, qIndex) in getQuestions(booking.type)" :key="qIndex">
                  <label :for="`q-${booking.id}-${qIndex}`">{{ question }}</label>
                  <textarea
                    :id="`q-${booking.id}-${qIndex}`"
                    v-model="answers[booking.id][question]"
                    @focus="initializeAnswer(booking.id, question)"
                    @input="autoResize($event)"
                    rows="1"
                    class="w-full mb-2 border rounded p-1 resize-none overflow-hidden focus:ring-0 focus:outline-[2px] focus:outline-[var(--color6)]"
                  ></textarea>
                </div>
                <div class="flex justify-center">
                  <button
                    type="submit"
                    class="mt-2 btnMain focus:ring-4 shadow-md focus:outline-none font-medium rounded-lg text-center px-4 py-2 w-full sm:w-auto"
                  >
                    Save Answers
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
