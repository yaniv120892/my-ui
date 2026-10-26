import { createTheme, type Theme } from '@mui/material/styles';
import type { Direction } from '../i18n/locale.types.js';
import type { ChartPalette } from './createAppTheme.types.js';

declare module '@mui/material/styles' {
  interface Palette {
    charts: ChartPalette;
  }
  interface PaletteOptions {
    charts?: ChartPalette;
  }
}

const LIGHT = {
  primary: '#7b61ff',
  secondary: '#00b8d9',
  success: '#16a34a',
  error: '#dc2626',
  warning: '#f59e0b',
  info: '#0ea5e9',
};

const DARK = {
  primary: '#9d8bff',
  secondary: '#22d3ee',
  success: '#4ade80',
  error: '#f87171',
  warning: '#fbbf24',
  info: '#38bdf8',
};

export const CHART_SERIES = [
  LIGHT.primary,
  LIGHT.secondary,
  LIGHT.warning,
  LIGHT.success,
  '#ef4444',
  '#8b5cf6',
  LIGHT.info,
  '#f97316',
];

/** Heebo covers Hebrew and Latin, so both languages share one typeface. Apps load it as --font-sans. */
export const FONT_FAMILY = 'var(--font-sans), "Heebo", system-ui, -apple-system, Arial, sans-serif';

export const SHELL = {
  drawerWidth: 248,
  contentMaxWidth: 1200,
  appBarHeight: 56,
  bottomNavHeight: 64,
  desktopBreakpoint: 'md',
} as const;

export function createAppTheme(direction: Direction): Theme {
  return createTheme({
    direction,
    cssVariables: { colorSchemeSelector: 'data' },
    colorSchemes: {
      light: {
        palette: {
          primary: { main: LIGHT.primary },
          secondary: { main: LIGHT.secondary },
          success: { main: LIGHT.success },
          error: { main: LIGHT.error },
          warning: { main: LIGHT.warning },
          info: { main: LIGHT.info },
          background: { default: '#f7f7f9', paper: '#ffffff' },
          divider: '#e7e7ec',
          text: { primary: '#17171c', secondary: '#63636e' },
          charts: { positive: LIGHT.success, negative: LIGHT.error, series: CHART_SERIES },
        },
      },
      dark: {
        palette: {
          primary: { main: DARK.primary },
          secondary: { main: DARK.secondary },
          success: { main: DARK.success },
          error: { main: DARK.error },
          warning: { main: DARK.warning },
          info: { main: DARK.info },
          background: { default: '#101216', paper: '#181b21' },
          divider: '#2a2e37',
          text: { primary: '#f0f0f4', secondary: '#a2a2ad' },
          charts: { positive: DARK.success, negative: DARK.error, series: CHART_SERIES },
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
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: `calc(2 * ${theme.vars.shape.borderRadius})`,
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: theme.vars.palette.primary.main,
              color: theme.vars.palette.primary.contrastText,
              '& .MuiListItemIcon-root': { color: theme.vars.palette.primary.contrastText },
            },
          }),
        },
      },
      MuiListItemIcon: { styleOverrides: { root: { minWidth: 38 } } },
      // MUI's 80px minimum makes five actions 400px, wider than most phones.
      MuiBottomNavigationAction: {
        styleOverrides: { root: ({ theme }) => ({ minWidth: 0, paddingInline: theme.spacing(0.5) }) },
      },
    },
  });
}
