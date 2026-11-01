import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        crimson: ['Crimson Pro', 'Georgia', 'serif'],
      },
      colors: {
        gold: 'var(--gold)',
        'gold-light': 'var(--gold-light)',
        'gold-dim': 'var(--gold-dim)',
        stone: 'var(--stone)',
        stone2: 'var(--stone2)',
        stone3: 'var(--stone3)',
        stone4: 'var(--stone4)',
        iron: 'var(--iron)',
        parchment: 'var(--parchment)',
        blood: 'var(--blood)',
        ember: 'var(--ember)',
      },
      animation: {
        flicker: 'flicker 3s ease-in-out infinite',
        'rise': 'riseUp 0.8s ease-out forwards',
        shimmer: 'shimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
