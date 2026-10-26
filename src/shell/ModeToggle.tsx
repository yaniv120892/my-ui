'use client';

import { IconButton, Tooltip, useColorScheme } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useTranslations } from '../i18n/I18nProvider';

export function ModeToggle() {
  const t = useTranslations();
  const { mode, systemMode, setMode } = useColorScheme();
  const isDark = (mode === 'system' ? systemMode : mode) === 'dark';
  const label = isDark ? t('shell.switchToLight') : t('shell.switchToDark');
  return (
    <Tooltip title={label}>
      <IconButton size="small" onClick={() => setMode(isDark ? 'light' : 'dark')} aria-label={label}>
        {isDark ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}
