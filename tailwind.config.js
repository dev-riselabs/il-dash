/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Invest Lagos / IL-DASH brand tokens (from Figma)
        accent: {
          cyan: '#00c0e8',
          green: '#34c759',
          red: '#ff383c',
          yellow: '#ffcc00',
          orange: '#ff8d28',
        },
        chart: {
          tertiary: '#4ab1d9',
          transparent: 'rgba(255,255,255,0.04)',
        },
        // Dark theme surfaces (matches Figma command-centre look)
        surface: {
          950: '#0a0e14',
          900: '#0e1420',
          800: '#141b2d',
          700: '#1c2440',
          600: '#2a3358',
          500: '#3a4470',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}

