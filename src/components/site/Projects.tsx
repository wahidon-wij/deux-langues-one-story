import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Project } from "@/content/content";
import { PROJECT_HASH_PREFIX, SECTION_IDS } from "@/content/site";
import { useLanguage } from "./LanguageProvider";
import { ProjectVisual } from "./ProjectVisual";
import { SectionHeading } from "./SectionHeading";

const detailId = (slug: string) => `${PROJECT_HASH_PREFIX}${slug}`;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Projects() {
  const { t } = useLanguage();
  const items = t.projects.items;
  const [featured, ...others] = items;

  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [revealRequest, setRevealRequest] = useState(0);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const detailHeading = useRef<HTMLHeadingElement>(null);

  const open = useCallback((slug: string) => {
    setOpenSlug(slug);
    setRevealRequest((n) => n + 1);
    window.history.replaceState(null, "", `#${detailId(slug)}`);
  }, []);

  const close = useCallback(() => {
    const slug = openSlug;
    setOpenSlug(null);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    if (slug) triggers.current.get(slug)?.focus();
  }, [openSlug]);

  // Scroll the detail section into view and move focus to its heading.
  useEffect(() => {
    if (!openSlug || revealRequest === 0) return;
    const section = document.getElementById(detailId(openSlug));
    section?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    detailHeading.current?.focus({ preventScroll: true });
  }, [openSlug, revealRequest]);

  // Open a project from the URL hash (#projet-<slug>), e.g. links from Experience.
  useEffect(() => {
    const fromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash.startsWith(PROJECT_HASH_PREFIX)) return;
      const slug = hash.slice(PROJECT_HASH_PREFIX.length);
      if (items.some((p) => p.slug === slug)) {
        setOpenSlug(slug);
        setRevealRequest((n) => n + 1);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // Slugs are language-neutral, so this only needs to run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerTrigger = (slug: string) => (el: HTMLButtonElement | null) => {
    if (el) triggers.current.set(slug, el);
    else triggers.current.delete(slug);
  };

  const openProject = items.find((p) => p.slug === openSlug) ?? null;

  const viewButton = (project: Project) => {
    const isOpen = openSlug === project.slug;
    return (
      <Button
        ref={registerTrigger(project.slug)}
        type="button"
        variant={isOpen ? "outline" : "default"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? detailId(project.slug) : undefined}
        onClick={() => (isOpen ? close() : open(project.slug))}
      >
        {t.projects.view}
        <ArrowRight aria-hidden="true" />
        <span className="sr-only">: {project.shortTitle}</span>
      </Button>
    );
  };

  if (!featured) return null;

  return (
    <section
      id={SECTION_IDS.projects}
      aria-labelledby="projects-title"
      className="section-space border-t"
    >
      <div className="container-page">
        <SectionHeading id="projects-title" index="01" title={t.projects.title}>
          <p>{t.projects.intro}</p>
        </SectionHeading>

        {/* Featured project, full width */}
        <article
          aria-labelledby={`card-${featured.slug}`}
          className="grid overflow-hidden rounded-md border transition-colors hover:border-border-strong lg:grid-cols-12"
        >
          <ProjectVisual
            visual={featured.visual}
            labels={t.diagrams}
            alt={featured.visualAlt}
            className="aspect-[16/10] border-b lg:col-span-7 lg:aspect-auto lg:min-h-[26rem] lg:border-b-0 lg:border-r"
          />
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <p className="eyebrow text-primary">{t.projects.featuredLabel}</p>
            <h3
              id={`card-${featured.slug}`}
              className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl"
            >
              {featured.shortTitle}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{featured.summary}</p>
            <div className="mt-8">{viewButton(featured)}</div>
          </div>
        </article>

        {/* Three project cards */}
        <ul className="mt-6 grid gap-6 lg:grid-cols-3">
          {others.map((project) => (
            <li key={project.slug}>
              <article
                aria-labelledby={`card-${project.slug}`}
                className="grid h-full overflow-hidden rounded-md border transition-colors hover:border-border-strong md:grid-cols-2 lg:flex lg:flex-col"
              >
                <ProjectVisual
                  visual={project.visual}
                  labels={t.diagrams}
                  alt={project.visualAlt}
                  className="aspect-[16/10] border-b md:aspect-auto md:border-b-0 md:border-r lg:aspect-[16/10] lg:border-b lg:border-r-0"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3
                    id={`card-${project.slug}`}
                    className="text-2xl font-semibold leading-tight text-foreground"
                  >
                    {project.shortTitle}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-6">{viewButton(project)}</div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Detail section, on the same page */}
        {openProject ? (
          <section
            key={openProject.slug}
            id={detailId(openProject.slug)}
            aria-labelledby="project-detail-title"
            className="mt-6 scroll-mt-24 rounded-md border border-border-strong"
          >
            <div className="flex items-start justify-between gap-4 border-b p-6 sm:p-8">
              <div>
                <p className="eyebrow">{t.projects.detailLabel}</p>
                <h3
                  id="project-detail-title"
                  ref={detailHeading}
                  tabIndex={-1}
                  className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-foreground outline-none md:text-4xl"
                >
                  {openProject.title}
                </h3>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={close}
                aria-label={`${t.projects.close} : ${openProject.shortTitle}`}
              >
                <X aria-hidden="true" />
              </Button>
            </div>

            <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-12">
              <div className="space-y-8 lg:col-span-8">
                {openProject.context ? (
                  <div>
                    <h4 className="eyebrow">{t.projects.contextLabel}</h4>
                    <p className="mt-3 text-lg leading-relaxed text-foreground">
                      {openProject.context}
                    </p>
                  </div>
                ) : null}

                {openProject.achievements?.length ? (
                  <div>
                    <h4 className="eyebrow">{t.projects.achievementsLabel}</h4>
                    <ul className="mt-3 space-y-3">
                      {openProject.achievements.map((item) => (
                        <li key={item} className="flex gap-3 text-lg leading-relaxed text-foreground">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {openProject.result ? (
                  <div>
                    <h4 className="eyebrow">{t.projects.resultLabel}</h4>
                    {/* [À VALIDER : chiffre cible, à remplacer par une mesure réelle ou à retirer] */}
                    <p className="mt-3 font-display text-2xl font-medium text-foreground">
                      {openProject.result}
                    </p>
                  </div>
                ) : null}
              </div>

              <aside className="space-y-8 lg:col-span-4 lg:border-l lg:pl-10">
                <div>
                  <h4 className="eyebrow">{t.projects.stackLabel}</h4>
                  <ul className="mt-3 space-y-1.5 font-mono text-[0.95rem] text-foreground">
                    {openProject.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>

                {openProject.repository ? (
                  <a
                    href={openProject.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link inline-flex items-center gap-1.5 font-medium"
                  >
                    {t.projects.repositoryLabel}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only">{t.a11y.newTab}</span>
                  </a>
                ) : null}

                <Button type="button" variant="outline" onClick={close}>
                  <X aria-hidden="true" />
                  {t.projects.close}
                </Button>
              </aside>
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
