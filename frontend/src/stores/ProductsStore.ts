import { ref } from 'vue';
import { defineStore } from 'pinia';
import { PRODUCTS } from '@/assets/PRODUCTS';
import type { Product } from '@/types';

export const useProductsStore = defineStore('ProductsStore', () => {
    const products = ref<Product[]>(PRODUCTS);
  
    return { products };
});