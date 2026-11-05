import { SECTION_IDS } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "./LanguageProvider";

export function Education() {
  const { t } = useLanguage();

  return (
    <section
      id={SECTION_IDS.education}
      aria-labelledby="education-title"
      className="section-space border-t"
    >
      <div className="container-page">
        <SectionHeading id="education-title" index="04" title={t.education.title} />
        <ol className="divide-y border-y">
          {t.education.items.map((item) => (
            <li key={`${item.title}-${item.place}`} className="grid gap-3 py-6 sm:grid-cols-12 sm:gap-8">
              <div className="sm:col-span-3">
                <p className="eyebrow">{t.education.kinds[item.kind]}</p>
                {item.period ? (
                  <p className="mt-2 font-mono text-sm text-muted-foreground">{item.period}</p>
                ) : null}
              </div>
              <div className="sm:col-span-9">
                <h3 className="text-xl font-semibold leading-snug text-foreground">{item.title}</h3>
                <p className="mt-1 text-muted-foreground">{item.place}</p>
                {item.details ? <p className="mt-3 max-w-3xl leading-relaxed">{item.details}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}