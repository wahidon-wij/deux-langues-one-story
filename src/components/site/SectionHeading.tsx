import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  index: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ id, index, title, children }: SectionHeadingProps) {
  return (
    <div className="mb-12 grid gap-4 md:mb-16 md:grid-cols-12 md:items-end md:gap-12">
      <div className="md:col-span-7">
        <p className="eyebrow mb-3" aria-hidden="true">
          {index}
        </p>
        <h2 id={id} className="text-4xl font-semibold leading-none text-foreground md:text-6xl">
          {title}
        </h2>
      </div>
      {children ? (
        <div className="text-lg leading-relaxed text-muted-foreground md:col-span-5">{children}</div>
      ) : null}
    </div>
  );
}
