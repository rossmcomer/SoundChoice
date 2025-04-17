import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { PRODUCTS } from '@/assets/PRODUCTS';

type CartItemKey = keyof typeof PRODUCTS;

export const useCartStore = defineStore('CartStore', () => {
  const cart = ref<CartItemKey[]>([]);

  const addItem = (item: CartItemKey) => {
    cart.value.push(item);
  };

  const removeItem = (item: CartItemKey) => {
    const index = cart.value.findIndex((i) => i === item);
    if (index !== -1) cart.value.splice(index, 1);
  };

  const clearCart = () => {
    cart.value = [];
  };

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + PRODUCTS[item], 0);
  });

  const cartBreakdown = computed(() => {
    const summary: Record<CartItemKey, number> = {} as any;
    cart.value.forEach((item) => {
      summary[item] = (summary[item] || 0) + 1;
    });
    return summary;
  });

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
    cartTotal,
    cartBreakdown,
  };
});