import '@/assets/main.css';
import 'swiper/swiper-bundle.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router';
import { fetchCsrfToken } from '@/services/csrfService';
import axios from '@/util/apiClient';

async function initApp() {
  try {
    const csrfToken = await fetchCsrfToken();
    axios.defaults.headers.common['x-csrf-token'] = csrfToken;
    console.log('✅ CSRF token set');
  } catch (err) {
    console.error('❌ Failed to fetch CSRF token:', err);
  }

  const app = createApp(App);

  app.use(createPinia());
  app.use(router);
  app.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-center',
  } as ToastContainerOptions);

  app.mount('#app');
}

initApp();
