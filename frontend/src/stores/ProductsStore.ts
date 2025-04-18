import { ref } from 'vue';
import { defineStore } from 'pinia';
import { PRODUCTS } from '@/assets/PRODUCTS';

export const useProductsStore = defineStore('ProductsStore', () => {
    const products = ref(
        Object.entries(PRODUCTS).map(([name, price]) => ({
          name,
          price,
        }))
      );
  
    return { products };
});