/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--c-paper)',
        'paper-alt': 'var(--c-paper-alt)',
        ink: 'var(--c-ink)',
        mute: 'var(--c-mute)',
        line: 'var(--c-line)',
        accent: 'var(--c-accent)',
        'accent-soft': 'var(--c-accent-soft)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
