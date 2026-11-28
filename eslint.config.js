import { defineConfig } from 'eslint/config';
import react from '@yaniv120892/dev-config/eslint/react';

export default defineConfig(react, {
  files: ['src/shell/**'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '../i18n/I18nProvider.js',
            importNames: ['useTranslations'],
            message:
              'Use useCommonTranslations(): useTranslations() without a type argument accepts any string as a key.',
          },
        ],
      },
    ],
  },
});
