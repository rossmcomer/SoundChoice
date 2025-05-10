import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '@/types';
import productService from '@/services/productService';

export const useProductStore = defineStore('ProductsStore', () => {
  const products = ref<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await productService.getProducts();
      products.value = fetchedProducts;
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  return {
    products,
    fetchProducts,
  };
});
