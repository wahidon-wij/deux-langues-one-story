import { SECTION_IDS } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "./LanguageProvider";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section
      id={SECTION_IDS.skills}
      aria-labelledby="skills-title"
      className="section-space border-t"
    >
      <div className="container-page">
        <SectionHeading id="skills-title" index="03" title={t.skills.title} />
        <div className="grid gap-x-12 md:grid-cols-2">
          {t.skills.groups.map((group) => (
            <section key={group.name} aria-labelledby={`skill-group-${group.name}`} className="border-t py-6">
              <h3 id={`skill-group-${group.name}`} className="text-xl font-semibold text-foreground">
                {group.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="border px-3 py-1.5 font-mono text-sm text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}