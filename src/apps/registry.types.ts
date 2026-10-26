import type { APP_IDS } from './appIds.js';

export type AppId = (typeof APP_IDS)[number];

/** Where each sibling app is deployed; supplied by the consuming app, never hard-coded here. */
export type AppUrls = Partial<Record<AppId, string>>;
