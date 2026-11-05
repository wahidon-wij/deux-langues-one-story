import { ArrowUpRight } from "lucide-react";

import type { ExperienceItem } from "@/content/content";
import { PROJECT_HASH_PREFIX, SECTION_IDS } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "./LanguageProvider";

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const { t } = useLanguage();

  return (
    <li className="grid gap-4 py-7 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-3">
        <time className="font-mono text-sm text-muted-foreground" dateTime={item.dateTime}>
          {item.period}
        </time>
      </div>
      <div className="md:col-span-9">
        <h3 className="text-xl font-semibold text-foreground">{item.role}</h3>
        <p className="mt-1 text-muted-foreground">{item.organization}</p>
        <ul className="mt-5 space-y-3">
          {item.points.map((point) => (
            <li key={point.text} className="flex gap-3 leading-relaxed text-foreground">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-primary" />
              <span>
                {point.text}
                {point.linkToFeatured ? (
                  <a
                    className="text-link ml-2 inline-flex items-center gap-1 font-medium"
                    href={`#${PROJECT_HASH_PREFIX}environnements-ephemeres`}
                  >
                    {t.experience.featuredLinkLabel}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Experience() {
  const { t } = useLanguage();

  return (
    <section
      id={SECTION_IDS.experience}
      aria-labelledby="experience-title"
      className="section-space border-t"
    >
      <div className="container-page">
        <SectionHeading id="experience-title" index="02" title={t.experience.title} />
        <ol className="divide-y border-y">
          {t.experience.items.map((item) => (
            <ExperienceEntry key={`${item.role}-${item.dateTime}`} item={item} />
          ))}
        </ol>
      </div>
    </section>
  );
}