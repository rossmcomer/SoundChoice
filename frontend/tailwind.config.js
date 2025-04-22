export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js'],
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
        },
    },
    },
    plugins: [require('flowbite/plugin')],
  };