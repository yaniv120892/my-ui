'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useTranslations } from '../i18n/I18nProvider.js';
import { SHELL } from '../theme/createAppTheme.js';
import { AppSwitcher } from './AppSwitcher.js';
import type { AppShellProps, NavItem } from './AppShell.types.js';
import { BrandMark } from './BrandMark.js';
import { LanguageToggle } from './LanguageToggle.js';
import { ModeToggle } from './ModeToggle.js';

type DrawerContentProps = Omit<AppShellProps, 'children' | 'headerActions'> & {
  currentHref: string | undefined;
  onNavigate: () => void;
};

const BOTTOM_BAR_LIMIT = 4;
const MORE_VALUE = '__more';
const SAFE_AREA_TOP = 'env(safe-area-inset-top, 0px)';
const SAFE_AREA_BOTTOM = 'env(safe-area-inset-bottom, 0px)';
const DESKTOP = SHELL.desktopBreakpoint;

export function AppShell({
  app,
  nav,
  accountLabel,
  onLogout,
  drawerActions,
  headerActions,
  children,
}: AppShellProps) {
  const translate = useTranslations();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const current = mostSpecificActiveItem({ nav, pathname });
  const bottomItems = nav.filter((item) => item.showInBottomBar).slice(0, BOTTOM_BAR_LIMIT);
  const hasBottomBar = bottomItems.length > 0;
  const bottomBarValue = bottomBarSelection({ current, bottomItems });
  const closeDrawer = () => setDrawerOpen(false);

  const drawer = (
    <DrawerContent
      app={app}
      nav={nav}
      currentHref={current?.href}
      accountLabel={accountLabel}
      onLogout={onLogout}
      drawerActions={drawerActions}
      onNavigate={closeDrawer}
    />
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', [DESKTOP]: 'block' },
          width: SHELL.drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SHELL.drawerWidth,
            boxSizing: 'border-box',
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', [DESKTOP]: 'none' },
          '& .MuiDrawer-paper': { width: SHELL.drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="sticky"
          sx={{
            display: { [DESKTOP]: 'none' },
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            pt: SAFE_AREA_TOP,
          }}
        >
          <Toolbar sx={{ minHeight: SHELL.appBarHeight, gap: 1 }}>
            {!hasBottomBar && (
              <IconButton
                edge="start"
                onClick={() => setDrawerOpen(true)}
                aria-label={translate('shell.openNavigation')}
              >
                <MenuRoundedIcon />
              </IconButton>
            )}
            <Typography variant="h5" component="h1" sx={{ color: 'text.primary', flex: 1 }} noWrap>
              {current?.label ?? translate(`app.${app}`)}
            </Typography>
            {headerActions}
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: SHELL.contentMaxWidth,
            mx: 'auto',
            px: { xs: 2, sm: 3 },
            py: { xs: 2, md: 3 },
          }}
        >
          {children}
        </Box>

        {hasBottomBar && (
          <Paper
            component="nav"
            square
            sx={{
              display: { [DESKTOP]: 'none' },
              position: 'sticky',
              bottom: 0,
              zIndex: (theme) => theme.zIndex.appBar,
              borderTop: 1,
              borderColor: 'divider',
              pb: SAFE_AREA_BOTTOM,
            }}
          >
            <BottomNavigation
              showLabels
              value={bottomBarValue}
              sx={{ height: SHELL.bottomNavHeight, bgcolor: 'transparent' }}
            >
              {bottomItems.map((item) => (
                <BottomNavigationAction
                  key={item.href}
                  value={item.href}
                  label={item.label}
                  icon={<NavIcon item={item} />}
                  component={Link}
                  href={item.href}
                />
              ))}
              <BottomNavigationAction
                value={MORE_VALUE}
                label={translate('shell.more')}
                icon={<MenuRoundedIcon />}
                onClick={() => setDrawerOpen(true)}
              />
            </BottomNavigation>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

function DrawerContent({
  app,
  nav,
  currentHref,
  accountLabel,
  onLogout,
  drawerActions,
  onNavigate,
}: DrawerContentProps) {
  const translate = useTranslations();
  return (
    <Stack sx={{ height: '100%', pt: SAFE_AREA_TOP }}>
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <BrandMark app={app} />
      </Box>
      <List sx={{ px: 1.5, py: 0.5, flex: 1 }}>
        {nav.map((item) => {
          const selected = item.href === currentHref;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={onNavigate}
                selected={selected}
                sx={{ py: 1 }}
              >
                <ListItemIcon>
                  <NavIcon item={item} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: { sx: { fontSize: '0.9rem', fontWeight: selected ? 600 : 500 } },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <AppSwitcher current={app} />
      <Divider />
      <Stack sx={{ px: 2, py: 1.5, gap: 1, pb: `calc(12px + ${SAFE_AREA_BOTTOM})` }}>
        {accountLabel && (
          <Typography variant="body2" noWrap title={accountLabel} sx={{ color: 'text.secondary' }}>
            {accountLabel}
          </Typography>
        )}
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <LanguageToggle />
          <Stack direction="row" spacing={0.5}>
            {drawerActions}
            <ModeToggle />
            {onLogout && (
              <Tooltip title={translate('shell.logout')}>
                <IconButton
                  size="small"
                  onClick={() => void onLogout()}
                  aria-label={translate('shell.logout')}
                >
                  <LogoutRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function NavIcon({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <Badge badgeContent={item.badge} color="error" max={99}>
      <Icon fontSize="small" />
    </Badge>
  );
}

function mostSpecificActiveItem({
  nav,
  pathname,
}: {
  nav: NavItem[];
  pathname: string;
}): NavItem | undefined {
  const matches = nav.filter(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return matches.sort((a, b) => b.href.length - a.href.length)[0];
}

/** "More" is selected only for a known page that lives behind it, not for a route outside nav. */
function bottomBarSelection({
  current,
  bottomItems,
}: {
  current: NavItem | undefined;
  bottomItems: NavItem[];
}) {
  if (!current) {
    return null;
  }
  return bottomItems.includes(current) ? current.href : MORE_VALUE;
}
