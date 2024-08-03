/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {},
    extend: {
      gridTemplateColumns: {
        '2at': 'auto auto',
        at: 'auto'
      },
      gridTemplateRows: {
        auto: 'auto'
      },
      gap: {
        '16px': '16px'
      },
      padding: {
        '5px': '5px'
      },
      margin: {
        '5px': '5px'
      },
      fontSize: {
        title: '16px'
      },
      colors: {
        customgreen: '#34d399 !important'
      },
      fontWeight: {
        bold: '700 !important'
      }
    }
  },
  plugins: []
};
