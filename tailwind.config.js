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
      colors: {
        'bg': '#FFFFF2',
        'pri-head': '#1BA5CB',
        'sec-head': '#FF5800',
        'hl-yellow': '#FFB000',
        'hl-green': '#8BBA41',
        'hl-red': '#E85629',
        'hl-blue': '#309FB5',
        'text': '#000000'
      },
      animation: {
        'ping-slower':"ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      }
    },
  },
  mode: "jit",
  plugins: [],
}