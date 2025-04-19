<script setup lang="ts">
import { useGlobalStore } from '@/stores/GlobalStore';
const global = useGlobalStore();

global.startLoading();

global.stopLoading();
</script>

<template>
  <main></main>
</template>
