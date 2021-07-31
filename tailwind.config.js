module.exports = {
  mode: 'jit',
  purge: ['./views/**'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  theme: {
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
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
