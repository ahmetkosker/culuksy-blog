const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./views/**'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  theme: {
    colors: {
      'rhino': {
        '50': '#f5f6f7',
        '100': '#ebecef',
        '200': '#ced0d8',
        '300': '#b0b3c1',
        '400': '#747b92',
        '500': '#394263',
        '600': '#333b59',
        '700': '#2b324a',
        '800': '#22283b',
        '900': '#1c2031'
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      green: colors.green,
      blue: colors.blue,
      cyan: colors.cyan,
      purple: colors.purple
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      "max-w-0": "0rem",
      "max-w-none": "none",
      "max-w-xs": "20rem",
      "max-w-sm": "24rem",
      "max-w-md": "28rem",
      "max-w-lg": "32rem",
      "max-w-xl": "36rem",
      "max-w-2xl": "42rem",
      "max-w-3xl": "48rem",
      "max-w-4xl": "56rem",
      "max-w-5xl": "64rem",
      "max-w-6xl": "72rem",
      "max-w-7xl": "80rem",
    },
    maxHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
  },
  variants: {
    extend: {},
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [],
}
