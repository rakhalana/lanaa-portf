/**
 * prerender.js
 * Generates static HTML markup from data.js into:
 *  1. index.html (Main portfolio with Section 01: Education & Credentials, 02: Experience, etc.)
 *  2. experience.html (Full experience directory with "All" filter and unlimited list)
 *  3. credentials.html (Full education & credentials directory with "All" filter and unlimited list)
 *
 * Ensures 100% SEO, AI Crawler, and Accessibility coverage without requiring JavaScript execution.
 */

const fs = require("fs");
const path = require("path");

// Load data.js into a simulated global window
global.window = {};
require("./data.js");
const data = window.PORTFOLIO_DATA;

// Bespoke SVG Icon Dictionary (identical to app.js)
const ICONS = {
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-6 0C5.8.1 4.7.5 4.7.5A5 5 0 0 0 4.6 4a5.4 5.4 0 0 0-1.4 3.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 18c-3 .9-3-1.3-4.2-1.7"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  "file-text": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.5h8l4 4V21H6a2 2 0 0 1-2-2V4.5a2 2 0 0 1 2-2Z"/><path d="M14 2.5V7h4M8 11h7M8 14h7M8 17h4"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>`,
  chevron: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>`,
  pelindo: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" opacity="0.6" d="M15.2 3H13.5A7.5 7.5 0 0 0 6 10.5v3h4.2v-3a3.3 3.3 0 0 1 3.3-3.3h1.7V3ZM6 17.7h4.2V21H6v-3.3Z"/><path fill="currentColor" stroke="none" d="M15.2 3h3.3a1 1 0 0 1 1 1v6.2a7.5 7.5 0 0 1-7.5 7.5h-1.8v-4.2H12a3.3 3.3 0 0 0 3.2-3.3V3ZM3.5 13.5H6v4.2H3.5v-4.2Z"/></svg>`,
  ordo: `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><mask id="ordo-cut"><rect width="24" height="24" fill="#fff"/><path d="M10.4 9.2 8.2 11.4a.85.85 0 0 0 0 1.2l5.8 5.8M13.6 14.8l2.2-2.2a.85.85 0 0 0 0-1.2l-5.8-5.8" fill="none" stroke="#000" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><g mask="url(#ordo-cut)"><circle cx="8.2" cy="12" r="6.4" fill="currentColor" stroke="none" opacity="0.72"/><circle cx="15.8" cy="12" r="6.4" fill="currentColor" stroke="none"/></g></svg>`,
  "veteran-esport": `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" fill-rule="evenodd" d="M11.84 2.39L15.07 2.38L16.27 2.63L18.85 3.69L20.47 4.81L20.79 4.19L21.19 4.89L21.9 7.27L21.65 10.21L22.8 12.56L23.05 13.8L23 15.25L22.44 16.88L21.39 18.13L21.29 16.61L20.49 15.66L19.57 15.11L19.31 16.2L19.57 17.38L20.69 19.8L21.29 21.62L18 19.95L14.76 18.61L12.17 17.7L9.78 17.2L7.63 17.3L5.8 17.91L4.01 19.1L2.26 20.98L2.7 18.59L3.41 16.56L4.3 14.76L5.68 12.72L3.11 13.77L1.01 15.09L1.66 13.22L2.66 11.32L3.81 9.73L5.33 8.13L1.81 9.28L3.86 6.53L6.15 4.64L9.19 3.09ZM13.32 3.28L11.18 3.53L9.09 4.19L7.1 5.19L5 6.73L3.81 8L6.3 6.93L8.47 6.38L7.15 7.28L5.25 9.23L3.66 11.27L2.46 13.29L5.5 11.42L6.84 10.91L7.77 10.85L6.9 9.95L6.95 8.98L7.85 7.63L9.42 6.13L7.93 6.07L6.15 6.63L8.35 5.34L11.28 4.43L13.77 4.38L15.9 4.94L14.47 5.22L13.83 5.56L16.25 5.78L17.05 6.28L18.07 7.56L19.05 8.2L18.12 6.83L18.6 7.03L20.21 8.72L19.97 7.76L20.19 7.73L20.69 8.38L21.14 9.6L21.35 8.92L21.14 8.13L20.24 6.53L19.05 5.29L16.8 3.99L15.27 3.53ZM9.38 5.57L10.72 5.81L8.15 8.03L7.55 8.98L7.5 9.8L8.35 10.55L11.78 12.36L9.64 12.87L8.4 13.52L6.9 14.76L6.35 15.74L7.24 15.7L10.43 14.9L11.63 14.4L12.67 14.25L11.29 14.86L10.69 15.59L12.92 14.9L14.77 14.7L13.43 15.59L14.17 15.4L16.17 15.55L16.9 15.96L17.2 16.68L17.41 15.75L17.2 15.26L16.58 14.71L18.2 15.21L16.33 13.39L15.95 12.67L15.21 11.87L15.26 12.79L13.81 11.27L13.81 12L11.59 11.35L11.49 11.22L11.91 11.17L11.06 10.67L9.49 10.17L12.26 9.93L9.53 8.82L8.3 8.85L9.53 8.42L11.13 8.82L12.02 8.72L11.41 8.13L10.62 7.73L9.33 7.62L10.18 7.27L12.02 7.47L12.31 7.33L11.34 7.03L12.66 6.58L12.02 6.32L11.04 6.26L11.19 5.88L11.61 5.76L11.43 5.67ZM14.46 8.28L14.22 9.01L14.58 9.6L15.27 9.76L15.8 9.4L15.57 9.06L15.17 9.31L14.93 9.25L14.67 8.92L14.76 8.53ZM14.97 8.52L15.01 8.8L15.12 8.62ZM19.91 10.06L19.02 10.87L18.45 12.34L18.06 12.51L16.61 12.36L21.19 15.71L21.74 16.46L21.84 17.38L22.65 15.15L22.55 13.01L22.04 11.77L21.39 10.87L20.69 10.27ZM19.92 11.07L20.29 11.17L20.39 11.45L19.86 11.61L19.37 11.4Z"/><path fill="currentColor" stroke="none" opacity="0.6" fill-rule="evenodd" d="M14.43 8.28L14.76 8.53L14.67 8.92L14.93 9.25L15.17 9.31L15.57 9.06L15.85 9.28L15.8 9.4L15.27 9.76L14.58 9.6L14.22 9.01ZM19.87 10.08L20.69 10.27L21.39 10.87L22.04 11.77L22.55 13.01L22.7 13.85L22.65 15.15L22.29 16.49L21.84 17.38L21.74 16.46L21.19 15.71L17.62 13.24L16.61 12.36L16.81 12.26L18.06 12.51L18.45 12.34L19.02 10.87ZM19.96 11.06L19.37 11.4L19.86 11.61L20.39 11.45L20.29 11.17Z"/></svg>`,
  moonton: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" opacity="0.62" d="M11.23 2.02L13.87 2.14L15.65 2.67L17.38 3.53L18.6 4.5L16.59 3.38L14.66 2.94L13.08 2.94L11.93 3.15L10.65 3.6L9.39 4.36L6.91 3.42L9.05 2.43ZM6.48 3.67L8.24 4.1L9.1 4.57L7.99 5.62L7.27 6.62L6.3 9.03L4.09 8.98L2.45 9.32L2.81 8.06L3.96 6.05L5.18 4.68ZM20.94 7.49L21.41 8.42L21.93 10.27L22.07 11.42L22 13.37L21.26 16.01L20.69 17.16L19.7 18.47L19.21 16.19L20.11 15.15L20.9 13.78L21.57 11.14L21.42 9.05ZM4.46 9.21L6.23 9.36L6.17 11.42L6.32 12.29L6.69 13.49L7.54 15.09L5.54 16.12L3.74 17.67L2.74 15.87L2.36 14.73L2 12.72L2 11.35L2.31 9.64ZM7.7 15.33L8.78 16.44L9.86 17.23L11.01 17.81L12.92 18.28L12.79 19.84L11.98 22.05L10.13 21.93L7.41 20.97L5.76 19.9L3.96 18.03L4.03 17.77L5.47 16.48ZM18.92 16.41L19.27 17.25L19.41 18.83L18.31 19.9L16.66 20.97L15.51 21.48L13.51 22L12.31 22.05L13.01 19.99L13.17 18.35L14.59 18.33L16.51 17.88L17.74 17.31Z"/><path fill="currentColor" stroke="none" d="M12.88 4.46L13.94 4.45L15.22 4.75L16.23 5.33L17.16 6.26L17.95 7.63L18.26 8.55L18.33 10.27L18.03 11.19L17.2 12.13L17.47 11.06L17.4 9.63L16.8 8.21L15.87 7.2L15 6.69L14.01 6.39L12.79 6.32L11.78 6.46L10.08 7.2L9.28 7.85L8.64 8.71L7.97 10.56L7.9 11.42L8.13 13.42L7.61 12L7.47 10.49L7.76 8.76L8.42 7.27L8.92 6.55L10.29 5.33L11.3 4.82ZM16.91 5.04L18.46 6.19L19.68 7.99L20.2 9.84L20.13 12L19.39 13.78L18.1 15.15L17.02 15.72L16.17 15.96L14.45 15.96L12.81 15.29L11.95 14.5L11.35 13.37L11.28 12.07L11.73 10.87L12.16 10.36L13.15 9.84L14.37 9.77L15.02 10.06L14.1 10.65L13.8 11.64L14.1 12.56L14.9 13.28L15.6 13.51L16.75 13.44L17.67 12.99L18.46 12.2L19.12 10.78L19.12 8.76L18.53 7.05L17.74 5.9ZM13.03 7.27L14.59 7.47L15.51 7.92L16.44 8.92L16.89 9.99L16.87 10.33L16.08 9.57L14.95 8.98L13.65 8.83L12.59 9.07L11.59 9.64L10.79 10.58L10.27 12L10.35 13.29L10.87 14.57L11.8 15.58L13.65 16.46L15.72 16.69L15.24 16.89L14.45 17.04L12.86 16.96L11.15 16.3L9.86 15.08L9.28 14.07L8.98 13.08L8.83 12.07L8.91 10.92L9.21 9.86L9.86 8.78L10.65 8.06L11.59 7.56Z"/></svg>`,
  evos: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" opacity="0.22" d="M18.44 1.75L19.9 1.84L20.5 5.32L21.08 5.48L20.67 7.73L20.77 9.05L22.5 9.4L21.65 11.13L20.52 12L20.42 12.32L20.08 14.07L20.25 16.48L20.58 17.73L20.4 19.05L18.19 19.75L17.08 21.9L13.92 20.98L11.08 21.73L10.75 20.32L7.94 20.71L7.33 19.4L7.23 17.5L6.33 16.9L6.17 16.98L6.25 17.48L4.85 17.05L2.35 14.88L2.33 14.07L2.67 13.07L1.6 11.3L1.6 10.92L3.19 8.67L5.27 6.5L8.98 4.05L10.85 2.42L11.75 2.23L12.08 2.82L15.17 2.07Z"/><path fill="currentColor" stroke="none" fill-rule="evenodd" d="M18.94 2.5L19.23 2.59L19.33 2.98L19.75 5.48L19.67 5.98L19.35 5.96L19.25 5.65L18.9 3.17L18.81 3L18.44 2.96L18.33 2.73L18.35 2.59ZM16.6 2.67L17.31 2.71L16.58 3.15L15.75 3.23L15.33 3.07L11.83 3.82L11.85 3.67L14.08 3.07ZM11.1 3.17L11.25 3.23L11.31 4.21L10.69 4.46L10.6 3.92L9.19 5.13L9.6 4.42L10.52 3.5ZM17.69 3.17L17.83 3.23L17.92 4.4L17.65 5.55L17.15 6.46L17.42 5.23L17.08 5.23L17.33 4.48L17.25 4.23L14.94 6.05L16.31 6.5L15.52 7L16.17 7.15L17.75 7.07L19.98 6.67L19.56 7.71L18.9 8.63L17.6 8.71L19.27 9.55L21.23 10L20.9 10.55L20.06 11.21L18.1 11.75L18.42 12.73L18.4 13.71L16.73 12.09L15.44 11.34L16.23 12.75L16.65 14.8L16.44 14.8L15.33 13.73L15.27 14.8L14.08 13.57L13.81 15.88L13.65 15.59L13.02 15.71L12.83 13.82L12.17 12.57L12.75 10.07L12.5 8.4L11.73 11.3L10.92 12.73L12.4 14.5L12.9 15.8L11.35 16.21L10.9 15.09L10.31 14.5L10.19 14.55L10.73 15.38L9.23 14.25L7 13.4L6.52 13.42L7.15 13.71L6.27 14.17L5 15.65L4.35 15.55L3.75 14.82L4.31 14.05L4.56 13.17L3.73 14.05L3.02 14.38L3.6 12.67L4.27 11.75L4.98 11.13L4.77 10.92L5.06 10.71L5.02 10.17L6.1 8.25L6.6 7.67L7.42 7.82L8.31 7.55L7.35 7.3L7.25 6.98L7.6 6.5L8.33 6.82L9.98 6.8L9.27 6.55L8.75 5.98L9.69 5.25L9.77 5.63L10.1 5.96L11.5 6.4L10.69 5.71L10.69 4.84L12.17 4.32L15.06 3.67L14.4 4.71ZM14.06 4.75L13.1 5L12.75 5.57L13.27 6.3L14.73 7.13L13.67 5.65L13.69 5.25ZM7.85 5.59L4.77 8.75L3.19 10.75L3 11.23L3.48 12L3.19 12.46L2.42 11.15L2.94 10.34L4.02 8.92L6.02 6.92ZM11.58 7.57L10.35 8L10.73 8.09L10.83 8.4L10.02 9.96L11.15 8.71L11.65 7.8ZM9.75 8.15L8.19 9L6.56 10.63L6.08 10.82L5.75 10.48L6.19 9.09L5.33 10.73L5.35 10.96L5.65 11.17L5.44 11.96L5.77 11.5L6.17 11.32L6.73 11.34L6.44 11.67L6.5 11.82L7.9 11.55L8.06 11.42L7.19 11.17L8.06 10.92L8.44 11.38L10.15 12.05L9.1 11.05L8.83 10.32L9.19 8.92L9.9 8.21ZM13.33 8.4L13.58 9.32L13.56 12.88L14.5 9.4L14.06 8.84ZM14.75 8.48L14.94 8.96L16.81 10.71L16.23 9L15.73 8.67ZM19.85 8.67L19.9 9.05L19.69 9.05ZM5.08 11.57L4.77 11.67L4.69 12.46L5.23 11.63ZM19.52 12.17L19.67 12.23L19.58 12.9L19.33 14.07L19.17 14.15L19.17 12.4ZM8.08 12.82L7.52 13.05L8.15 13.17L9.73 14.05L8.9 13.17ZM5.73 13.17L5.19 13.42L5.25 13.65L5.02 14.13ZM6.08 13.65L5.35 14.46L6.06 13.88ZM6.85 14.09L7 14.15L6.83 14.48L6.58 14.32ZM6.27 14.5L6.48 14.5L6.48 14.88L6.1 14.8ZM5.85 15L6.73 16.38L5.44 15.63ZM6.94 15.84L7.98 16.59L7.9 16.96L7.19 16.46ZM5.1 16.09L5.4 16.63L4.85 16.21ZM9.1 17.42L9.81 18L9.56 18.46L9.27 18.3ZM10.69 17.5L10.83 17.65L11 18.98L10.6 19.3L10.98 19.34L10.98 19.46L10.58 19.65L9.08 19.73L8.27 20.05L8.17 19.57L8.48 19.17L8.1 19.17L10.06 18.63L9.85 18.5ZM9.94 17.59L10.23 17.71L10.02 17.88ZM7.77 17.92L8.23 18.34L8.23 18.88L7.85 18.55ZM9.02 18.42L9.31 18.63L9.02 18.71ZM8.35 18.5L8.5 18.57L8.42 18.82ZM8.69 18.5L8.9 18.71L8.69 18.8ZM17.1 19.84L17.23 19.88L16.67 20.98L14.94 20.46L15.58 20.23L16.42 20.48L16.77 19.92Z"/><path fill="currentColor" stroke="none" opacity="0.68" fill-rule="evenodd" d="M16.27 6.42L16.4 6.5L16.31 6.63ZM19.94 8.5L20 8.98L19.85 9.13ZM8.77 9L8.83 9.32L8.58 10.48L8.85 11.13L9.31 11.55L8.52 11.13L8.17 10.65L7.42 10.9L6.85 10.88L6.85 10.67L7.77 9.67ZM18.94 14.5L19.31 14.5L19.48 14.75L19.56 15.88L18.67 15.15L18.27 15.25L18.25 15.98L19.81 17.09L20 18.48L19.65 18.8L18.17 19.15L17.92 18.65L17.85 17.75L18.31 17.92L18.67 18.48L19.31 18.3L19.33 17.98L19.23 17.42L17.77 16.55L17.58 15.07L17.77 14.84ZM9.69 14.92L9.9 14.92L10.4 15.34L10.42 15.9L10.33 15.98L10.19 15.84L9.81 17.55L8.94 17.09L8.94 18.13L8.6 17.96L8.42 17.65L8.5 16.07L8.77 15.42L9.06 15.17L9.06 16.63L9.27 15.67ZM16.85 15.09L17.15 15.09L17.33 15.4L17.75 19.07L17.48 19.38L15.92 19.82L15.69 19.71L15.58 19.4L15.17 15.9L15.35 15.5ZM14.69 15.67L15 15.73L14.83 19.4L14.73 20.13L14.17 20.23L12.83 16.23L13.48 16.09L14.31 19.05L14.42 15.82ZM16.58 15.73L15.83 15.98L16.27 19.13L16.98 18.96L17.08 18.82L16.75 15.82ZM12.52 16.25L12.73 16.25L12.81 16.8L11.75 17.15L11.85 18.21L12 18.32L12.75 18.07L12.92 18.57L12.02 18.92L12.08 20.15L12.25 20.23L13.17 19.98L13.25 20.48L11.6 20.96L11.08 16.73ZM10.35 17.25L10.48 17.3L10.27 17.46Z"/></svg>`,
  vestjava: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" opacity="0.52" d="M21.05 1.82L18.29 7.1L14.33 7.1ZM3.23 1.87L9.73 7.1L5.92 7.1ZM9.02 13.06L11.15 13.06L12.01 16.09L12.91 13.06L15.14 13.06L12.04 18.93Z"/><path fill="currentColor" stroke="none" opacity="0.76" d="M4.23 1.82L11.89 3.12L20.03 1.84L12.88 7.1L11.16 7.11ZM21.26 2.92L20.87 7.1L19.11 7.1ZM2.97 2.97L5.15 7.1L3.39 7.1ZM20.63 8.7L20.4 11.41L19.16 12.2L19.69 10.96L20.29 10.62L20.09 10.06ZM3.55 8.75L4.38 10L4.13 10.57L5.1 11.12L6.2 12.93L3.81 11.41ZM6.39 13.06L8.31 13.06L9.31 14.93ZM15.9 13.06L17.82 13.09L14.96 14.88ZM13.48 17.48L13.14 20.55L10.86 22.18L12.62 20.24ZM10.54 17.85L11.89 19.73L10.96 19.85L10.67 21.76Z"/><path fill="currentColor" stroke="none" d="M2.71 7.39L5 7.39L4.86 7.73L6.91 11.36L6.9 7.79L6.55 7.39L8.83 7.39L8.48 7.95L8.37 9.84L8.44 10.2L8.78 10.52L8.32 11L8.2 12.78L6.49 12.78L5.31 10.96L4.6 10.52L4.75 10.27L4.63 9.86L3.31 7.86ZM9.81 7.39L15.09 7.39L14.93 8.73L14.52 8.48L11.79 8.53L11.8 10.04L13.1 10.06L13.52 9.9L13.41 11.09L12.95 10.9L11.86 10.91L11.86 12.14L13.94 12.16L14.46 11.96L14.35 12.78L10.44 12.78L10.58 12.58L10.48 10.9L10.12 10.52L10.42 10.06L10.27 8.16L10.15 7.76ZM18.9 7.39L21.19 7.41L20.63 7.91L19.73 10.11L19.87 10.52L19.37 10.91L18.82 12.25L18.4 12.62L17.89 12.79L15.57 12.79L15.27 12.67L15 12.26L15.21 11.53L16.61 11.54L16.31 11.95L16.47 12.16L17.41 12.16L17.66 11.99L18.04 10.9L17.85 10.49L18.35 10.04L19.04 8.01Z"/></svg>`,
  "monitor-check": `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-3-10 2 2 4-4"/></svg>`,
  "scatter-chart": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18"/><circle cx="8" cy="15" r="1.4"/><circle cx="12" cy="11" r="1.4"/><circle cx="17" cy="7" r="1.4"/></svg>`,
  "network-nodes": `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="7" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="7" r="2"/><circle cx="20" cy="17" r="2"/><path d="m7 8 4 3m-4 5 4-3m4-2 3-3m-3 5 3 3"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4" rx=".5"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></svg>`,
  "pen-tool": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 19 7-7 3 3-7 7-3-3ZM18 13l-1.5-7.5L2 2l3.5 14.5L13 18M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  database: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
  motion: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 17 5-10h4l-2 4h5l4 6h-5l-2-3-1.5 3H4Z"/></svg>`,
  nodes: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="12" cy="18" r="2"/><path d="m7.5 10.5 3-3m3 0 3 3m0 3-3 3m-3 0-3-3"/></svg>`,
  barchart: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9m5 10V5m5 14v-7m5 7V8"/></svg>`,
  "sparkle-grid": `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v5M9.5 4.5h5M12 17v5M9.5 19.5h5M2 12h5M4.5 9.5v5M17 12h5M19.5 9.5v5M12 9v6M9 12h6"/></svg>`,
  "pen-nib": `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4-1 10-10-3-3L5 16l-1 4Z"/><path d="m13 8 3 3"/></svg>`,
  server: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M8 7h.01M8 17h.01M15 7h3M15 17h3"/></svg>`,
  "map-pin": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10Z"/><circle cx="12" cy="11" r="2.2"/></svg>`,
  candlestick: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V4m-2 7h4v5H3v-5Zm9 9V3m-2 4h4v6h-4V7Zm9 13V6m-2 8h4v4h-4v-4Z"/></svg>`,
  "scan-face": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4H4v3m13-3h3v3M4 17v3h3m13-3v3h-3"/><circle cx="12" cy="10" r="3"/><path d="M7.5 18c.8-2.5 2.4-3.5 4.5-3.5s3.7 1 4.5 3.5"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 2-6h6l2 6H3Zm8 0 2-6h6l2 6H11ZM7 11l2-5h6l2 5"/><path d="M4 20h16"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 4C11 4 6 7 6 13a6 6 0 0 0 6 6c6 0 9-5 7-15Z"/><path d="M5 20c2-4 6-7 11-10m-1 5h4m-2-2v4"/></svg>`,
  "shopping-bag": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Zm4 1V6a3 3 0 0 1 6 0v3"/><path d="M9 15a3 3 0 0 1 5-1m1 2a3 3 0 0 1-5 2"/></svg>`,
  "eco-circle": `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M17 7c-5 0-8 2-8 5a3 3 0 0 0 3 3c3 0 5-3 5-8Zm-9 10 6-6"/></svg>`,
  "book-open": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  "graduation-cap": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v5c3 2 7 2 10 0v-5"/></svg>`,
  "shield-check": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3Z"/><path d="m9.2 12 2 2 3.8-3.8"/></svg>`
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getIcon = (key, fallback = "cpu") => ICONS[key] || ICONS[fallback] || "";

// 1. Render Hero HTML
function renderHeroHtml() {
  const profile = data.profile || {};
  const socialsHtml = (profile.socials || [])
    .map((social) => {
      const isExternal = social.url?.startsWith("http") || social.url?.endsWith(".pdf");
      const targetAttrs = isExternal ? `target="_blank" rel="noopener noreferrer"` : "";
      return `
            <a class="icon-link" href="${escapeHtml(social.url)}" ${targetAttrs} aria-label="${escapeHtml(social.label)}" title="${escapeHtml(social.label)}">
              ${getIcon(social.icon, "github")}
            </a>`;
    })
    .join("");

  const locationLink = `<a class="text-link" href="${escapeHtml(profile.locationUrl || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.city || "")}</a>`;

  const bioHtml = (profile.bio || [])
    .map((paragraph) => {
      const safeParagraph = escapeHtml(paragraph).replace("{location}", locationLink);
      return `<p class="intro">${safeParagraph}</p>`;
    })
    .join("");

  const primaryBtn = profile.actions?.primary;
  const secondaryBtn = profile.actions?.secondary;

  return `
        <div class="hero-topline">
          <div class="identity">
            <h1>${escapeHtml(profile.name || "Portfolio Owner")}</h1>
            <p class="role">${escapeHtml(profile.role || "")}</p>
          </div>
          <nav class="socials" aria-label="Social links">
            ${socialsHtml}
          </nav>
        </div>
        ${bioHtml}
        <div class="actions">
          ${primaryBtn
            ? `<a class="button primary" href="${escapeHtml(primaryBtn.url)}" target="_blank" rel="noopener noreferrer">
                   ${getIcon(primaryBtn.icon || "calendar")}
                   <span>${escapeHtml(primaryBtn.label)}</span>
                 </a>`
            : ""
          }
          ${secondaryBtn
            ? `<a class="button" href="${escapeHtml(secondaryBtn.url)}">
                   ${getIcon(secondaryBtn.icon || "mail")}
                   <span>${escapeHtml(secondaryBtn.label)}</span>
                 </a>`
            : ""
          }
        </div>`;
}

// 2. Render Experience Tabs & Initial Active Items
function renderExperienceTabsHtml(isSubpage = false) {
  const allItems = data.experience || [];
  const baseCategories = data.experienceCategories || [];
  const categories = isSubpage
    ? [{ id: "all", label: "All" }, ...baseCategories]
    : baseCategories;
  const activeCat = isSubpage ? "all" : (categories[0]?.id || "professional");

  return categories
    .map((cat) => {
      const count =
        cat.id === "all"
          ? allItems.length
          : allItems.filter((item) => item.category === cat.id).length;
      const isSelected = activeCat === cat.id;
      return `
          <button
            type="button"
            class="filter-tab"
            role="tab"
            aria-selected="${isSelected}"
            data-exp-tab="${escapeHtml(cat.id)}"
          >
            <span>${escapeHtml(cat.label)}</span>
            <span class="tab-count">${count}</span>
          </button>`;
    })
    .join("");
}

function renderExperienceListHtml(isSubpage = false) {
  const allItems = data.experience || [];
  const activeCat = isSubpage ? "all" : (data.experienceCategories?.[0]?.id || "professional");
  const filtered = activeCat === "all" ? allItems : allItems.filter((item) => item.category === activeCat);

  const maxItems = 3;
  const shouldLimit = !isSubpage && filtered.length > maxItems;
  const displayItems = shouldLimit ? filtered.slice(0, maxItems) : filtered;

  const cardsHtml = displayItems
    .map((item, idx) => {
      const isExpanded = idx === 0;
      const bulletsHtml = (item.bullets || [])
        .map((point) => `<li>${escapeHtml(point)}</li>`)
        .join("");

      const subtitleText =
        item.event && item.organizer
          ? `${escapeHtml(item.event)} · ${escapeHtml(item.organizer)}`
          : escapeHtml(item.event || item.organizer || item.company || "");

      return `
          <article
            class="exp-card animate-in"
            data-exp-id="${escapeHtml(item.id)}"
            data-expanded="${isExpanded}"
            style="animation-delay: ${idx * 25}ms"
          >
            <button
              type="button"
              class="exp-trigger"
              aria-expanded="${isExpanded}"
              aria-controls="drawer-${escapeHtml(item.id)}"
              data-exp-toggle="${escapeHtml(item.id)}"
            >
              <span class="exp-icon-well" aria-hidden="true">
                ${getIcon(item.icon, "cpu")}
              </span>
              <span class="exp-summary-main">
                <span class="exp-role">${escapeHtml(item.role)}</span>
                <span class="exp-company">${subtitleText}</span>
              </span>
              <span class="exp-summary-right">
                <span class="exp-period">${escapeHtml(item.period)}</span>
                <span class="exp-chevron" aria-hidden="true">${ICONS.chevron}</span>
              </span>
            </button>
            <div class="exp-drawer" id="drawer-${escapeHtml(item.id)}">
              <div class="exp-drawer-inner">
                <div class="exp-drawer-content">
                  ${item.location ? `<p class="exp-location">${escapeHtml(item.location)}</p>` : ""}
                  <ul class="exp-bullets">
                    ${bulletsHtml}
                  </ul>
                </div>
              </div>
            </div>
          </article>`;
    })
    .join("");

  const seeMoreHtml = shouldLimit
    ? `
        <div class="see-all-row">
          <a class="see-all-btn" href="./experience.html?cat=${encodeURIComponent(activeCat)}">
            <span>Lihat Semua ↗</span>
          </a>
        </div>`
    : "";

  return cardsHtml + seeMoreHtml;
}

// 3. Render Capabilities / Skills HTML
function renderSkillsHtml() {
  const groups = data.skills || [];
  return groups
    .map((group) => {
      const itemsHtml = (group.items || [])
        .map((skill) => {
          let iconMarkup = "";
          if (skill.customIcon && ICONS[skill.customIcon]) {
            iconMarkup = ICONS[skill.customIcon];
          } else if (skill.iconSlug) {
            const iconUrl = `https://cdn.simpleicons.org/${encodeURIComponent(skill.iconSlug)}/98A8A2`;
            iconMarkup = `<img class="skill-icon" src="${iconUrl}" alt="" loading="lazy" referrerpolicy="no-referrer" data-fallback="nodes">`;
          } else {
            iconMarkup = ICONS.nodes;
          }

          return `
              <span class="skill-item">
                ${iconMarkup}
                <span>${escapeHtml(skill.name)}</span>
              </span>`;
        })
        .join("");

      return `
          <div class="skill-row">
            <div class="skill-label">${escapeHtml(group.category)}</div>
            <div class="skill-list">${itemsHtml}</div>
          </div>`;
    })
    .join("");
}

// 4. Render Selected Projects HTML
function renderProjectsHtml() {
  const projects = data.projects || [];
  return projects
    .map((proj) => {
      const stackHtml = (proj.stack || [])
        .map((tech, index) => {
          const sep = index > 0 ? `<span class="stack-dot" aria-hidden="true">·</span>` : "";
          return `${sep}<span>${escapeHtml(tech)}</span>`;
        })
        .join("");

      const rawLinks = Array.isArray(proj.links)
        ? proj.links
        : (proj.url ? [{ label: "View Project ↗", url: proj.url }] : []);

      const linksHtml = rawLinks
        .map((link) => {
          if (!link || !link.url) return "";
          return `
              <a
                class="project-link"
                href="${escapeHtml(link.url)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>${escapeHtml(link.label || "Link ↗")}</span>
              </a>`;
        })
        .filter(Boolean)
        .join("");

      return `
          <article class="project-card">
            <div>
              <div class="project-card-top">
                <span class="project-icon-well" aria-hidden="true">
                  ${getIcon(proj.icon, "layers")}
                </span>
                <span class="project-tag-group">
                  <span>${escapeHtml(proj.tag || "")}</span>
                </span>
              </div>
              <h3 class="project-name">${escapeHtml(proj.name)}</h3>
              <p class="project-desc">${escapeHtml(proj.description)}</p>
            </div>
            <div>
              ${linksHtml ? `<div class="project-links" aria-label="Project links">${linksHtml}</div>` : ""}
              <div class="project-stack" aria-label="Technologies used">
                ${stackHtml}
              </div>
            </div>
          </article>`;
    })
    .join("");
}

// 5. Render Credentials Tabs & Initial Active Items
function renderCredentialsTabsHtml(isSubpage = false) {
  const allCreds = data.credentials || [];
  const baseCategories = data.credentialCategories || [];
  const categories = isSubpage
    ? [{ id: "all", label: "All" }, ...baseCategories]
    : baseCategories;
  const activeCat = isSubpage ? "all" : (categories[0]?.id || "education");

  return categories
    .map((cat) => {
      const count =
        cat.id === "all"
          ? allCreds.length
          : allCreds.filter((item) => item.type === cat.id).length;
      const isSelected = activeCat === cat.id;

      return `
          <button
            type="button"
            class="filter-tab"
            role="tab"
            aria-selected="${isSelected}"
            data-cred-tab="${escapeHtml(cat.id)}"
          >
            <span>${escapeHtml(cat.label)}</span>
            <span class="tab-count">${count}</span>
          </button>`;
    })
    .join("");
}

function renderCredentialsListHtml(isSubpage = false) {
  const allCreds = data.credentials || [];
  const activeCat = isSubpage ? "all" : (data.credentialCategories?.[0]?.id || "education");
  const filtered = activeCat === "all" ? allCreds : allCreds.filter((item) => item.type === activeCat);

  const maxItems = 3;
  const shouldLimit = !isSubpage && filtered.length > maxItems;
  const displayItems = shouldLimit ? filtered.slice(0, maxItems) : filtered;

  const cardsHtml = displayItems
    .map((cred, idx) => {
      const hasUrl = Boolean(cred.url);
      const tag = hasUrl ? "a" : "div";
      const hrefAttrs = hasUrl
        ? `href="${escapeHtml(cred.url)}" target="_blank" rel="noopener noreferrer"`
        : "";
      const defaultIcon =
        cred.type === "certification"
          ? "shield-check"
          : cred.type === "course"
          ? "book-open"
          : "graduation-cap";

      return `
          <${tag}
            class="cred-row animate-in"
            data-type="${escapeHtml(cred.type)}"
            style="animation-delay: ${idx * 25}ms"
            ${hrefAttrs}
          >
            <span class="cred-icon-well" aria-hidden="true">
              ${getIcon(cred.icon || defaultIcon)}
            </span>
            <div class="cred-main">
              <div class="cred-title-line">
                <h3 class="cred-title">${escapeHtml(cred.title)}</h3>
              </div>
              <div class="cred-sub-line">
                ${cred.highlight
                  ? `<span class="cred-highlight-pill">${escapeHtml(cred.highlight)}</span>`
                  : ""
                }
                <span>${escapeHtml(cred.subtitle)}</span>
              </div>
            </div>
            <div class="cred-meta">
              <span class="cred-period">${escapeHtml(cred.period)}</span>
              ${hasUrl
                ? `<span class="cred-verify">${escapeHtml(cred.meta || "Verify ↗")}</span>`
                : cred.meta && cred.meta !== "Verify ↗"
                ? `<span class="cred-location">${escapeHtml(cred.meta)}</span>`
                : ""
              }
            </div>
          </${tag}>`;
    })
    .join("");

  const seeMoreHtml = shouldLimit
    ? `
        <div class="see-all-row">
          <a class="see-all-btn" href="./credentials.html?cat=${encodeURIComponent(activeCat)}">
            <span>Lihat Semua ↗</span>
          </a>
        </div>`
    : "";

  return cardsHtml + seeMoreHtml;
}

// 6. JSON-LD Schema (Golden Standard for AI Web Readers & Search Engines)
function generateJsonLd() {
  const profile = data.profile || {};
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name || "Rakha Maulana",
    "jobTitle": profile.role || "Frontend & Web Development",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": profile.city?.split(",")[0] || "Surabaya",
      "addressCountry": "ID"
    },
    "sameAs": (profile.socials || []).map((s) => s.url).filter((u) => u?.startsWith("http")),
    "description": (profile.bio || []).join(" ").replace(/\{location\}/g, profile.city || "Surabaya"),
    "knowsAbout": (data.skills || []).flatMap((g) => (g.items || []).map((i) => i.name)),
    "hasOccupation": (data.experience || []).map((exp) => ({
      "@type": "Role",
      "roleName": exp.role,
      "startDate": exp.period?.split("–")[0]?.trim() || "",
      "endDate": exp.period?.split("–")[1]?.trim() || "Present",
      "description": (exp.bullets || []).join("; ")
    })),
    "workExample": (data.projects || []).map((p) => ({
      "@type": "CreativeWork",
      "name": p.name,
      "description": p.description,
      "keywords": (p.stack || []).join(", "),
      "url": Array.isArray(p.links) && p.links[0]?.url ? p.links[0].url : p.url
    })),
    "hasCredential": (data.credentials || []).map((c) => ({
      "@type": "EducationalOccupationalCredential",
      "name": c.title,
      "credentialCategory": c.badgeLabel || c.type,
      "recognizedBy": {
        "@type": "Organization",
        "name": c.subtitle
      }
    }))
  };

  return JSON.stringify(schema, null, 2);
}

