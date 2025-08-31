'use client';

import { useState, useEffect } from 'react';
import { PrismSettings, DEFAULT_SETTINGS, UseSettingsReturn } from '@/lib/types';
import { getSettings, saveSettings, clearSettings } from '@/lib/storage';

/**
 * Hook for managing Prism application settings with localStorage persistence
 */
export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<PrismSettings>(() => {
    // Try to load from localStorage on initialization
    if (typeof window !== 'undefined') {
      return getSettings();
    }
    return DEFAULT_SETTINGS;
  });

  // Auto-save settings whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveSettings(settings);
    }
  }, [settings]);

  /**
   * Update settings (supports partial updates)
   */
  const updateSettings = (updates: Partial<PrismSettings>) => {
    setSettings(current => ({ ...current, ...updates }));
  };

  /**
   * Reset settings to defaults
   */
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    clearSettings();
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}