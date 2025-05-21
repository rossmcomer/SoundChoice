<script setup lang="ts">
import { ref } from 'vue'
import { handleForgotPassword } from '@/services/userService'

const email = ref('')

const onSubmit = () => {
  handleForgotPassword(email.value)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input type="email" v-model="email" placeholder="Enter your email" required />
    <button type="submit">Reset Password</button>
  </form>
</template>