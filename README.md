# my-ui

Shared design for the My apps — **My Expenses**, **My Investments**, **My Shopping**, **My Parking** — so they
look and read as one product before they are merged into one.

What it gives each app:

- **Theme** — one MUI theme (palette, Heebo type, radius, component defaults), light and dark.
- **Hebrew and English** — locale from a `locale` cookie, then `Accept-Language`, default Hebrew.
  RTL/LTR flips the whole UI, including MUI's emotion styles.
- **App shell** — side drawer on desktop; top bar plus bottom bar (up to four items and "More")
  on phones. Every drawer has the brand mark, language and theme toggles, logout, and links to
  the other apps.
- **Building blocks** — `BrandMark`, `AuthCard` (login/signup pages), `PageHeader`, `useFormat`
  (locale-aware numbers, currency, dates).

## Install

```bash
npm install github:yaniv120892/my-ui#v0.2.0
```

The app also installs the packages under `peerDependencies` in `package.json`.

## Use

`src/app/layout.tsx`:

```tsx
import { Heebo } from 'next/font/google';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { DesignProvider } from '@yaniv120892/my-ui';
import { getLocale, localeDirection } from '@yaniv120892/my-ui/server';
import { messages } from '@/i18n/messages';
import { APP_URLS } from '@/config/appUrls'; // { investments: 'https://…', shopping: 'https://…' }

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-sans', display: 'swap' });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} dir={localeDirection(locale)} className={heebo.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data" />
        <DesignProvider locale={locale} messages={messages[locale]} appUrls={APP_URLS}>
          {children}
        </DesignProvider>
      </body>
    </html>
  );
}
```

`src/i18n/messages.ts` — English is the source; Hebrew must carry the same keys:

```ts
import type { Dictionary } from '@yaniv120892/my-ui';

const en = { 'nav.transactions': 'Transactions', 'tx.count': '{count} transactions' };

export const messages: Dictionary<typeof en> = {
  en,
  he: { 'nav.transactions': 'תנועות', 'tx.count': '{count} תנועות' },
};
```

`src/i18n/useT.ts`:

```ts
import { useTranslations } from '@yaniv120892/my-ui';
import type { messages } from './messages';

export const useT = () => useTranslations<(typeof messages)['en']>();
```

App layout:

```tsx
<AppShell
  app="expenses"
  nav={[{ href: '/transactions', label: t('nav.transactions'), icon: ReceiptLongOutlinedIcon, showInBottomBar: true }]}
  accountLabel={session?.email}
  onLogout={handleLogout}
>
  {children}
</AppShell>
```

### Vitest in a consuming app

The package imports `next/*` subpaths, which Node's ESM resolver cannot find because Next
publishes no exports map. Let Vite process it:

```ts
test: { server: { deps: { inline: ['@yaniv120892/my-ui'] } } }
```

`DesignProvider` and `AppShell` call `useRouter` and `usePathname`, so specs that render them mock
`next/navigation`.

## Conventions shared by every app

- Names: "My Expenses" / "ההוצאות שלי", "My Investments" / "ההשקעות שלי", "My Shopping" / "הקניות שלי", "My Parking" / "החניה שלי".
- Write layouts for LTR. Physical sides in `sx` (`ml`, `left`, `borderRight`) are flipped by the
  RTL plugin; logical ones (`marginInlineStart`) are flipped by the browser. Never hand-mirror.
- Money in / gains: `palette.charts.positive`. Money out / losses: `palette.charts.negative`.
- Format numbers, currency and dates with `useFormat()`, never `toLocaleString()` with a fixed locale.

## Release

Bump `version`, merge, tag `vX.Y.Z`, then bump the tag in each app.
