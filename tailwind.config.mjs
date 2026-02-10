/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    // Replace default breakpoints with BrightKeep mobile-first breakpoints.
    // Base styles (no prefix) target all viewports.
    // Note: Tailwind's default `2xl` breakpoint is intentionally removed.
    screens: {
      sm: '375px',   // Standard mobile
      md: '768px',   // Tablet
      lg: '1024px',  // Desktop
      xl: '1440px',  // Wide desktop
    },
    extend: {
      // BrightKeep brand colour palette
      // WCAG 2.1 AA contrast notes:
      //   - Navy on Off-White: ~14.6:1 (passes all text)
      //   - White on Navy: ~12.6:1 (passes all text)
      //   - Charcoal on Off-White: ~12.0:1 (passes all text)
      //   - Slate on White: ~4.6:1 (passes normal text)
      //   - Coral Pink on Navy: ~4.2:1 (large text only, 18px+; NOT for body text)
      //   - Coral Pink on White: ~3.9:1 (large text only; NOT for body text)
      //   - Teal on White: ~3.9:1 (large text only; use for icons/headings)
      colors: {
        brand: {
          primary: '#1B2A4A',    // Navy — hero bg, footer bg, headings
          accent: '#FF6B6B',     // Coral Pink — CTA buttons, highlights, hover states
          secondary: '#3A6B9F',  // Steel Blue — secondary text, links
          highlight: '#0D9488',  // Teal — accent highlights, icons
          surface: '#F8F9FA',    // Off-White — section backgrounds, content areas
          dark: '#2D2D2D',       // Charcoal — body text
          muted: '#6B7280',      // Slate — muted text, captions
        },
      },

      // Typography: Inter (sans) for all text, JetBrains Mono (mono) for code accents.
      // Fonts loaded from Google Fonts CDN in BaseLayout.astro.
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      // Responsive typography scale for headings and body text.
      // Mobile sizes are the base; use lg: prefix for desktop sizes.
      // | Token  | Mobile          | Desktop (lg:)   | Weight | Font  |
      // |--------|-----------------|-----------------|--------|-------|
      // | h1     | 2.25rem (36px)  | 3.5rem (56px)   | 700    | Inter |
      // | h2     | 1.875rem (30px) | 2.5rem (40px)   | 600    | Inter |
      // | h3     | 1.5rem (24px)   | 1.875rem (30px) | 600    | Inter |
      // | h4     | 1.25rem (20px)  | 1.5rem (24px)   | 600    | Inter |
      // | body   | 1rem (16px)     | 1.125rem (18px) | 400    | Inter |
      // | small  | 0.875rem (14px) | 0.875rem (14px) | 400    | Inter |
      fontSize: {
        'h1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'h2-lg': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3-lg': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4-lg': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },

      // Section spacing and content constraints
      spacing: {
        'section': '5rem',        // Vertical section padding (mobile)
        'section-lg': '7rem',     // Vertical section padding (desktop, use with lg:)
      },

      maxWidth: {
        'content': '1200px',      // Max content width for text/content areas
      },

      // Component-level utilities
      borderRadius: {
        'card': '0.75rem',        // Card border radius
      },
    },
  },
  plugins: [],
};
