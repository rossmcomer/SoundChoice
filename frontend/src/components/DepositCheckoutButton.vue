<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import checkoutService from '@/services/checkoutService';
import type { EventType, CheckoutRequestBody } from '@/types';
import useUTCISOString from '@/composables/useUTCISOString';
import { toast } from 'vue3-toastify';
import type { Product } from '@/types';
import { convertTo24Hour } from '@/util/time';

const eventType = defineModel<EventType | ''>('eventType');
const additionalHours = defineModel<number>('additionalHours');
const addHours = defineModel<boolean>('addHours');
const uplights = defineModel<boolean>('uplights');
const location = defineModel<string>('location');
const startTime = defineModel<string>('startTime');
const endTime = defineModel<string>('endTime');
const date = defineModel<Date | null>('date');
const { products } = defineProps<{ products: Product[] }>();

const checkoutDeposit = async () => {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

  if (!stripe) {
    console.error('Stripe failed to initialize');
    return;
  }

  if (
    !date.value ||
    !startTime.value ||
    !endTime.value ||
    eventType.value === '' ||
    location.value === '' ||
    endTime.value === '-'
  ) {
    toast.error('Missing Information');
    return;
  }

  const PRODUCTS = [];

  const utcStart = useUTCISOString(date.value, startTime.value);
  const utcEnd = useUTCISOString(date.value, convertTo24Hour(endTime.value));

  // Add main event type product
  const mainProduct = products.find((p) => p.value === eventType.value);
  if (mainProduct) {
    PRODUCTS.push({
      id: mainProduct.id,
      label: mainProduct.label,
      price: mainProduct.price,
      quantity: 1,
    });
  }

  // Add additional hours product if applicable
  if (addHours.value && additionalHours.value && additionalHours.value > 0) {
    const addTimeProduct = products.find((p) => p.value === 'addTime');
    if (addTimeProduct) {
      PRODUCTS.push({
        id: addTimeProduct.id,
        label: addTimeProduct.label,
        price: addTimeProduct.price,
        quantity: additionalHours.value,
      });
    }
  }

  // Add uplights product if selected
  if (uplights.value) {
    const uplightProduct = products.find((p) => p.value === 'uplights');
    if (uplightProduct) {
      PRODUCTS.push({
        id: uplightProduct.id,
        label: uplightProduct.label,
        price: uplightProduct.price,
        quantity: 1,
      });
    }
  }

  try {
    const body = {
      products: PRODUCTS,
      eventDate: date.value,
      startTime: utcStart,
      endTime: utcEnd,
      type: eventType.value,
      location: location.value,
      addedHours: additionalHours.value,
      addUplights: uplights.value,
    };

    const session = await checkoutService.checkoutDeposit(body as CheckoutRequestBody);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  } catch (error) {
    console.error('Checkout error:', error);
  }
};
</script>
<template>
  <button
    @click="checkoutDeposit"
    class="mt-2 bg-[var(--black-soft)] text-[var(--color6)] hover:bg-[var(--color6)] hover:text-[var(--black-soft)] hover:shadow-md flex justify-center items-center w-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center px-4 py-2 cursor-pointer transition-[var(--transition-default)] h-min"
  >
    Proceed to Checkout
  </button>
</template>
