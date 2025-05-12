import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  { id: 0, name: 'wedding', price: 150000, value: 'wedding', label: 'Wedding' },
  {
    id: 1,
    name: 'corporatePerHr',
    price: 0,
    value: 'corporate',
    label: 'Corporate',
  },
  {
    id: 2,
    name: 'birthdayPerHr',
    price: 0,
    value: 'birthday',
    label: 'Birthday',
  },
  {
    id: 3,
    name: 'mitzvahPerHr',
    price: 0,
    value: 'barBatMitzvah',
    label: 'Mitzvah',
  },
  { id: 4, name: 'otherPerHr', price: 0, value: 'other', label: 'Other' },
  {
    id: 5,
    name: 'uplights',
    price: 20000,
    value: 'uplights',
    label: 'Uplighting',
  },
  {
    id: 6,
    name: 'addTimePerHr',
    price: 15000,
    value: 'addTime',
    label: 'Added Hours',
  },
];