// 7. Noscript Fallback: Complete Text for Non-JS AI Crawlers
function generateNoscriptFallback() {
  const experiences = data.experience || [];
  const credentials = data.credentials || [];

  const expItems = experiences
    .map(
      (exp) => `
        <article>
          <h3>${escapeHtml(exp.role)} — ${escapeHtml(exp.company || exp.event || "")}</h3>
          <p><strong>Category:</strong> ${escapeHtml(exp.category)} | <strong>Period:</strong> ${escapeHtml(exp.period)}</p>
          <ul>
            ${(exp.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
          </ul>
        </article>`
    )
    .join("");

  const credItems = credentials
    .map(
      (c) => `
        <li>
          <strong>${escapeHtml(c.title)}</strong> — ${escapeHtml(c.subtitle)} (${escapeHtml(c.period)}) [${escapeHtml(c.badgeLabel || c.type)}]
        </li>`
    )
    .join("");

  return `
    <noscript>
      <section style="padding: 24px 0; border-top: 1px solid rgba(255,255,255,0.1);">
        <h2>Complete Archive &amp; Non-JavaScript Directory</h2>
        <p>This section provides direct, static text access to all experience categories, certifications, and courses for accessibility tools and web crawlers.</p>
        <div>
          <h3>All Experiences (Professional, Organization &amp; Volunteer)</h3>
          ${expItems}
        </div>
        <div style="margin-top: 20px;">
          <h3>All Credentials, Certifications &amp; Courses</h3>
          <ul>
            ${credItems}
          </ul>
        </div>
      </section>
    </noscript>`;
}

