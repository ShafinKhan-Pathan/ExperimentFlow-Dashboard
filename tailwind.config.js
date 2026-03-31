/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#eef7ff',
          100: '#d6ebff',
          200: '#add8ff',
          300: '#7ac0ff',
          400: '#469fff',
          500: '#1f7aff',
          600: '#0f5ed6',
          700: '#114aa8',
          800: '#163f84',
          900: '#19366c',
        },
      },
      boxShadow: {
        panel: '0 12px 28px -18px rgba(15, 23, 42, 0.16)',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
