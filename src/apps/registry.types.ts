import type { SvgIconComponent } from '@mui/icons-material';

export type AppId = 'expenses' | 'investments' | 'shopping';

export type AppEntry = {
  icon: SvgIconComponent;
  url: string;
};
