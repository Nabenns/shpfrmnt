import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EE4D2D', // Shopee orange
          50: '#FFF4F2',
          100: '#FFE0D9',
          500: '#EE4D2D',
          600: '#D63E1F',
          700: '#B33018',
        },
        sidebar: '#1A1A2E',
      },
    },
  },
  plugins: [],
}

export default config
