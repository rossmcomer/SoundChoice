const plugin = require('tailwindcss/plugin');

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        color1: 'var(--color1)',
        color2: 'var(--color2)',
        color3: 'var(--color3)',
        color4: 'var(--color4)',
        color5: 'var(--color5)',
        color6: 'var(--color6)',
        'white-soft': 'var(--white-soft)',
        'black-soft': 'var(--black-soft)',
        'grey-soft': 'var(--grey-soft)',
        'purple-royal': 'var(--purple-royal)',
        'divider-light': 'var(--dividier-light)',
        'divider-medium': 'var(--divider-medium)',
        'divider-dark': 'var(--divider-dark)',
      },
      boxShadow: {
        small: 'var(--box-shadow-small)',
        medium: 'var(--box-shadow-medium)',
        large: 'var(--box-shadow-large)',
      },
      textShadow: {
        small: 'var(--text-shadow-small)',
        medium: 'var(--text-shadow-medium)',
        large: 'var(--text-shadow-large)',
      },
      borderColor: {
        black: '#222222',
        white: '#f8f8f8',
        'black-soft': 'var(--black-soft)',
        'white-soft': 'var(--white-soft)',
      },
      borderWidth: {
        DEFAULT: '1px',
        bold: '2px',
      },
      transitionProperty: {
        default: 'color, background-color, border-color, box-shadow, transform',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.border-black': {
          border: 'var(--border-black)',
        },
        '.border-white': {
          border: 'var(--border-white)',
        },
        '.border-bold-black': {
          border: 'var(--border-bold-black)',
        },
        '.border-bold-white': {
          border: 'var(--border-bold-white)',
        },
        '.transition-default': {
          transition: 'var(--transition-default)',
        },
        '.text-shadow-small': {
          textShadow: 'var(--text-shadow-small)',
        },
        '.text-shadow-medium': {
          textShadow: 'var(--text-shadow-medium)',
        },
        '.text-shadow-large': {
          textShadow: 'var(--text-shadow-large)',
        },
      });
    }),
  ],
};