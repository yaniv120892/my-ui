import type { SvgIconComponent } from '@mui/icons-material';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import type { AppId } from './registry.types.js';

export const APP_ICONS: Record<AppId, SvgIconComponent> = {
  expenses: AccountBalanceWalletRoundedIcon,
  investments: TrendingUpRoundedIcon,
  shopping: ShoppingCartRoundedIcon,
  parking: LocalParkingRoundedIcon,
};
