'use client';

import { Box, Stack, Typography } from '@mui/material';
import { APP_ICONS } from '../apps/registry.js';
import type { AppId } from '../apps/registry.types.js';
import { useTranslations } from '../i18n/I18nProvider.js';

const SIZES = {
  medium: { tile: 32, icon: 'small', variant: 'h5' },
  large: { tile: 44, icon: 'medium', variant: 'h2' },
} as const;

export function BrandMark({ app, size = 'medium' }: { app: AppId; size?: keyof typeof SIZES }) {
  const translate = useTranslations();
  const Icon = APP_ICONS[app];
  const { tile, icon, variant } = SIZES[size];
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
        <Icon fontSize={icon} />
      </Box>
      <Typography variant={variant} component="span">
        {translate(`app.${app}`)}
      </Typography>
    </Stack>
  );
}
