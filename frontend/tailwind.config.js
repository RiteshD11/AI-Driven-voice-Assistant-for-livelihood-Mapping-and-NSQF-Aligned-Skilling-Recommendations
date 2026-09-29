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
        unnati: {
          bg: '#F7F7F4',
          surface: '#FFFFFF',
          border: '#E7E7E3',
          'border-light': '#F0F0EC',
          'text-primary': '#181818',
          'text-secondary': '#666666',
          'text-muted': '#8A8A8A',
          accent: '#F59E0B',
          'accent-warm': '#FF7A3D',
          'accent-soft': '#FEF3C7',
          success: '#10B981',
          'success-soft': '#ECFDF5',
          info: '#0284C7',
          'info-soft': '#F0F9FF',
          neutral: '#FAFAF8',
        }
      },
      borderRadius: {
        'btn': '14px',
        'card': '20px',
        'card-lg': '26px',
        'pill': '9999px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'nav': '0 4px 20px -2px rgba(24, 24, 24, 0.05), 0 2px 6px -1px rgba(24, 24, 24, 0.02)',
        'card': '0 2px 8px -1px rgba(24, 24, 24, 0.04), 0 1px 3px rgba(24, 24, 24, 0.02)',
        'card-hover': '0 10px 25px -4px rgba(24, 24, 24, 0.06), 0 4px 10px -2px rgba(24, 24, 24, 0.03)',
        'modal': '0 20px 40px -8px rgba(24, 24, 24, 0.12), 0 8px 16px -4px rgba(24, 24, 24, 0.04)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Noto Sans Devanagari', 'Inter', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
