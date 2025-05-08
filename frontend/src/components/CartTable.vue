<script setup lang="ts">
import { computed } from 'vue';
import type { EventType } from '@/types';
import { PRODUCTS } from '@/assets/PRODUCTS';

const eventType = defineModel<EventType | ''>('eventType');
const addHours = defineModel<boolean>('addHours');
const additionalHours = defineModel<number>('additionalHours');
const uplights = defineModel<boolean>('uplights');

const getBaseCost = () => {
  if (eventType.value === 'wedding') {
    return PRODUCTS.find((p) => p.name === 'wedding')?.price || 0;
  }
  return 0;
};

const getAddHourCost = () => {
  const hours = additionalHours.value ?? 0;
  if (addHours.value && hours > 0) {
    const hourlyRate = PRODUCTS.find((p) => p.name === 'addTimePerHr')?.price || 0;
    return hours * hourlyRate;
  }
  return 0;
};

const getUplightCost = () => {
  return uplights.value ? PRODUCTS.find((p) => p.name === 'uplights')?.price || 0 : 0;
};

const totalCost = computed(() => getBaseCost() + getAddHourCost() + getUplightCost());

const formatPrice = (cents: number) => `$${cents / 100}`;

const selectedEventLabel = computed(() => {
  return PRODUCTS.find((p) => p.value === eventType.value)?.label || '—';
});
</script>
<template>
  <div
    class="mt-8 min-w-[310px] border-2 border-[rgb(34,34,34)] rounded-xl shadow-lg text-gray-800 p-4 bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent max-w-xl"
  >
    <h2 class="text-2xl font-bold text-center mb-4 text-[var(--black-soft)]">Cost Summary</h2>

    <table class="w-full text-left text-sm">
      <tbody>
        <tr>
          <td class="font-semibold py-2 px-2">Event Type:</td>
          <td class="px-2">{{ selectedEventLabel || '—' }}</td>
          <td class="px-2">
            {{ eventType === 'wedding' ? formatPrice(getBaseCost()) : '$0' }}
          </td>
        </tr>
        <tr>
          <td class="font-semibold py-2 px-2">Added Hours:</td>
          <td class="px-2">{{ addHours ? additionalHours + ' hour(s)' : '—' }}</td>
          <td class="px-2">{{ addHours ? formatPrice(getAddHourCost()) : '$0' }}</td>
        </tr>
        <tr>
          <td class="font-semibold py-2 px-2">Uplighting:</td>
          <td class="px-2">{{ uplights ? 'Yes' : 'No' }}</td>
          <td class="px-2">{{ uplights ? formatPrice(getUplightCost()) : '$0' }}</td>
        </tr>
        <tr class="border-t border-gray-500 font-bold text-[var(--black-soft)]">
          <td class="py-2 px-2">Total:</td>
          <td class="px-2"></td>
          <td class="px-2">{{ formatPrice(totalCost) }}</td>
        </tr>
        <tr class="border-t border-gray-500 font-bold text-[var(--black-soft)]">
          <td class="py-2 px-2">Deposit Due:</td>
          <td class="px-2"></td>
          <td class="px-2">{{ formatPrice(totalCost / 2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
