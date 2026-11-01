import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { content, type Content } from "@/content/content";
import type { Lang } from "@/content/site";
import { LANG_STORAGE_KEY } from "@/lib/theme";

interface LanguageContextValue {
  lang: Lang;
  t: Content;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // French is the default; a stored choice is applied after hydration.
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === "en" || stored === "fr") setLang(stored);
    } catch {
      // Storage unavailable (private mode): keep the default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", content[lang].meta.description);
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((previous) => {
      const next: Lang = previous === "fr" ? "en" : "fr";
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // Ignore: the toggle still works for this visit.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ lang, t: content[lang], toggleLanguage }), [lang, toggleLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return value;
}