// Prerender index.html
function prerenderIndex() {
  const profile = data.profile || {};
  const metaDescription = escapeHtml(
    `${profile.name} — ${profile.role}. Information Systems graduate based in ${profile.city}.`
  );
  const pageTitle = `${escapeHtml(profile.name || "Rakha Maulana")} · Portfolio`;

  const heroHtml = renderHeroHtml();
  const expTabsHtml = renderExperienceTabsHtml(false);
  const expListHtml = renderExperienceListHtml(false);
  const skillsHtml = renderSkillsHtml();
  const projectsHtml = renderProjectsHtml();
  const credTabsHtml = renderCredentialsTabsHtml(false);
  const credListHtml = renderCredentialsListHtml(false);
  const jsonLd = generateJsonLd();
  const noscriptHtml = generateNoscriptFallback();

  const repoLinkUrl = escapeHtml(data.projectsHeaderLink?.url || "https://github.com/rakhalana");
  const repoLinkLabel = escapeHtml(data.projectsHeaderLink?.label || "All repositories ↗");

  const fullHtml = `<!doctype html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}">
  <meta name="author" content="${escapeHtml(profile.name)}">
  <link rel="icon" type="image/svg+xml" href="./favicon.svg">

  <!-- Open Graph / Meta for Social & AI Crawlers -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDescription}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description" content="${metaDescription}">

  <!-- JSON-LD Structured Data for AI & Search Engine Knowledge Graphs -->
  <script type="application/ld+json">
${jsonLd}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..600&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <div class="page-progress" aria-hidden="true"></div>
  <div class="cursor-aura" aria-hidden="true"></div>

  <main class="shell">
    <!-- Open Hero Header -->
    <header id="hero-mount">${heroHtml}
    </header>

    <!-- 01 // Education & Credentials (Separated Education, Certifications & Courses) -->
    <section class="section" aria-labelledby="credentials-title">
      <div class="section-head">
        <div class="section-title-group">
          <span class="section-index" aria-hidden="true">01 //</span>
          <h2 id="credentials-title">Education &amp; Credentials</h2>
        </div>
        <div class="section-controls">
          <div class="filter-tabs" id="credentials-tabs" role="tablist"
            aria-label="Filter education and credentials">${credTabsHtml}
          </div>
        </div>
      </div>
      <div class="credentials-list" id="credentials-list">${credListHtml}
      </div>
    </section>

    <!-- 02 // Experience (Segmented Filter + Interactive Timeline Rail) -->
    <section class="section" aria-labelledby="experience-title">
      <div class="section-head">
        <div class="section-title-group">
          <span class="section-index" aria-hidden="true">02 //</span>
          <h2 id="experience-title">Experience</h2>
        </div>
        <div class="section-controls">
          <div class="filter-tabs" id="experience-tabs" role="tablist" aria-label="Filter experience by category">${expTabsHtml}
          </div>
        </div>
      </div>
      <div class="experience-list" id="experience-list">${expListHtml}
      </div>
    </section>

    <!-- 03 // Capabilities (Unboxed Skills Matrix) -->
    <section class="section" aria-labelledby="skills-title">
      <div class="section-head">
        <div class="section-title-group">
          <span class="section-index" aria-hidden="true">03 //</span>
          <h2 id="skills-title">Capabilities</h2>
        </div>
      </div>
      <div class="skill-rows" id="skills-list">${skillsHtml}
      </div>
    </section>

    <!-- 04 // Selected Projects (2-Column Editorial Bento Grid) -->
    <section class="section" aria-labelledby="projects-title">
      <div class="section-head">
        <div class="section-title-group">
          <span class="section-index" aria-hidden="true">04 //</span>
          <h2 id="projects-title">Selected projects</h2>
        </div>
        <a class="see-more-link" id="projects-repo-link" href="${repoLinkUrl}" target="_blank"
          rel="noopener noreferrer">
          ${repoLinkLabel}
        </a>
      </div>
      <div class="projects-grid" id="projects-grid">${projectsHtml}
      </div>
    </section>
${noscriptHtml}
  </main>

  <!-- Single Source of Truth Data Config + Vanilla JS Engine -->
  <script src="./data.js"></script>
  <script src="./app.js"></script>
</body>

</html>
`;

  fs.writeFileSync(path.join(__dirname, "index.html"), fullHtml, "utf-8");
  console.log("Successfully prerendered index.html with Section 01: Education & Credentials!");
}

