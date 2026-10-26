'use client';

import { Box, Stack, Typography } from '@mui/material';
import { APPS } from '../apps/registry';
import type { AppId } from '../apps/registry.types';
import { useTranslations } from '../i18n/I18nProvider';

export function BrandMark({ app, size = 'medium' }: { app: AppId; size?: 'medium' | 'large' }) {
  const t = useTranslations();
  const Icon = APPS[app].icon;
  const tile = size === 'large' ? 44 : 32;
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
      <Box
        sx={{
          width: tile,
          height: tile,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          flexShrink: 0,
        }}
      >
        <Icon fontSize={size === 'large' ? 'medium' : 'small'} />
      </Box>
      <Typography variant={size === 'large' ? 'h2' : 'h5'} component="span">
        {t(`app.${app}`)}
      </Typography>
    </Stack>
  );
}
