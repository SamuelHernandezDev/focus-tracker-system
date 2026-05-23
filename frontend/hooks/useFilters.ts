//frontend\hooks\useFilters.ts
import { useState, useEffect } from 'react';

export function useFilters<T extends object>(
  initial: T,
  storageKey: string,
  persist: boolean = true
) {
  const [filters, setFiltersState] = useState<T>(() => {
    if (typeof window === 'undefined' || !persist) {
      return initial;
    }

    try {
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        return {
          ...initial,
          ...JSON.parse(stored),
        };
      }
    } catch (err) {
      console.error('Error loading filters', err);
    }

    return initial;
  });

  useEffect(() => {
    if (!persist) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(filters));
    } catch (err) {
      console.error('Error saving filters', err);
    }
  }, [filters, storageKey, persist]);

  const setFilters = (updater: T | ((prev: T) => T)) => {
    setFiltersState((prev) =>
      typeof updater === 'function'
        ? (updater as (prev: T) => T)(prev)
        : updater
    );
  };

  const clearFilters = () => {
    setFiltersState(initial);

    if (persist) {
      try {
        localStorage.removeItem(storageKey);
      } catch (err) {
        console.error('Error clearing filters', err);
      }
    }
  };

  const clearKeys = (keys: (keyof T)[]) => {
    setFiltersState((prev) => {
      const updated = { ...prev };

      keys.forEach((k) => {
        updated[k] = initial[k];
      });

      return updated;
    });
  };

  return {
    filters,
    setFilters,
    clearFilters,
    clearKeys,
  };
}
