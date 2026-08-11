/**
 * Professional Light Theme for Hostel Management System
 * Design inspired by Linear, Vercel, Stripe, Notion, Clerk
 */

export const theme = {
  colors: {
    // Backgrounds
bgPrimary: '#F8FAFC',
    bgSecondary: '#F1F5F9',
    bgCard: '#FFFFFF',
    bgSidebar: '#F5F3FF',
    bgInput: '#FFFFFF',
    bgHover: 'rgba(139,92,246,0.06)',

    // Accent - Purple
    accent: '#8B5CF6',
    accentHover: '#7C3AED',
    accentGlow: 'rgba(139,92,246,0.25)',
    accentLight: 'rgba(139,92,246,0.10)',

    // Status
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',

    // Text
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',

    // Borders & Misc
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    shadow: 'rgba(0,0,0,0.06)',
    glow: 'rgba(139,92,246,0.2)',
    white: '#FFFFFF',
  },

  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
  },

  shadow: {
    card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    cardHover: '0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
    glow: '0 0 20px rgba(139,92,246,0.15)',
    glowStrong: '0 0 40px rgba(139,92,246,0.25)',
    glass: '0 8px 32px rgba(0,0,0,0.08)',
  },

  glass: {
    background: 'rgba(255,255,255,0.8)',
    border: 'rgba(255,255,255,0.18)',
    blur: 'blur(20px)',
  },

  font: {
    family: "'Inter', 'Manrope', system-ui, -apple-system, sans-serif",
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  transition: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    base: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

