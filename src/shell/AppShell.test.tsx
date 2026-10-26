import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { DesignProvider } from '../DesignProvider';
import type { Locale } from '../i18n/locale.types';
import { AppShell } from './AppShell';

vi.mock('next/navigation', () => ({
  usePathname: () => '/transactions/42',
  useRouter: () => ({ refresh: vi.fn() }),
}));

afterEach(cleanup);

const APP_URLS = { expenses: 'https://expenses.example.test', shopping: 'https://shopping.example.test' };

function renderShell(locale: Locale) {
  return render(
    <DesignProvider locale={locale} messages={{}} appUrls={APP_URLS}>
      <AppShell
        app="expenses"
        nav={[
          { href: '/transactions', label: 'Transactions', icon: ReceiptLongOutlinedIcon, badge: 3, showInBottomBar: true },
          { href: '/settings', label: 'Settings', icon: SettingsOutlinedIcon },
        ]}
        accountLabel="me@example.com"
        onLogout={vi.fn()}
      >
        <p>page body</p>
      </AppShell>
    </DesignProvider>,
  );
}

describe('AppShell', () => {
  it('names the app and the shell controls in Hebrew', () => {
    renderShell('he');
    expect(screen.getAllByText('ההוצאות שלי').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: 'התנתקות' }).length).toBeGreaterThan(0);
    expect(screen.getAllByText('English').length).toBeGreaterThan(0);
  });

  it('names the app in English and offers Hebrew', () => {
    renderShell('en');
    expect(screen.getAllByText('My Expenses').length).toBeGreaterThan(0);
    expect(screen.getAllByText('עברית').length).toBeGreaterThan(0);
  });

  it('marks the nested route active and links only the other apps that have a URL', () => {
    renderShell('en');
    const active = screen.getAllByRole('link', { name: /Transactions/ });
    expect(active.some((link) => link.classList.contains('Mui-selected'))).toBe(true);
    const otherApps = screen.getAllByRole('link', { name: 'My Shopping' });
    expect(otherApps[0]?.getAttribute('href')).toBe('https://shopping.example.test');
    expect(screen.queryAllByRole('link', { name: 'My Expenses' })).toHaveLength(0);
    expect(screen.queryAllByRole('link', { name: 'My Investments' })).toHaveLength(0);
  });

  it('renders the phone bottom bar with a More entry when items opt in', () => {
    renderShell('en');
    expect(screen.getByRole('button', { name: 'More', hidden: true })).toBeTruthy();
  });
});
