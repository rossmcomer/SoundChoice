<script setup lang="ts">
import type { User, Booking, Payment } from '@/types';
import { computed, onMounted, ref } from 'vue';
import questionnaireService from '@/services/questionnaireService';
import weddingQuestions from '@/assets/wedding-questionnaire.json';
import nonWeddingQuestions from '@/assets/non-wedding-questionnaire.json';

const { user } = defineProps<{ user: User | null }>();

const answers = ref<Record<string, Record<string, string>>>({});

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
  if (!user || !user.bookings) return;

  user.bookings.forEach((booking) => {
    const bookingId = booking.id;
    const questions = getQuestions(booking.type);

    if (!answers.value[bookingId]) {
      answers.value[bookingId] = {};
    }

    questions.forEach((question) => {
      if (!(question in answers.value[bookingId])) {
        answers.value[bookingId][question] = '';
      }
    });
  });
});

async function submitQuestionnaire(bookingId: string) {
  const data = answers.value[bookingId];
  if (!data) return;
  try {
    await questionnaireService.saveAnswers({ bookingId, answers: data });
    alert('Answers saved successfully!');
  } catch (error) {
    console.error('Failed to save answers:', error);
    alert('Failed to save answers. Please try again.');
  }
}

console.log(user);
</script>
<template>
    <div class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10 mb-10">
            Bookings
          </div>
  <div v-if="user && user.bookings && user.bookings.length > 0" id="accordion-nested-parent" data-accordion="collapse">
    <div v-for="(booking, index) in user.bookings" :key="booking.id">
      <h2 :id="`accordion-heading-${index}`">
        <button
          type="button"
          class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white"
          :data-accordion-target="`#accordion-body-${index}`"
          aria-expanded="false"
          :aria-controls="`accordion-body-${index}`"
        >
          <span
            >{{ new Date(booking.eventDate).toLocaleDateString() }} @ {{ booking.location }}</span
          >
          <svg class="w-3 h-3 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 10 6">
            <path
              d="M10 5a1 1 0 01-.3.7 1 1 0 01-1.4 0L5 2.4 1.7 5.7A1 1 0 11.3 4.3l4-4a1 1 0 011.4 0l4 4A1 1 0 0110 5z"
            />
          </svg>
        </button>
      </h2>
      <div
        :id="`accordion-body-${index}`"
        class="hidden"
        :aria-labelledby="`accordion-heading-${index}`"
      >
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p>
            <b>Start Time:</b>
            {{
              new Date(booking.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
          </p>
          <p>
            <b>End Time:</b>
            {{
              new Date(booking.endTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
          </p>
          <p><b>Total Amount:</b> ${{ booking.totalAmount }}</p>
          <p><b>Type:</b> {{ booking.type }}</p>
          <p><b>Payment Status:</b> {{ booking.paymentStatus }}</p>

          <div v-if="booking.payment && booking.payment.length > 0">
            <h3 class="mt-4 font-semibold">Payments</h3>
            <div
              v-for="(payment, pIndex) in booking.payment"
              :key="pIndex"
              class="pl-4 py-2 border-l-2 border-gray-300"
            >
              <p>Amount: ${{ payment.amount }}</p>
              <p>Deposit: {{ payment.deposit ? 'Yes' : 'No' }}</p>
              <p>Method: {{ payment.method }}</p>
            </div>
          </div>

          <!-- <div class="mt-4">
            <h3 class="font-semibold mb-2">Questionnaire</h3>
            <form @submit.prevent="submitQuestionnaire(booking.id)">
              <div v-for="(question, qIndex) in getQuestions(booking.type)" :key="qIndex">
                <label :for="`q-${booking.id}-${qIndex}`">{{ question }}</label>
                <input
                  :id="`q-${booking.id}-${qIndex}`"
                  v-model="answers[booking.id][question]"
                  @focus="initializeAnswer(booking.id, question)"
                  type="text"
                  class="w-full mb-2 border rounded p-1"
                />
              </div>
              <button type="submit" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </form>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="accordion-nested-parent" data-accordion="collapse">
            <div v-for="(booking, index) in user.bookings" :key="booking.id">
              <h2 :id="`accordion-heading-${index}`">
                <button
                  type="button"
                  class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white"
                  :data-accordion-target="`#accordion-body-${index}`"
                  aria-expanded="false"
                  :aria-controls="`accordion-body-${index}`"
                >
                  <span
                    >{{ new Date(booking.eventDate).toLocaleDateString() }} @
                    {{ booking.location }}</span
                  >
                  <svg class="w-3 h-3 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 10 6">
                    <path
                      d="M10 5a1 1 0 01-.3.7 1 1 0 01-1.4 0L5 2.4 1.7 5.7A1 1 0 11.3 4.3l4-4a1 1 0 011.4 0l4 4A1 1 0 0110 5z"
                    />
                  </svg>
                </button>
              </h2>

              <div
                :id="`accordion-body-${index}`"
                class="hidden"
                :aria-labelledby="`accordion-heading-${index}`"
              >
                <div
                  class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                >
                  <p>
                    <b>Start Time:</b>
                    {{
                      new Date(booking.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    }}
                  </p>
                  <p>
                    <b>End Time:</b>
                    {{
                      new Date(booking.endTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    }}
                  </p>
                  <p><b>Total Amount:</b> ${{ booking.totalAmount }}</p>
                  <p><b>Type:</b> {{ booking.type }}</p>
                  <p><b>Payment Status:</b> {{ booking.paymentStatus }}</p>

                  <div v-if="booking.payment?.length">
                    <h3 class="mt-4 font-semibold">Payments</h3>
                    <div
                      v-for="(payment, pIndex) in booking.payment"
                      :key="pIndex"
                      class="pl-4 py-2 border-l-2 border-gray-300"
                    >
                      <p>Amount: ${{ payment.amount }}</p>
                      <p>Deposit: {{ payment.deposit ? 'Yes' : 'No' }}</p>
                      <p>Method: {{ payment.method }}</p>
                    </div>
                  </div>

                  <div class="mt-4">
                    <h3 class="font-semibold mb-2">Questionnaire</h3>
                    <form @submit.prevent="submitQuestionnaire(booking.id)">
                      <div v-for="(question, qIndex) in getQuestions(booking.type)" :key="qIndex">
                        <label :for="`q-${booking.id}-${qIndex}`">{{ question }}</label>
                        <input
                          :id="`q-${booking.id}-${qIndex}`"
                          v-model="answers[booking.id][question]"
                          @focus="initializeAnswer(booking.id, question)"
                          type="text"
                          class="w-full mb-2 border rounded p-1"
                        />
                      </div>
                      <button type="submit" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
</template>
