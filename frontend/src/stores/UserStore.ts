import type { User } from '@/types';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia';

import userService from '@/services/userService';
import loginService from '@/services/loginService';
import logoutService from '@/services/logoutService';

export const useUserStore = defineStore('UserStore', () => {
    const router = useRouter()
    const user = ref<User | null>(null);
  
    const loginUser = async (email: string, password: string) => {
      try {
        await loginService.login(email, password);
        const data = await userService.getUserData();
        user.value = data
      } catch (err) {
        console.error('Login failed:', err);
        throw err;
      }
    };
  
    const logoutUser = async () => {
      try {
        await logoutService.logout();
        user.value = null;
        router.push('/')
      } catch (err) {
        console.error('Logout failed:', err);
      }
    };
  
    return { user, loginUser, logoutUser };
});
