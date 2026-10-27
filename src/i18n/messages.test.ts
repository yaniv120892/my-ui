import { describe, expect, it } from 'vitest';
import { commonMessages, formatMessage } from './messages.js';

describe('formatMessage', () => {
  it('fills placeholders', () => {
    expect(
      formatMessage({
        template: '{count} items for {name}',
        variables: { count: 3, name: 'Dana' },
      }),
    ).toBe('3 items for Dana');
  });

  it('leaves unknown placeholders visible', () => {
    expect(formatMessage({ template: 'Hi {name}', variables: {} })).toBe('Hi {name}');
  });

  it('does not fill placeholders from Object.prototype', () => {
    expect(formatMessage({ template: 'Built by {constructor}', variables: {} })).toBe(
      'Built by {constructor}',
    );
  });
});

describe('commonMessages', () => {
  it('has the same keys in every locale', () => {
    expect(Object.keys(commonMessages.he).sort()).toEqual(Object.keys(commonMessages.en).sort());
  });
});
