"use client";

import { ArrowUpRight } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { t, type Locale } from "@/lib/i18n";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const fieldControlClass = "w-full rounded-control border border-[#424242] bg-transparent px-4 text-white outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#b7b7bd] focus:border-[#737373] focus:shadow-[0_0_0_3px_rgb(255_255_255/8%)] aria-invalid:border-error aria-invalid:shadow-[0_0_0_1px_var(--error)] motion-reduce:transition-none";

export function ContactForm({ locale }: { locale: Locale }) {
  const [errors, setErrors] = useState<Errors>({});
  const [emailOpened, setEmailOpened] = useState(false);
  const copy = {
    name: t(locale, "contact.formName"),
    email: t(locale, "contact.formEmail"),
    message: t(locale, "contact.formMessage"),
    placeholder: t(locale, "contact.formPlaceholder"),
    submit: t(locale, "contact.formSubmit"),
    required: t(locale, "contact.formRequired"),
    emailError: t(locale, "contact.formEmailError"),
    messageError: t(locale, "contact.formMessageError"),
    note: t(locale, "contact.formNote"),
    opened: t(locale, "contact.formOpened"),
    subject: t(locale, "contact.formSubject"),
    bodyName: t(locale, "contact.formBodyName"),
    bodyEmail: t(locale, "contact.formBodyEmail"),
    bodyMessage: t(locale, "contact.formBodyMessage"),
  };

  function clearError(field: FieldName) {
    setErrors((current) => current[field] ? { ...current, [field]: undefined } : current);
    setEmailOpened(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const nextErrors: Errors = {};

    if (!name) nextErrors.name = copy.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.emailError;
    if (message.length < 20) nextErrors.message = copy.messageError;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalidField = Object.keys(nextErrors)[0] as FieldName;
      (form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus();
      return;
    }

    const subject = `${copy.subject} — ${name}`;
    const body = [
      `${copy.bodyName}: ${name}`,
      `${copy.bodyEmail}: ${email}`,
      "",
      `${copy.bodyMessage}:`,
      message,
    ].join("\n");

    setEmailOpened(true);
    window.location.assign(`mailto:hello@webpilot.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  return (
    <form className="grid gap-6" noValidate onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
        <Field id="contact-name" label={copy.name} error={errors.name}>
          <input
            id="contact-name"
            className={`min-h-14 ${fieldControlClass}`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={() => clearError("name")}
          />
        </Field>
        <Field id="contact-email" label={copy.email} error={errors.email}>
          <input
            id="contact-email"
            className={`min-h-14 ${fieldControlClass}`}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={() => clearError("email")}
          />
        </Field>
      </div>

      <Field id="contact-message" label={copy.message} error={errors.message}>
        <textarea
          id="contact-message"
          className={`min-h-44 resize-y p-4 ${fieldControlClass}`}
          name="message"
          autoComplete="off"
          placeholder={copy.placeholder}
          minLength={20}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-form-note"}
          onChange={() => clearError("message")}
        />
      </Field>

      <button
        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-pill bg-white px-6 text-control text-ink transition-[background-color,scale] duration-150 hover:bg-[#e5e5e5] active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:active:scale-100 max-[600px]:w-full"
        type="submit"
      >
        {copy.submit}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </button>

      <p id="contact-form-note" className="m-0 text-center text-small text-[#b7b7bd]" role="status" aria-live="polite">
        {emailOpened ? copy.opened : copy.note}
      </p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <label className={`text-small font-medium ${error ? "text-error" : "text-white"}`} htmlFor={id}>{label}</label>
      {children}
      {error ? <span id={`${id}-error`} className="text-small text-error" role="alert">{error}</span> : null}
    </div>
  );
}
