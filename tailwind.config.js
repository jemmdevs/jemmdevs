/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'dark-bg': 'var(--color-dark-bg)',
        'light-bg': 'var(--color-light-bg)',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: 'var(--color-primary)',
              '&:hover': {
                color: 'var(--color-secondary)',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: '#d1d5db',
            a: {
              color: 'var(--color-primary)',
              '&:hover': {
                color: 'var(--color-secondary)',
              },
            },
            h1: {
              color: '#f9fafb',
            },
            h2: {
              color: '#f3f4f6',
            },
            h3: {
              color: '#e5e7eb',
            },
            h4: {
              color: '#d1d5db',
            },
            blockquote: {
              color: '#d1d5db',
            },
            strong: {
              color: '#f9fafb',
            },
            code: {
              color: '#e5e7eb',
            },
          },
        },
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-speed)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

