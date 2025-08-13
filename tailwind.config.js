/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#a855f7',
          blue: '#3b82f6',
          green: '#10b981',
          pink: '#ec4899',
          cyan: '#06b6d4',
        },
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          card: '#262626',
          border: '#404040',
        }
      },
      boxShadow: {
        'neon-purple': '0 0 5px #a855f7, 0 0 20px #a855f7, 0 0 35px #a855f7',
        'neon-blue': '0 0 5px #3b82f6, 0 0 20px #3b82f6, 0 0 35px #3b82f6',
        'neon-green': '0 0 5px #10b981, 0 0 20px #10b981, 0 0 35px #10b981',
        'neon-pink': '0 0 5px #ec4899, 0 0 20px #ec4899, 0 0 35px #ec4899',
      },
      animation: {
        'pulse-neon': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor' },
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
      },
    },
  },
  plugins: [],
}

