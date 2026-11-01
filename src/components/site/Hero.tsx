import { ArrowDown, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SECTION_IDS, site } from "@/content/site";
import { useLanguage } from "./LanguageProvider";

export function Hero() {
  const { t } = useLanguage();
  const [first, ...rest] = t.hero.name.split(" ");

  return (
    <section id="top" aria-labelledby="hero-title" className="scroll-mt-16">
      <div className="container-page grid items-center gap-10 pb-20 pt-10 md:grid-cols-12 md:gap-12 md:pb-28 md:pt-20">
        <div className="md:col-span-5">
          <img
            src={site.photo}
            alt={t.hero.photoAlt}
            width={800}
            height={800}
            fetchPriority="high"
            decoding="async"
            className="aspect-square w-full max-w-[18rem] rounded-md border object-cover sm:max-w-sm md:max-w-none"
          />
        </div>

        <div className="md:col-span-7">
          <h1
            id="hero-title"
            className="text-[2.75rem] font-semibold leading-[0.95] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            <span className="block">{first}</span>
            <span className="block">{rest.join(" ")}</span>
          </h1>
          <p className="mt-6 font-display text-xl font-medium text-foreground md:text-2xl">
            {t.hero.role}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t.hero.intro}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={`#${SECTION_IDS.contact}`}>
                {t.hero.contactCta}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.cv} download={site.cvDownloadName} type="application/pdf">
                <Download aria-hidden="true" />
                {t.hero.cvCta}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
