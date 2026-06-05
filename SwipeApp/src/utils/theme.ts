import { TextStyle } from 'react-native';

export const Colors = {
  bg: '#0A0A0A',
  surface: '#141414',
  surfaceElevated: '#1C1C1C',
  border: '#2A2A2A',
  borderSubtle: '#1E1E1E',
  white: '#FFFFFF',
  offWhite: '#F5F5F5',
  muted: '#8A8A8A',
  mutedSubtle: '#4A4A4A',
  accent: '#FFFFFF',
  positive: '#34C759',
  warning: '#FF9F0A',
  negative: '#FF3B30',
  swipeGold: '#C9A84C',
  cardGradientStart: '#1A1A1A',
  cardGradientEnd: '#0D0D0D',
};

type FontWeight = TextStyle['fontWeight'];

export const Fonts: Record<string, FontWeight> = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  card: 18,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
