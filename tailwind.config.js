/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{liquid, js}"
  ],
  safelist: [
    "transition-all", 
    "ease-in-out", 
    "duration-500",
    "w-14", 
    "rounded-md", 
    "ml-3", 
    "bg-neutral-400",
    "bg-slate-300",
    "bg-orange-400",
    {
        pattern: /bg-hl-.+/,
    }
  ],
  theme: {
    screens: {
      sm: '320px',
      reg: '440px',
      md: '750px',
      lg: '990px',
      xl: '1440px',
      xxl: '1920px',
    },
    extend: {
      fontFamily: {
        'display': ['Kufam', 'system-ui'],
        'body': ['Space Grotesk', 'system-ui'], 
      },
      colors: {
        'bg': '#f8fafc',
        'bg-2': '#f7f4ed',
        'pri-head': '#1BA5CB',
        'sec-head': '#FF5800',
        'hl-yellow': '#FFB000',
        'hl-green': '#8BBA41',
        'hl-red': '#E85629',
        'hl-blue': '#309FB5',
        'hl-lighter-yellow': '#FFF7CB',
        'hl-lighter-green': '#E7FFC1',
        'hl-lighter-red': '#FFDABF',
        'hl-lighter-blue': '#DDEEFF',
        'text': '#000000',
        'bg-product': '#fb6304',
        'bg-product-2': '#cc1c3c',
        'bg-product-3': '#6fbd5c'
      },
      animation: {
        'ping-slower':"ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'infinite-scroll': 'infinite-scroll 9s linear infinite',
        'sliding-progress': 'sliding-progress 4s linear infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(450%)' },
          to: { transform: 'translateX(-450%)' }
        },
        'sliding-progress': {
          from: {
            'background-position-x':'0'
          },
          to: {
            'background-position-x':'10rem'
          }
        }
    },
      gridTemplateRows: {
        'cover-all': '1fr min-content',
      }
    },
  },
  mode: "jit",
  plugins: [require('@tailwindcss/typography')],
}