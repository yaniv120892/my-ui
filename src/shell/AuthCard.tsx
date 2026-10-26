'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import type { AppId } from '../apps/registry.types';
import { BrandMark } from './BrandMark';
import { LanguageToggle } from './LanguageToggle';

/** The centred card every app's login, signup and verify pages sit in. */
export function AuthCard({
  app,
  title,
  subtitle,
  children,
}: {
  app: AppId;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', px: 2, py: 4 }}>
      <Stack spacing={3} sx={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>
        <BrandMark app={app} size="large" />
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={0.5} sx={{ mb: 2.5 }}>
              <Typography variant="h3" component="h1">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {subtitle}
                </Typography>
              )}
            </Stack>
            {children}
          </CardContent>
        </Card>
        <LanguageToggle />
      </Stack>
    </Box>
  );
}
