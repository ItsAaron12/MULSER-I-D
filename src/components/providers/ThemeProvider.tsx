"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { THEME, type ThemeName } from "@/config/preferences";
import { createPreferenceStore } from "@/lib/preference-store";

const themeStore = createPreferenceStore<ThemeName>(THEME);

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Tema claro/oscuro. El atributo data-theme lo fija un script previo al pintado
 * (ver PREFERENCES_INIT_SCRIPT); este proveedor solo lo expone y permite cambiarlo.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );
  const setTheme = useCallback((next: ThemeName) => themeStore.set(next), []);
  const toggleTheme = useCallback(
    () => themeStore.set(themeStore.getSnapshot() === "dark" ? "light" : "dark"),
    [],
  );
  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>.");
  return ctx;
}
