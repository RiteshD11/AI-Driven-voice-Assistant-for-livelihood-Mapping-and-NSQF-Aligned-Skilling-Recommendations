/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#12263f',
          primary: '#1e3a5f',
          accent: '#b85d19',
          amber: '#d97706',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          dark: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

