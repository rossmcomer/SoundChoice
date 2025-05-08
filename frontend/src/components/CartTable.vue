<script setup lang="ts">
import { computed } from 'vue';
import { useProductsStore } from '@/stores/ProductsStore';
import type { EventType } from '@/types';

const eventType = defineModel<EventType | ''>('eventType');
const addHours = defineModel<boolean>('addHours');
const additionalHours = defineModel<number>('additionalHours');
const uplights = defineModel<boolean>('uplights');

const productsStore = useProductsStore();
const products = productsStore.products;

const getBaseCost = () => {
  if (eventType.value === 'wedding') {
    return products.find(p => p.name === 'wedding')?.price || 0;
  }
  return 0;
};

const getAddHourCost = () => {
  if (addHours.value && additionalHours.value > 0) {
    const hourlyRate = products.find(p => p.name === 'addTimePerHr')?.price || 0;
    return additionalHours.value * hourlyRate;
  }
  return 0;
};

const getUplightCost = () => {
  return uplights.value ? (products.find(p => p.name === 'uplights')?.price || 0) : 0;
};

const totalCost = computed(() =>
  getBaseCost() + getAddHourCost() + getUplightCost()
);

const formatPrice = (cents: number) =>
  `$${(cents / 100).toFixed(2)}`;
</script>
<template>
    <div class="mt-8 border border-gray-300 rounded-lg p-4 bg-white shadow-md max-w-md mx-auto">
      <h2 class="text-2xl font-bold text-center mb-4 text-[var(--black-soft)]">Cost Summary</h2>
  
      <table class="w-full text-left text-sm">
        <tbody>
          <tr>
            <td class="font-semibold py-2">Event Type:</td>
            <td>{{ eventType || '—' }}</td>
            <td>
              {{ eventType === 'wedding' ? formatPrice(getBaseCost()) : '$0' }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold py-2">Added Hours:</td>
            <td>{{ addHours ? additionalHours + ' hour(s)' : '—' }}</td>
            <td>{{ addHours ? formatPrice(getAddHourCost()) : '$0' }}</td>
          </tr>
          <tr>
            <td class="font-semibold py-2">Uplighting:</td>
            <td>{{ uplights ? 'Yes' : 'No' }}</td>
            <td>{{ uplights ? formatPrice(getUplightCost()) : '$0' }}</td>
          </tr>
          <tr class="border-t border-gray-300 font-bold text-[var(--color6)]">
            <td class="py-2">Total:</td>
            <td></td>
            <td>{{ formatPrice(totalCost) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
