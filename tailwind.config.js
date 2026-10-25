/** Colors map to CSS variables so light/dark theming (data-theme) keeps working. */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens: { sm: '601px', md: '768px', lg: '1024px' },
    extend: {
      colors: { bg: 'var(--bg)', card: 'var(--card)', soft: 'var(--soft)', line: 'var(--line)', ink: 'var(--ink)', ink2: 'var(--ink2)', mute: 'var(--mute)', acc: 'var(--acc)', accink: 'var(--accink)' },
      fontFamily: { sans: 'var(--sans)', mono: 'var(--mono)' },
    },
  },
  plugins: [],
};
