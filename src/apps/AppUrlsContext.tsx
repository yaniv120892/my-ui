'use client';

import { createContext, useContext } from 'react';
import type { AppUrls } from './registry.types';

const AppUrlsContext = createContext<AppUrls>({});

export const AppUrlsProvider = AppUrlsContext.Provider;

export function useAppUrls(): AppUrls {
  return useContext(AppUrlsContext);
}
