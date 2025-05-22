import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import PricingView from '../views/PricingView.vue';
import BookingView from '../views/BookingView.vue';
import TestimonialsView from '../views/TestimonialsView.vue';
import MediaView from '../views/MediaView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import PaidInFullSuccess from '../views/PaidInFullSuccess.vue';
import PaidInFullFailed from '../views/PaidInFullFailed.vue';
import DepositSuccess from '../views/DepositSuccess.vue';
import DepositFailed from '../views/DepositFailed.vue';
import AdminView from '../views/AdminView.vue';
import AdminBookingDetailsView from '../views/AdminBookingDetailsView.vue';
import userService from '@/services/userService';
import AdminAvailabilityView from '@/views/AdminAvailabilityView.vue';
import AdminBookingsListView from '@/views/AdminBookingsListView.vue';
import AdminEmailListView from '@/views/AdminEmailListView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';

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
      path: '/login-sign-up',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/successful-paid-in-full',
      name: 'paidInFull',
      component: PaidInFullSuccess,
    },
    {
      path: '/cancelled-final-payment',
      name: 'Paid In Full',
      component: PaidInFullFailed,
    },
    {
      path: '/successful-deposit',
      name: 'Deposit Suceess',
      component: DepositSuccess,
    },
    {
      path: '/deposit-failed',
      name: 'Deposit Failed',
      component: DepositFailed,
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPasswordView,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      meta: { requiresAdmin: true },
    },
    {
      path: '/admin/email-list',
      name: 'AdminEmailList',
      component: AdminEmailListView,
      meta: { requiresAdmin: true },
    },
    {
      path: '/admin/bookings-list',
      name: 'AdminBookingsList',
      component: AdminBookingsListView,
      meta: { requiresAdmin: true },
    },
    {
      path: '/admin/availability',
      name: 'AdminAvailability',
      component: AdminAvailabilityView,
      meta: { requiresAdmin: true },
    },
    {
      path: '/admin/booking/:bookingId',
      name: 'AdminBookingDetails',
      component: AdminBookingDetailsView,
      meta: { requiresAdmin: true },
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  if (requiresAdmin) {
    try {
      const user = await userService.getUserData();
      if (user?.role !== 'admin') {
        return next('/');
      }
    } catch (err) {
      console.error('Access check failed:', err);
      return next('/');
    }
  }
  next();
});

export default router;
