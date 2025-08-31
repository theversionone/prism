// =============================================================================
// Base Types
// =============================================================================

/** Supported API service identifiers */
export type APIService = 'tavily' | 'openrouter' | 'groq' | 'langsearch';

/** Theme modes (aligns with next-themes) */
export type ThemeMode = 'light' | 'dark' | 'system';

/** Search region options */
export type SearchRegion = 'us' | 'uk' | 'ca' | 'au' | 'de' | 'fr' | 'jp' | 'global';

// =============================================================================
// Settings Types
// =============================================================================

/** API keys mapping - all optional since user may not have all services configured */
export type APIKeys = Partial<Record<APIService, string>>;

/** Search behavior configuration */
export interface SearchOptions {
  safeSearch: boolean;
  region: SearchRegion;
  maxResults: number; // Recommended: 1-50
}

/** Complete application settings */
export interface PrismSettings {
  apiKeys: APIKeys;
  theme: ThemeMode;
  searchOptions: SearchOptions;
}

/** Default settings used for initialization and reset */
export const DEFAULT_SETTINGS: PrismSettings = {
  apiKeys: {},
  theme: 'system',
  searchOptions: {
    safeSearch: true,
    region: 'global',
    maxResults: 10,
  },
} as const;

// =============================================================================
// Component Props
// =============================================================================

/** Search bar component props */
export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

/** Header component props */
export interface HeaderProps {
  className?: string;
}

// =============================================================================
// Hook Return Types
// =============================================================================

/** Return type for useSettings hook */
export interface UseSettingsReturn {
  settings: PrismSettings;
  updateSettings: (updates: Partial<PrismSettings>) => void;
  resetSettings: () => void;
}

// =============================================================================
// Utility Types
// =============================================================================

/** Deep partial type for settings updates */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};