// Prerender experience.html (Dedicated full page)
function prerenderExperiencePage() {
  const profile = data.profile || {};
  const pageTitle = `Experience · ${escapeHtml(profile.name || "Rakha Maulana")}`;
  const metaDescription = `Full professional, organization, and volunteer experience record of ${escapeHtml(profile.name)}.`;
  const expTabsHtml = renderExperienceTabsHtml(true);
  const expListHtml = renderExperienceListHtml(true);

  const fullHtml = `<!doctype html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}">
  <meta name="author" content="${escapeHtml(profile.name)}">
  <link rel="icon" type="image/svg+xml" href="./favicon.svg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..600&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
</head>

<body data-page="subpage" data-subpage="experience">
  <div class="page-progress" aria-hidden="true"></div>
  <div class="cursor-aura" aria-hidden="true"></div>

  <main class="shell">
    <header class="subpage-head">
      <a class="back-link" href="./index.html">← Back to portfolio</a>
      <div class="subpage-title-group">
        <h1 class="subpage-title">Experience</h1>
        <p class="subpage-subtitle">Complete record of professional roles, organization leadership, and volunteer contributions.</p>
      </div>
    </header>

    <section class="section" aria-labelledby="experience-title">
      <div class="section-head">
        <div class="section-title-group">
          <span class="section-index" aria-hidden="true">DIR //</span>
          <h2 id="experience-title">All Experience Entries</h2>
        </div>
        <div class="section-controls">
          <div class="filter-tabs" id="experience-tabs" role="tablist" aria-label="Filter experience by category">${expTabsHtml}
          </div>
        </div>
      </div>
      <div class="experience-list" id="experience-list">${expListHtml}
      </div>
    </section>
  </main>

  <script src="./data.js"></script>
  <script src="./app.js"></script>
</body>

</html>
`;

  fs.writeFileSync(path.join(__dirname, "experience.html"), fullHtml, "utf-8");
  console.log("Successfully prerendered experience.html!");
}

