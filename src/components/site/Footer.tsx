import { ArrowUp, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t py-7">
      <div className="container-page flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a className="text-link inline-flex items-center gap-1 text-sm" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight aria-hidden="true" className="size-3.5" />
            <span className="sr-only">{t.a11y.newTab}</span>
          </a>
          <a className="text-link inline-flex items-center gap-1 text-sm" href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" className="size-3.5" />
            <span className="sr-only">{t.a11y.newTab}</span>
          </a>
          <Button asChild size="sm" variant="ghost">
            <a href="#top">
              {t.footer.backToTop}
              <ArrowUp aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}