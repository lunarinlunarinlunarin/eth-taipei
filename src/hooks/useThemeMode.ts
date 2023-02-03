import { useCallback, useEffect, useState } from "react";

import { useLocalStorage } from "./useLocalStorage";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
  isDarkMode: boolean;
  mounted: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

export function isSSR() {
  return typeof window === "undefined";
}

export function useThemeMode(defaultValue?: boolean): UseDarkModeOutput {
  const [mounted, setMounted] = useState(false);
  const getPrefersScheme = (): boolean => {
    if (!isSSR()) {
      return window.matchMedia(COLOR_SCHEME_QUERY).matches;
    }

    return !!defaultValue;
  };

  const [isDarkMode, setDarkMode] = useLocalStorage("darkMode", getPrefersScheme());

  // Update darkMode if os prefers changes
  useEffect(() => {
    const handler = () => setDarkMode(getPrefersScheme);
    const matchMedia = window.matchMedia(COLOR_SCHEME_QUERY);

    matchMedia.addEventListener("change", handler);

    return () => {
      matchMedia.removeEventListener("change", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state with browser
  useEffect(() => {
    if (!isSSR()) {
      document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  // When mounted on client, now we can show the UI, needed as useThemeMode hydrates on
  useEffect(() => setMounted(true), []);

  return {
    isDarkMode,
    mounted,
    toggle: () => setDarkMode((prev) => !prev),
    enable: useCallback(() => setDarkMode(true), []),
    disable: useCallback(() => setDarkMode(false), []),
  };
}
