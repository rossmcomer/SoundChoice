import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getUserData } from '@/services/usersService';
import type { User } from '@/types';

export const useUserStore = defineStore('UserStore', () => {
  const user = ref<User | null>(null);

  const fetchUser = async () => {
    try {
      const data = await getUserData();
      setUser(data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  const setUser = (userData: any) => {
    user.value = userData;
  };

  const clearUser = () => {
    user.value = null;
  };

  return { user, fetchUser, setUser, clearUser };
});
