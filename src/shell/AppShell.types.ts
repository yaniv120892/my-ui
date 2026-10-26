import type { SvgIconComponent } from '@mui/icons-material';
import type { AppId } from '../apps/registry.types.js';

export type NavItem = {
  href: string;
  /** Already translated. */
  label: string;
  icon: SvgIconComponent;
  badge?: number;
  /** Phone layout shows at most four of these in the bottom bar; the rest live behind "More". */
  showInBottomBar?: boolean;
};

export type AppShellProps = {
  app: AppId;
  nav: NavItem[];
  /** Shown above the drawer footer actions, e.g. the signed-in email. */
  accountLabel?: string | null;
  onLogout?: () => void | Promise<void>;
  /** Extra icon buttons in the drawer footer, beside the theme and language toggles. */
  drawerActions?: React.ReactNode;
  /** Extra controls in the phone top bar, e.g. a currency toggle. */
  headerActions?: React.ReactNode;
  children: React.ReactNode;
};