// Prerender credentials.html (Dedicated full page)
function prerenderCredentialsPage() {
  const profile = data.profile || {};
  const pageTitle = `Education & Credentials · ${escapeHtml(profile.name || "Rakha Maulana")}`;
  const metaDescription = `Complete academic degrees, professional certifications, and completed courses of ${escapeHtml(profile.name)}.`;
  const credTabsHtml = renderCredentialsTabsHtml(true);
  const credListHtml = renderCredentialsListHtml(true);

  const fullHtml = `<!doctype html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}">
  <meta name="author" content="${escapeHtml(profile.name)}">
  <link rel="icon" type="image/svg+xml" href="./favicon.svg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..600&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
</head>

<body data-page="subpage" data-subpage="credentials">
  <div class="page-progress" aria-hidden="true"></div>
  <div class="cursor-aura" aria-hidden="true"></div>

  <main class="shell">
    <header class="subpage-head">
      <a class="back-link" href="./index.html">← Back to portfolio</a>
      <div class="subpage-title-group">
        <h1 class="subpage-title">Education &amp; Credentials</h1>
        <p class="subpage-subtitle">Academic degrees, certifications, and specialized cohort course completions.</p>
      </div>
    </header>

    <section class="section" aria-labelledby="credentials-title">
      <div class="section-head">
        <div class="section-title-group">
          <span class="section-index" aria-hidden="true">DIR //</span>
          <h2 id="credentials-title">All Credentials &amp; Certifications</h2>
        </div>
        <div class="section-controls">
          <div class="filter-tabs" id="credentials-tabs" role="tablist"
            aria-label="Filter education and credentials">${credTabsHtml}
          </div>
        </div>
      </div>
      <div class="credentials-list" id="credentials-list">${credListHtml}
      </div>
    </section>
  </main>

  <script src="./data.js"></script>
  <script src="./app.js"></script>
</body>

</html>
`;

  fs.writeFileSync(path.join(__dirname, "credentials.html"), fullHtml, "utf-8");
  console.log("Successfully prerendered credentials.html!");
}

function prerenderAll() {
  prerenderIndex();
  prerenderExperiencePage();
  prerenderCredentialsPage();
}

prerenderAll();
