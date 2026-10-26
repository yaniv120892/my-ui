'use client';

import { Button, Tooltip } from '@mui/material';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { useI18n, useTranslations } from '../i18n/I18nProvider.js';
import { otherLocale } from '../i18n/locale.js';

/** Labelled in the language it switches to, so it stays findable by someone who can't read the current one. */
export function LanguageToggle() {
  const translate = useTranslations();
  const { locale, setLocale } = useI18n();
  const other = otherLocale(locale);
  return (
    <Tooltip title={translate('shell.switchLanguageHint')}>
      <Button
        size="small"
        color="inherit"
        startIcon={<TranslateRoundedIcon fontSize="small" />}
        onClick={() => setLocale(other)}
        lang={other}
        sx={{ color: 'text.secondary', minWidth: 0 }}
      >
        {translate('shell.switchLanguage')}
      </Button>
    </Tooltip>
  );
}
