import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { SECTION_IDS, site, type SectionKey } from "@/content/site";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import { LanguageToggle, ThemeToggle } from "./PreferenceToggles";

const NAV_ORDER: SectionKey[] = ["projects", "experience", "skills", "education", "contact"];

function useActiveSection(): SectionKey | null {
  const [active, setActive] = useState<SectionKey | null>(null);

  useEffect(() => {
    const elements = NAV_ORDER.map((key) => document.getElementById(SECTION_IDS[key])).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const key = NAV_ORDER.find((k) => SECTION_IDS[k] === entry.target.id);
          if (key) setActive(key);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function Header() {
  const { t } = useLanguage();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const links = NAV_ORDER.map((key) => ({ key, href: `#${SECTION_IDS[key]}`, label: t.nav[key] }));

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-foreground"
          onClick={() => setMenuOpen(false)}
        >
          {site.name}
        </a>

        <nav aria-label={t.a11y.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  aria-current={active === link.key ? "true" : undefined}
                  className={cn(
                    "relative py-2 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-foreground",
                    "aria-[current=true]:text-foreground aria-[current=true]:after:absolute aria-[current=true]:after:inset-x-0 aria-[current=true]:after:-bottom-px aria-[current=true]:after:h-0.5 aria-[current=true]:after:bg-primary",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            ref={menuButtonRef}
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t.a11y.primaryNav}
        hidden={!menuOpen}
        className="border-t bg-background lg:hidden"
      >
        <ul className="container-page py-3">
          {links.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                aria-current={active === link.key ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-border py-4 font-display text-2xl font-medium text-foreground last:border-b-0 aria-[current=true]:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
