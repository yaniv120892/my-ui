'use client';

import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { APP_IDS, APPS } from '../apps/registry';
import type { AppId } from '../apps/registry.types';
import { useTranslations } from '../i18n/I18nProvider';

export function AppSwitcher({ current }: { current: AppId }) {
  const t = useTranslations();
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
      {APP_IDS.filter((id) => id !== current).map((id) => {
        const Icon = APPS[id].icon;
        return (
          <ListItemButton key={id} component="a" href={APPS[id].url} sx={{ borderRadius: 2 }}>
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
