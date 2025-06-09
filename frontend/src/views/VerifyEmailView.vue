<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { verifyEmail, resendVerificationEmail } from '@/services/userService';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const route = useRoute();
const router = useRouter();

const status = ref<'pending' | 'success' | 'error'>('pending');
const email = ref<string | null>(null);

onMounted(async () => {
  const token = route.query.token;
  const emailParam = route.query.email;

  if (typeof emailParam === 'string') {
    email.value = emailParam;
  }

  if (!token || typeof token !== 'string') {
    status.value = 'error';
    toast.error('Invalid verification link.');
    return;
  }

  try {
    await verifyEmail(token);
    status.value = 'success';
    toast.success('Your email has been verified!');
    setTimeout(() => {
      router.push('/login-sign-up');
    }, 2000);
  } catch (err) {
    status.value = 'error';
    toast.error('Verification failed or token expired.');
  }
});

const handleResend = async () => {
  if (!email.value) {
    toast.error('Missing email to resend verification.');
    return;
  }

  try {
    await resendVerificationEmail(email.value);
    toast.success('Verification email resent.');
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Verifying your email</h1>
    <p v-if="status === 'success'" class="text-[var(--black-soft)] text-center">
      Email verified successfully. You can now log in.
    </p>
    <div
      v-else-if="status === 'error'"
      class="text-[var(--black-soft)] text-center space-y-4 flex flex-col"
    >
      <p>Verification failed. The token may be invalid or expired.</p>
      <button
        @click="handleResend"
        class="text-blue-600 underline hover:text-blue-800 cursor-pointer"
        :disabled="!email"
      >
        Resend verification email
      </button>
    </div>

    <p v-else class="text-gray-500">Please wait</p>
  </div>
</template>
