'use client';

import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useAppUrls } from '../apps/AppUrlsContext';
import { APP_IDS, APPS } from '../apps/registry';
import type { AppId } from '../apps/registry.types';
import { useTranslations } from '../i18n/I18nProvider';

export function AppSwitcher({ current }: { current: AppId }) {
  const t = useTranslations();
  const appUrls = useAppUrls();
  const others = APP_IDS.flatMap((id) => {
    const url = appUrls[id];
    return id !== current && url ? [{ id, url }] : [];
  });
  if (others.length === 0) {
    return null;
  }
  return (
    <List
      dense
      sx={{ px: 1.5 }}
      subheader={
        <ListSubheader disableSticky sx={{ bgcolor: 'transparent', lineHeight: 2.5 }}>
          {t('shell.otherApps')}
        </ListSubheader>
      }
    >
      {others.map(({ id, url }) => {
        const Icon = APPS[id].icon;
        return (
          <ListItemButton key={id} component="a" href={url} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 38 }}>
              <Icon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary={t(`app.${id}`)} />
          </ListItemButton>
        );
      })}
    </List>
  );
}
