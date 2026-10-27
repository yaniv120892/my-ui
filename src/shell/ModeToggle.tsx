'use client';

import { IconButton, Tooltip, useColorScheme } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useTranslations } from '../i18n/I18nProvider.js';

export function ModeToggle() {
  const translate = useTranslations();
  const { colorScheme, setMode } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const label = isDark ? translate('shell.switchToLight') : translate('shell.switchToDark');

  function toggleMode() {
    setMode(isDark ? 'light' : 'dark');
  }

  return (
    <Tooltip title={label}>
      <IconButton size="small" onClick={toggleMode} aria-label={label}>
        {isDark ? (
          <LightModeOutlinedIcon fontSize="small" />
        ) : (
          <DarkModeOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
