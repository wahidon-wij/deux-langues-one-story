import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SECTION_IDS, site } from "@/content/site";
import {
  buildMailto,
  CONTACT_LIMITS,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";
import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "./LanguageProvider";

const EMPTY_VALUES: ContactValues = { name: "", email: "", message: "" };

export function Contact() {
  const { t } = useLanguage();
  const id = useId();
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [opened, setOpened] = useState(false);

  const update = (field: keyof ContactValues, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    setOpened(false);
    if (attempted) setErrors(validateContact(next));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setOpened(true);
    window.location.assign(buildMailto(values, t.contact.mail));
  };

  const messageFor = (field: keyof ContactValues) => {
    const code = errors[field];
    return code ? t.contact.errors[code] : undefined;
  };

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby="contact-title"
      className="section-space border-t"
    >
      <div className="container-page">
        <SectionHeading id="contact-title" index="05" title={t.contact.title} />
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="max-w-md text-xl leading-relaxed text-foreground">{t.contact.sentence}</p>
            <div className="mt-8 border-t pt-5">
              <h3 className="eyebrow">{t.contact.linksTitle}</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a className="text-link inline-flex items-center gap-1.5" href={`mailto:${site.email}`}>
                    {site.email}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </li>
                <li>
                  <a className="text-link inline-flex items-center gap-1.5" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                    {t.contact.linkedinLinkLabel}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only">{t.a11y.newTab}</span>
                  </a>
                </li>
                <li>
                  <a className="text-link inline-flex items-center gap-1.5" href={site.github} target="_blank" rel="noopener noreferrer">
                    {t.contact.githubLinkLabel}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only">{t.a11y.newTab}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form noValidate onSubmit={submit} className="space-y-5 md:col-span-7">
            <h3 className="text-2xl font-semibold text-foreground">{t.contact.formTitle}</h3>
            <p className="text-sm text-muted-foreground">{t.contact.requiredHint}</p>

            {attempted && Object.keys(errors).length > 0 ? (
              <p role="alert" className="border-l-2 border-primary pl-3 text-sm text-foreground">
                {t.contact.errorSummary}
              </p>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>{t.contact.nameLabel}</Label>
                <Input
                  id={`${id}-name`}
                  autoComplete="name"
                  maxLength={CONTACT_LIMITS.name}
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${id}-name-error` : undefined}
                  required
                />
                {messageFor("name") ? <p id={`${id}-name-error`} className="text-sm text-primary">{messageFor("name")}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>{t.contact.emailLabel}</Label>
                <Input
                  id={`${id}-email`}
                  type="email"
                  autoComplete="email"
                  maxLength={CONTACT_LIMITS.email}
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${id}-email-error` : undefined}
                  required
                />
                {messageFor("email") ? <p id={`${id}-email-error`} className="text-sm text-primary">{messageFor("email")}</p> : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-message`}>{t.contact.messageLabel}</Label>
              <Textarea
                id={`${id}-message`}
                maxLength={CONTACT_LIMITS.message}
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${id}-message-error` : `${id}-message-count`}
                required
              />
              {messageFor("message") ? (
                <p id={`${id}-message-error`} className="text-sm text-primary">{messageFor("message")}</p>
              ) : (
                <p id={`${id}-message-count`} className="text-right text-xs text-muted-foreground" aria-live="polite">
                  {values.message.length} / {CONTACT_LIMITS.message} {t.contact.characters}
                </p>
              )}
            </div>

            <Button type="submit" size="lg">
              {t.contact.submit}
              <ArrowUpRight aria-hidden="true" />
            </Button>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.contact.privacyNote}</p>
            {opened ? (
              <p role="status" className="text-sm text-muted-foreground">
                {t.contact.opened} <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}