import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { useProductsStore } from './ProductsStore';

export const useCartStore = defineStore('CartStore', () => {
    const cart = ref<string[]>([]);
  
    const productsStore = useProductsStore();
  
    const addItem = (item: string) => {
      cart.value.push(item);
    };
  
    const removeItem = (item: string) => {
      const index = cart.value.findIndex((i) => i === item);
      if (index !== -1) cart.value.splice(index, 1);
    };
  
    const clearCart = () => {
      cart.value = [];
    };
  
    // Returns cart total in cents
    const cartTotal = computed(() =>
  cart.value.reduce((total, item) =>
    total + (productsStore.products.find((p) => p.name === item)?.price || 0)
  , 0)
);
    
    // Returns object like { wedding: 2, uplights: 1, addTimePerHr: 1 }
    const cartBreakdown = computed(() => {
      const summary: Record<string, number> = {};
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