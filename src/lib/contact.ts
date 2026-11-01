import { site } from "@/content/site";

/**
 * Contact form rules. The form never submits to a server: it builds a
 * mailto: link that opens the visitor's own mail client, pre-filled.
 */

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 1500,
} as const;

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrorCode =
  | "nameRequired"
  | "nameTooLong"
  | "emailRequired"
  | "emailInvalid"
  | "messageRequired"
  | "messageTooLong";

export type ContactErrors = Partial<Record<keyof ContactValues, ContactErrorCode>>;

// Pragmatic check: one "@", no spaces, a dot in the domain, no leading/trailing dot.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length <= CONTACT_LIMITS.email && EMAIL_PATTERN.test(email);
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "nameRequired";
  else if (name.length > CONTACT_LIMITS.name) errors.name = "nameTooLong";

  if (!email) errors.email = "emailRequired";
  else if (!isValidEmail(email)) errors.email = "emailInvalid";

  if (!message) errors.message = "messageRequired";
  else if (message.length > CONTACT_LIMITS.message) errors.message = "messageTooLong";

  return errors;
}

export interface MailLabels {
  subject: string;
  nameLine: string;
  emailLine: string;
}

/** Builds the mailto: URL with name, email and message pre-filled. */
export function buildMailto(values: ContactValues, labels: MailLabels): string {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim().replace(/\r?\n/g, "\r\n");

  const subject = `${labels.subject} — ${name}`;
  const body = [
    message,
    "",
    "—",
    `${labels.nameLine} ${name}`,
    `${labels.emailLine} ${email}`,
  ].join("\r\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
