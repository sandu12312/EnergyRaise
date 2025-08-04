/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          background: '#ffffff',
          surface: 'rgba(255, 255, 255, 0.95)',
          card: 'rgba(255, 255, 255, 0.85)',
          cardBorder: 'rgba(139, 157, 195, 0.12)',
          cardGlass: 'rgba(255, 255, 255, 0.75)',
          text: {
            primary: '#1a202c',
            secondary: '#4a5568',
            muted: '#64748b',
          },
          accent: {
            green: '#A3C9A8',
            energy: '#B2E384',
          },
          border: 'rgba(139, 157, 195, 0.15)',
          borderActive: '#A3C9A8',
          progress: {
            bg: 'rgba(148, 163, 184, 0.15)',
            indicator: '#A3C9A8',
          },
        },
        // Dark theme colors - aurora borealis inspired
        dark: {
          background: '#0D1A26',
          backgroundAlt: '#132A28',
          backgroundAccent: '#1C2F34',
          surface: '#1F2F3F',
          card: 'rgba(31, 47, 63, 0.85)',
          cardBorder: 'rgba(255, 255, 255, 0.05)',
          cardGlass: 'rgba(31, 47, 63, 0.75)',
          text: {
            primary: '#F4F6F7',
            secondary: '#9BA8B0',
            muted: '#b0b0b0',
          },
          accent: {
            green: '#A3C9A8',
            energy: '#B2E384',
          },
          border: 'rgba(255, 255, 255, 0.08)',
          borderActive: '#A3C9A8',
          progress: {
            bg: 'rgba(255, 255, 255, 0.08)',
            indicator: '#A3C9A8',
          },
        },
        // Common colors used in both themes
        common: {
          accent: {
            green: '#A3C9A8',
            energy: '#B2E384',
          },
          button: {
            start: '#A3C9A8',
            end: '#B2E384',
            hover: '#8fb794',
          },
        },
      },
    },
  },
};
