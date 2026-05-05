import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E6F1FB',
          100: '#B5D4F4',
          500: '#378ADD',
          600: '#185FA5',
          700: '#0C447C',
          900: '#042C53',
        },
      },
      boxShadow: {
        soft: '0 16px 40px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
