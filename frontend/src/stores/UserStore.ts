import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getUserData } from '@/services/usersService';
import { login } from '@/services/loginService';
import { logout } from '@/services/logoutService';
import type { User } from '@/types';
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('UserStore', () => {
    const router = useRouter()
    const user = ref<User | null>(null);
  
    const loginUser = async (email: string, password: string) => {
      try {
        await login(email, password);
        const data = await getUserData();
        user.value = data
      } catch (err) {
        console.error('Login failed:', err);
        throw err;
      }
    };
  
    const logoutUser = async () => {
      try {
        await logout();
        user.value = null;
        router.push('/')
      } catch (err) {
        console.error('Logout failed:', err);
      }
    };
  
    return { user, loginUser, logoutUser };
});
