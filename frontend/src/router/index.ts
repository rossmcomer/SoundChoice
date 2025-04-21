import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import PricingView from '../views/PricingView.vue';
import BookingView from '../views/BookingView.vue';
import TestimonialsView from '../views/TestimonialsView.vue';
import MediaView from '../views/MediaView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: PricingView,
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingView,
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: TestimonialsView,
    },
    {
      path: '/media',
      name: 'media',
      component: MediaView,
    },
    {
      path: '/login-sign-up',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
  ],
});

export default router;
