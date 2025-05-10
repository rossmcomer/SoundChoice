import type { Product } from '@/types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'wedding', price: 150000, value: 'wedding', label: 'Wedding' },
  { id: 2, name: 'corporatePerHr', price: 15000, value: 'corporate', label: 'Corporate' },
  { id: 3, name: 'birthdayPerHr', price: 15000, value: 'birthday', label: 'Birthday' },
  { id: 4, name: 'mitzvahPerHr', price: 15000, value: 'barBatMitzvah', label: 'Mitzvah' },
  { id: 5, name: 'otherPerHr', price: 15000, value: 'other', label: 'Other' },
  { id: 6, name: 'uplights', price: 20000, value: 'uplights', label: 'Uplighting' },
  { id: 7, name: 'addTimePerHr', price: 15000, value: 'addTime', label: 'Additional Hour' },
];
