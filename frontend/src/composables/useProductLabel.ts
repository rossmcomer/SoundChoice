import { useProductStore } from '@/stores/ProductStore';
import { computed } from 'vue';

export const useProductLabel = (type: string): string => {
    const productsStore = useProductStore();
    const products = computed(() => productsStore.products);

    const product = products.value.find((p) => p.value === type);
    return product?.label ?? 'Unknown';
}