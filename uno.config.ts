import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: false,
    }),
  ],
  theme: {
    colors: {
      // AESI brand colors extracted from the live site
      primary: {
        DEFAULT: '#00992e',     // signature green
        dark: '#007a24',
        light: '#00b835',
      },
      accent: {
        DEFAULT: '#e67817',     // accent orange
        dark: '#c66811',
        light: '#ff8c2a',
      },
      ink: {
        DEFAULT: '#1a1a1a',
        muted: '#3a3a3a',
        subtle: '#666666',
      },
      surface: {
        DEFAULT: '#ffffff',
        muted: '#f4f4f4',
        dark: '#0a0a0a',
      },
    },
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      heading: '"Segoe UI", system-ui, sans-serif',
    },
  },
  shortcuts: {
    'btn-primary': 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-white font-semibold hover:bg-primary-dark transition-colors',
    'btn-outline': 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors',
    'container-wide': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'container-narrow': 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
    'section': 'py-12 md:py-20',
    'heading-1': 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
    'heading-2': 'text-3xl md:text-4xl font-bold leading-tight',
    'heading-3': 'text-2xl md:text-3xl font-semibold leading-snug',
    'eyebrow': 'text-sm uppercase tracking-widest text-primary font-semibold',
    // Small utility-text links used in the header top bar (e.g.
    // "Hubungi Kami", "Registrasi Anggota"). Without these definitions
    // the browser default blue+underline shows through.
    'utility-text': 'text-xs transition-colors',
    // Re-add an underline only on hover, used in footer nav links and
    // any place we want a real "click here" affordance.
    'link-underline': 'underline underline-offset-2 hover:no-underline transition-colors',
    // Main nav links in the desktop header.
    'nav-link': 'block px-3 py-2 text-sm font-medium transition-colors',
  },
});
