import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DesignProvider } from '../DesignProvider.js';
import { useFormat } from './useFormat.js';

vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh: vi.fn() }) }));

describe('useFormat', () => {
  it('prints dates in the apps’ shared time zone, whatever the runtime’s own zone is', () => {
    const { result } = renderHook(useFormat, {
      wrapper: ({ children }) => (
        <DesignProvider locale="en" messages={{}}>
          {children}
        </DesignProvider>
      ),
    });
    expect(result.current.date({ value: '2026-03-05T23:30:00Z', options: { day: 'numeric', month: 'short' } })).toBe('Mar 6');
  });
});
