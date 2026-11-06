import { createFileRoute } from "@tanstack/react-router";
import { Education } from "@/components/site/Education";
import { Experience } from "@/components/site/Experience";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LanguageProvider, useLanguage } from "@/components/site/LanguageProvider";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Contact } from "@/components/site/Contact";
import { content } from "@/content/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: content.fr.meta.title },
      { name: "description", content: content.fr.meta.description },
      { property: "og:title", content: content.fr.meta.title },
      { property: "og:description", content: content.fr.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  );
}

function Portfolio() {
  const { t } = useLanguage();

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-20 rounded-sm bg-primary px-4 py-2 font-medium text-primary-foreground focus:translate-y-0"
      >
        {t.a11y.skipToContent}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
