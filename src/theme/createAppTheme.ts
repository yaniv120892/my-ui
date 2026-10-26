import { createTheme, type Theme } from '@mui/material/styles';
import type { Direction } from '../i18n/locale.types';
import type { ChartPalette } from './createAppTheme.types';

declare module '@mui/material/styles' {
  interface Palette {
    charts: ChartPalette;
  }
  interface PaletteOptions {
    charts?: ChartPalette;
  }
}

export const CHART_SERIES = [
  '#7b61ff',
  '#00b8d9',
  '#f59e0b',
  '#16a34a',
  '#ef4444',
  '#8b5cf6',
  '#0ea5e9',
  '#f97316',
];

/** Heebo covers Hebrew and Latin, so both languages share one typeface. Apps load it as --font-sans. */
export const FONT_FAMILY = 'var(--font-sans), "Heebo", system-ui, -apple-system, Arial, sans-serif';

export const SHELL = {
  drawerWidth: 248,
  contentMaxWidth: 1200,
  appBarHeight: 56,
  bottomNavHeight: 64,
} as const;

export function createAppTheme(direction: Direction = 'rtl'): Theme {
  return createTheme({
    direction,
    cssVariables: { colorSchemeSelector: 'data' },
    colorSchemes: {
      light: {
        palette: {
          primary: { main: '#7b61ff' },
          secondary: { main: '#00b8d9' },
          success: { main: '#16a34a' },
          error: { main: '#dc2626' },
          warning: { main: '#f59e0b' },
          info: { main: '#0ea5e9' },
          background: { default: '#f7f7f9', paper: '#ffffff' },
          divider: '#e7e7ec',
          text: { primary: '#17171c', secondary: '#63636e' },
          charts: { positive: '#16a34a', negative: '#dc2626', series: CHART_SERIES },
        },
      },
      dark: {
        palette: {
          primary: { main: '#9d8bff' },
          secondary: { main: '#22d3ee' },
          success: { main: '#4ade80' },
          error: { main: '#f87171' },
          warning: { main: '#fbbf24' },
          info: { main: '#38bdf8' },
          background: { default: '#101216', paper: '#181b21' },
          divider: '#2a2e37',
          text: { primary: '#f0f0f4', secondary: '#a2a2ad' },
          charts: { positive: '#4ade80', negative: '#f87171', series: CHART_SERIES },
        },
      },
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: FONT_FAMILY,
      h1: { fontSize: '2rem', fontWeight: 700 },
      h2: { fontSize: '1.5rem', fontWeight: 700 },
      h3: { fontSize: '1.25rem', fontWeight: 600 },
      h4: { fontSize: '1.125rem', fontWeight: 600 },
      h5: { fontSize: '1rem', fontWeight: 600 },
      h6: { fontSize: '0.9375rem', fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { WebkitFontSmoothing: 'antialiased' },
          '*': { WebkitTapHighlightColor: 'transparent' },
        },
      },
      MuiPaper: { defaultProps: { elevation: 0 } },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({ border: `1px solid ${theme.vars.palette.divider}` }),
        },
      },
      MuiButton: { defaultProps: { disableElevation: true } },
      MuiAppBar: { defaultProps: { elevation: 0, color: 'transparent' } },
      MuiTextField: { defaultProps: { size: 'small' } },
      MuiTooltip: { defaultProps: { arrow: true } },
    },
  });
}
