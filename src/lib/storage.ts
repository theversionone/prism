import { PrismSettings, DEFAULT_SETTINGS } from './types';

const STORAGE_KEY = 'prism-settings';

/**
 * Get settings from localStorage with fallback to defaults
 */
export function getSettings(): PrismSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    
    const parsed = JSON.parse(stored);
    // Merge with defaults to ensure all properties exist
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: PrismSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings:', error);
  }
}

/**
 * Clear settings from localStorage
 */
export function clearSettings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear settings:', error);
  }
}