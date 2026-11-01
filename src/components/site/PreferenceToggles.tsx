import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { applyTheme, THEME_STORAGE_KEY } from "@/lib/theme";
import { useLanguage } from "./LanguageProvider";

export function LanguageToggle() {
  const { t, toggleLanguage } = useLanguage();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label={t.a11y.switchLanguage}
      lang={t.a11y.switchLanguageTargetLang}
      className="font-mono text-sm tracking-wide"
    >
      {t.a11y.switchLanguageShort}
    </Button>
  );
}

export function ThemeToggle() {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    // Follow the system preference until the visitor picks a theme.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored) return;
      applyTheme(event.matches);
      setIsDark(event.matches);
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    applyTheme(next);
    setIsDark(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Ignore: the theme still applies for this visit.
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={t.a11y.themeToggle}
      aria-pressed={isDark}
    >
      <Moon aria-hidden="true" className="dark:hidden" />
      <Sun aria-hidden="true" className="hidden dark:block" />
    </Button>
  );
}
