import type { SvgIconComponent } from '@mui/icons-material';

export type AppId = 'expenses' | 'investments' | 'shopping';

/** Where each sibling app is deployed; supplied by the consuming app, never hard-coded here. */
export type AppUrls = Partial<Record<AppId, string>>;

export type AppEntry = {
  icon: SvgIconComponent;
};
