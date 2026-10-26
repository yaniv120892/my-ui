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
import { useTranslations } from '../i18n/I18nProvider';
import { SHELL } from '../theme/createAppTheme';
import { AppSwitcher } from './AppSwitcher';
import type { AppShellProps, NavItem } from './AppShell.types';
import { BrandMark } from './BrandMark';
import { LanguageToggle } from './LanguageToggle';
import { ModeToggle } from './ModeToggle';

const BOTTOM_BAR_LIMIT = 4;
const MORE_VALUE = '__more';

export function AppShell({
  app,
  nav,
  accountLabel,
  onLogout,
  drawerActions,
  headerActions,
  children,
}: AppShellProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const current = nav.find((item) => isActive({ pathname, href: item.href }));
  const bottomItems = nav.filter((item) => item.showInBottomBar).slice(0, BOTTOM_BAR_LIMIT);
  const hasBottomBar = bottomItems.length > 0;
  const bottomBarValue = current && bottomItems.includes(current) ? current.href : MORE_VALUE;
  const closeDrawer = () => setDrawerOpen(false);

  const drawer = (
    <DrawerContent
      app={app}
      nav={nav}
      pathname={pathname}
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
          display: { xs: 'none', md: 'block' },
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
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: SHELL.drawerWidth } }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="sticky"
          sx={{
            display: { md: 'none' },
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            pt: 'env(safe-area-inset-top, 0px)',
          }}
        >
          <Toolbar sx={{ minHeight: SHELL.appBarHeight, gap: 1 }}>
            {!hasBottomBar && (
              <IconButton edge="start" onClick={() => setDrawerOpen(true)} aria-label={t('shell.openNavigation')}>
                <MenuRoundedIcon />
              </IconButton>
            )}
            <Typography variant="h5" component="h1" sx={{ color: 'text.primary', flex: 1 }} noWrap>
              {current?.label ?? t(`app.${app}`)}
            </Typography>
            {headerActions}
          </Toolbar>
        </AppBar>

        <Box
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
              display: { md: 'none' },
              position: 'sticky',
              bottom: 0,
              zIndex: (theme) => theme.zIndex.appBar,
              borderTop: 1,
              borderColor: 'divider',
              pb: 'env(safe-area-inset-bottom, 0px)',
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
                label={t('shell.more')}
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
  pathname,
  accountLabel,
  onLogout,
  drawerActions,
  onNavigate,
}: Omit<AppShellProps, 'children' | 'headerActions'> & { pathname: string; onNavigate: () => void }) {
  const t = useTranslations();
  return (
    <Stack sx={{ height: '100%', pt: 'env(safe-area-inset-top, 0px)' }}>
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <BrandMark app={app} />
      </Box>
      <List sx={{ px: 1.5, py: 0.5, flex: 1 }}>
        {nav.map((item) => {
          const selected = isActive({ pathname, href: item.href });
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={onNavigate}
                selected={selected}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: 'primary.main' },
                    '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38 }}>
                  <NavIcon item={item} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontSize: '0.9rem', fontWeight: selected ? 600 : 500 } } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <AppSwitcher current={app} />
      <Divider />
      <Stack sx={{ px: 2, py: 1.5, gap: 1, pb: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}>
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
              <Tooltip title={t('shell.logout')}>
                <IconButton size="small" onClick={() => void onLogout()} aria-label={t('shell.logout')}>
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
  if (!item.badge) {
    return <Icon fontSize="small" />;
  }
  return (
    <Badge badgeContent={item.badge} color="error" max={99}>
      <Icon fontSize="small" />
    </Badge>
  );
}

function isActive({ pathname, href }: { pathname: string; href: string }): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
