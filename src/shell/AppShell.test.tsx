import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { DesignProvider } from '../DesignProvider.js';
import type { Locale } from '../i18n/locale.types.js';
import { AppShell } from './AppShell.js';

const navigation = vi.hoisted(() => ({ pathname: '/transactions/42', refresh: () => {} }));

vi.mock('next/navigation', () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ refresh: navigation.refresh }),
}));

beforeEach(() => {
  navigation.pathname = '/transactions/42';
  navigation.refresh = vi.fn();
  document.cookie = 'locale=; max-age=0; path=/';
});

afterEach(cleanup);

const APP_URLS = {
  expenses: 'https://expenses.example.test',
  shopping: 'https://shopping.example.test',
  parking: 'https://parking.example.test',
};

function renderShell(locale: Locale) {
  return render(
    <DesignProvider locale={locale} messages={{}} appUrls={APP_URLS}>
      <AppShell
        app="expenses"
        nav={[
          {
            href: '/transactions',
            label: 'Transactions',
            icon: ReceiptLongOutlinedIcon,
            badge: 3,
            showInBottomBar: true,
          },
          { href: '/settings', label: 'Settings', icon: SettingsOutlinedIcon },
          { href: '/settings/profile', label: 'Profile', icon: SettingsOutlinedIcon },
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
    const parking = screen.getAllByRole('link', { name: 'My Parking' });
    expect(parking[0]?.getAttribute('href')).toBe('https://parking.example.test');
    expect(screen.queryAllByRole('link', { name: 'My Expenses' })).toHaveLength(0);
    expect(screen.queryAllByRole('link', { name: 'My Investments' })).toHaveLength(0);
  });

  it('renders the phone bottom bar with a More entry when items opt in', () => {
    renderShell('en');
    expect(screen.getByRole('button', { name: 'More', hidden: true })).toBeTruthy();
  });

  it('selects only the most specific nav entry for a nested route', () => {
    navigation.pathname = '/settings/profile';
    renderShell('en');
    const selectedLabels = screen
      .getAllByRole('link', { hidden: true })
      .filter((link) => link.classList.contains('Mui-selected'))
      .map((link) => link.textContent);
    expect(new Set(selectedLabels)).toEqual(new Set(['Profile']));
    expect(screen.getByRole('heading', { level: 1, hidden: true }).textContent).toBe('Profile');
  });

  it('selects More for a page behind it, and nothing for a route outside nav', () => {
    navigation.pathname = '/settings';
    renderShell('en');
    expect(screen.getByRole('button', { name: 'More', hidden: true }).classList).toContain(
      'Mui-selected',
    );
    cleanup();

    navigation.pathname = '/onboarding';
    renderShell('en');
    expect(screen.getByRole('button', { name: 'More', hidden: true }).classList).not.toContain(
      'Mui-selected',
    );
  });

  it("lets five bottom-bar actions fit a phone by dropping MUI's 80px minimum", () => {
    renderShell('en');
    const more = screen.getByRole('button', { name: 'More', hidden: true });
    expect(Number.parseFloat(getComputedStyle(more).minWidth)).toBe(0);
  });

  it('keeps the chrome outside the main landmark', () => {
    renderShell('en');
    const main = screen.getByRole('main');
    expect(main.textContent).toBe('page body');
  });

  it('stores the chosen language in the locale cookie and refreshes the server render', () => {
    renderShell('he');
    fireEvent.click(screen.getAllByText('English')[0]!);
    expect(document.cookie).toContain('locale=en');
    expect(navigation.refresh).toHaveBeenCalledOnce();
  });
});
