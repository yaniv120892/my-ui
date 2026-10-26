'use client';

import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useAppUrls } from '../apps/AppUrlsContext.js';
import { APP_IDS } from '../apps/appIds.js';
import { APP_ICONS } from '../apps/registry.js';
import type { AppId } from '../apps/registry.types.js';
import { useTranslations } from '../i18n/I18nProvider.js';

export function AppSwitcher({ current }: { current: AppId }) {
  const translate = useTranslations();
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
          {translate('shell.otherApps')}
        </ListSubheader>
      }
    >
      {others.map(({ id, url }) => {
        const Icon = APP_ICONS[id];
        return (
          <ListItemButton key={id} component="a" href={url}>
            <ListItemIcon>
              <Icon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary={translate(`app.${id}`)} />
          </ListItemButton>
        );
      })}
    </List>
  );
}
