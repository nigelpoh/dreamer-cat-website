/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.liquid"],
  theme: {
    screens: {
      sm: '320px',
      md: '750px',
      lg: '990px',
      xlg: '1440px',
      x2lg: '1920px',
      pageMaxWidth: '1440px',
    },
    extend: {
      fontFamily: {
        'display': ['Fig Tree', 'system-ui'],
        'body': ['Space Grotesk', 'system-ui'], 
      },
    },
  },
  plugins: [],
}