import { ref } from 'vue';
import { defineStore } from 'pinia';
import { login } from '@/services/loginService';
import { logout } from '@/services/logoutService';
import type { User } from '@/types';

export const useUserStore = defineStore('UserStore', () => {
    const user = ref<User | null>(null);
  
    const loginUser = async (email: string, password: string) => {
      try {
        const data = await login(email, password);
        user.value = data.user
        return data;
      } catch (err) {
        console.error('Login failed:', err);
        throw err;
      }
    };
  
    const logoutUser = async () => {
      try {
        await logout();
        user.value = null;
      } catch (err) {
        console.error('Logout failed:', err);
      }
    };
  
    return { user, loginUser, logoutUser };
  });
