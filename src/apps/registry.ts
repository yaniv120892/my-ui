import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import type { AppEntry, AppId } from './registry.types';

export const APP_IDS = ['expenses', 'investments', 'shopping'] as const satisfies AppId[];

export const APPS = {
  expenses: { icon: AccountBalanceWalletRoundedIcon, url: 'https://my-expenses-website.vercel.app' },
  investments: { icon: TrendingUpRoundedIcon, url: 'https://my-investments-rose.vercel.app' },
  shopping: { icon: ShoppingCartRoundedIcon, url: 'https://yaniv-shopping.vercel.app' },
} satisfies Record<AppId, AppEntry>;
