<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { User, Booking, Payment } from '@/types';
import { useUserStore } from '@/stores/UserStore';
import { updateName, updateEmail, updatePhone, updatePassword } from '@/services/userService';
import weddingQuestions from '@/assets/wedding-questionnaire.json';
import nonWeddingQuestions from '@/assets/non-wedding-questionnaire.json';
import questionnaireService from '@/services/questionnaireService';

const router = useRouter();

const userStore = useUserStore();
const user = computed(() => userStore.user);

interface AnswerMap {
  [bookingId: string]: {
    [question: string]: string;
  };
}

const answers = ref<AnswerMap>({});

function getQuestions(type: string): string[] {
  return type === 'wedding' ? weddingQuestions : nonWeddingQuestions;
}

async function submitQuestionnaire(bookingId: string) {
  // const data = answers.value[bookingId];
  // if (!data) return;
  // try {
  //   await questionnaireService.saveAnswers({ bookingId, answers: data });
  //   alert('Answers saved successfully!');
  // } catch (error) {
  //   console.error('Failed to save answers:', error);
  //   alert('Failed to save answers. Please try again.');
  // }
}

const handleLogout = async () => {
  try {
    await userStore.logoutUser();
    router.push('/login-sign-up'); 
  } catch (err) {
    console.error('Logout failed:', err);
    alert('Failed to log out');
  }
};

</script>
<template>
  <div class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">Profile</h1>
      </div>
      <div v-if="user" class="flex flex-col items-center my-8">
        <div class="sm:max-w-4/5 sm:w-2xl w-full px-4">
    
          <div class="text-[var(--black-soft)]">
            <p><b>Name:</b> {{ user.name }}</p>
            <p><b>Email:</b> {{ user.email }}</p>
            <p><b>Phone:</b> {{ user.phone }}</p>
          </div>
          <button @click="handleLogout" class="bg-[var(--black-soft)] text-[var(--color6)] hover:bg-[var(--color6)] hover:text-[var(--black-soft)] hover:shadow-md flex justify-center items-center w-4/5 sm:w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center sm:text-sm sm:px-4 sm:py-2 cursor-pointer transition-[var(--transition-default)]">Logout</button>
          <form class="max-w-sm mx-auto">
            <div class="mb-5">
              <label
                for="base-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Base input</label
              >
              <input
                type="text"
                id="base-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-5">
              <label
                for="base-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Base input</label
              >
              <input
                type="text"
                id="base-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-5">
              <label
                for="base-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Base input</label
              >
              <input
                type="text"
                id="base-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </form>
          <div class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10 mb-10">
          Bookings
        </div>
          <div id="accordion-nested-parent" data-accordion="collapse">
            <div v-for="(booking, index) in user.bookings" :key="index">
              
              <h2 :id="`accordion-heading-${index}`">
                <button
                  class="...accordion classes..."
                  :data-accordion-target="`#accordion-body-${index}`"
                  aria-expanded="false"
                  :aria-controls="`accordion-body-${index}`"
                >
                  <span>{{ booking.eventDate }} @ {{ booking.location }}</span>
                  <svg>...</svg>
                </button>
              </h2>
              <div
                :id="`accordion-body-${index}`"
                class="hidden"
                :aria-labelledby="`accordion-heading-${index}`"
              >
                <div class="p-5 border ...">
                  
                  <p>Start Time: {{ booking.startTime }}</p>
                  <p>End Time: {{ booking.endTime }}</p>
                  <p>Total Amount: ${{ booking.totalAmount }}</p>
                  <p>Type: {{ booking.type }}</p>
                  <p>Payment Status: {{ booking.paymentStatus }}</p>

                  
                  <div id="accordion-nested-collapse" data-accordion="collapse">
                    
                    <h2 :id="`nested-payment-heading-${index}`">
                      <button
                        class="...accordion classes..."
                        :data-accordion-target="`#nested-payment-body-${index}`"
                        aria-expanded="false"
                        :aria-controls="`nested-payment-body-${index}`"
                      >
                        <span>Payments</span>
                        <svg>...</svg>
                      </button>
                    </h2>
                    <div
                      :id="`nested-payment-body-${index}`"
                      class="hidden"
                      :aria-labelledby="`nested-payment-heading-${index}`"
                    >
                      <div class="p-5 border ...">
                        <div v-for="(payment, pIndex) in booking.payment" :key="pIndex">
                          <p>Amount: ${{ payment.amount }}</p>
                          <p>Deposit: {{ payment.deposit ? 'Yes' : 'No' }}</p>
                          <p>Method: {{ payment.method }}</p>
                        </div>
                      </div>
                    </div>

                    
                    <h2 :id="`nested-question-heading-${index}`">
                      <button
                        class="...accordion classes..."
                        :data-accordion-target="`#nested-question-body-${index}`"
                        aria-expanded="false"
                        :aria-controls="`nested-question-body-${index}`"
                      >
                        <span>Questionnaire</span>
                        <svg>...</svg>
                      </button>
                    </h2>
                    <div
                      :id="`nested-question-body-${index}`"
                      class="hidden"
                      :aria-labelledby="`nested-question-heading-${index}`"
                    >
                      <div class="p-5 border ...">
                        <form @submit.prevent="submitQuestionnaire(booking.id)">
                          <div
                            v-for="(question, qIndex) in getQuestions(booking.type)"
                            :key="qIndex"
                          >
                            <label :for="`q-${index}-${qIndex}`">{{ question }}</label>
                            <input
                              :id="`q-${index}-${qIndex}`"
                              v-model="answers[booking.id][question]"
                              type="text"
                              class="w-full mb-2 border rounded"
                            />
                          </div>
                          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col place-items-center justify-center my-8">
        <div class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10 mb-10">
          Please sign in to view your profile.
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
</template>
<style></style>
