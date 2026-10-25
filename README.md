# Reynold B. Boliver: portfolio

Static site. Open `index.html` directly, or serve the folder with any static host.

```
index.html          markup, styled with Tailwind utility classes
dist/styles.css     compiled + minified CSS (committed so no build is needed to view)
src/input.css       Tailwind entry: design tokens, custom component CSS, @apply components
tailwind.config.js  colors map to CSS variables, so light/dark theming keeps working
js/main.js          theme switch, 3D phone, project tour, lightbox, resume viewer
assets/my-roxas/    the seven app screenshots (webp)
```

## Editing
```
npm install
npm run dev     # watch + rebuild dist/styles.css
npm run build   # minified build
```
Add or reorder My Roxas screens in the `SH` array at the top of the phone section in `js/main.js`
(and keep the `.rtx` text blocks in `index.html` in the same order).
