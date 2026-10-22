import { Platform } from 'react-native';
import { rf, rh, rw } from './responsive';

export const COLORS = {
  primary: '#2563EB',         // Modern vibrant blue (marty brand color)
  primaryDark: '#1D4ED8',
  primaryLight: '#EFF6FF',
  primaryGradientStart: '#2563EB',
  primaryGradientEnd: '#1E40AF',

  // Secondary & Accents
  accent: '#F97316',
  accentLight: '#FFF7ED',
  heart: '#EF4444',           // Red for favorites
  star: '#F59E0B',            // Yellow/amber for rating
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Neutrals & Backgrounds
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  secondaryBackground: '#F8FAFC',
  inputBackground: '#F8FAFC',
  border: '#E2E8F0',
  borderFocused: '#2563EB',
  divider: '#F1F5F9',

  // Typography
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textWhite: '#FFFFFF',

  // Badges & Pills
  pillInactiveBg: '#F1F5F9',
  pillInactiveText: '#475569',
  pillActiveBg: '#0F172A',
  pillActiveText: '#FFFFFF',

  // Shadows
  shadowColor: '#0F172A',
  overlay: 'rgba(15, 23, 42, 0.4)',
};

export const FONTS = {
  regular: Platform.select({ ios: 'System', android: 'Roboto' }),
  medium: Platform.select({ ios: 'System', android: 'Roboto' }),
  bold: Platform.select({ ios: 'System', android: 'Roboto' }),
};

export const SIZES = {
  // Global sizes
  base: 8,
  fontXs: rf(1.4),
  fontSm: rf(1.7),
  fontMd: rf(2.0),
  fontLg: rf(2.4),
  fontXl: rf(2.8),
  fontTitle: rf(3.2),

  // Spacing
  paddingSm: rw(2),
  paddingMd: rw(4),
  paddingLg: rw(5),
  paddingXl: rw(6),

  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusFull: 999,
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  floating: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
};
