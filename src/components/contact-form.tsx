"use client";

import { Check, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/i18n";

const interests = [
  { id: "foundation", en: "Foundation — brand, websites, apps & products", de: "Fundament – Marke, Websites, Apps & Produkte" },
  { id: "optimization", en: "Optimization — SEO, conversion, AI & automation", de: "Optimierung – SEO, Conversion, KI & Automatisierung" },
  { id: "campaigns", en: "Campaigns — paid acquisition", de: "Kampagnen – bezahlte Akquise" },
  { id: "partnership", en: "Partnership — integrated work", de: "Partnerschaft – integrierte Zusammenarbeit" },
] as const;
const budgets = [
  { id: "under-5k", en: "Under €5k", de: "Unter €5k" },
  { id: "5-15k", en: "€5k–€15k", de: "€5k–€15k" },
  { id: "15-30k", en: "€15k–€30k", de: "€15k–€30k" },
  { id: "30k-plus", en: "€30k+", de: "€30k+" },
  { id: "not-sure", en: "Not sure yet", de: "Noch unsicher" },
] as const;

type Errors = Partial<Record<"name" | "email" | "interests" | "message" | "budget", string>>;

export function ContactForm({ locale }: { locale: Locale }) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "submitting" | "sent">("idle");
  const copy = locale === "de" ? {
    name: "Dein Name", email: "Geschäftliche E-Mail", company: "Unternehmen", interests: "Wobei können wir helfen?", message: "Was möchtest du erreichen?", placeholder: "Etwas Kontext, die wichtigste Rahmenbedingung und wie Erfolg für dich aussieht …", budget: "Voraussichtliches Budget", submit: "Projektanfrage senden", pending: "Wird vorbereitet …", success: "Danke. Die Platzhalter-Übermittlung wurde erfolgreich validiert.", required: "Bitte fülle dieses Feld aus.", emailError: "Bitte gib eine gültige E-Mail-Adresse ein.", interestError: "Bitte wähle mindestens einen Bereich.", messageError: "Bitte gib uns mindestens 20 Zeichen Kontext.",
  } : {
    name: "Your name", email: "Work email", company: "Company", interests: "What can we help with?", message: "What are you trying to achieve?", placeholder: "A little context, the important constraint, and what success looks like…", budget: "Indicative investment", submit: "Send project brief", pending: "Preparing…", success: "Thank you. The placeholder submission validated successfully.", required: "Please complete this field.", emailError: "Please enter a valid email address.", interestError: "Please select at least one area.", messageError: "Please give us at least 20 characters of context.",
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Errors = {};
    if (!String(data.get("name") ?? "").trim()) nextErrors.name = copy.required;
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.emailError;
    if (!data.getAll("interests").length) nextErrors.interests = copy.interestError;
    if (String(data.get("message") ?? "").trim().length < 20) nextErrors.message = copy.messageError;
    if (!data.get("budget")) nextErrors.budget = copy.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setState("submitting");
    // PLACEHOLDER SUBMISSION HANDLER: replace with the real delivery service in a later phase.
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setState("sent");
    form.reset();
  }

  return <form className="contact-form grid gap-7" noValidate onSubmit={onSubmit}>
    <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
      <Field label={copy.name} error={errors.name}><input className="min-h-14 w-full rounded-control border border-[#424242] bg-transparent px-4 text-white" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} /></Field>
      <Field label={copy.email} error={errors.email}><div className="relative"><input className="min-h-14 w-full rounded-control border border-[#424242] bg-transparent px-4 pr-11 text-white" type="email" name="email" autoComplete="email" aria-invalid={Boolean(errors.email)} /><Check className="email-valid-icon absolute top-1/2 right-4 size-4 text-emerald-400" /></div></Field>
    </div>
    <Field label={copy.company}><input className="min-h-14 w-full rounded-control border border-[#424242] bg-transparent px-4 text-white" name="company" autoComplete="organization" /></Field>
    <fieldset data-invalid={Boolean(errors.interests)} aria-invalid={Boolean(errors.interests)}><legend className="mb-3 text-small font-medium">{copy.interests}</legend><div className="form-options form-options--services grid grid-cols-2 gap-2 max-[600px]:grid-cols-1">{interests.map((interest) => <label key={interest.id}><input className="sr-only" type="checkbox" name="interests" value={interest.id} /><span className="flex min-h-13 cursor-pointer items-center gap-2.5 rounded-control border border-[#424242] px-3 text-small">{interest[locale]}</span></label>)}</div>{errors.interests && <p className="field-message mt-2 text-small text-error">{errors.interests}</p>}</fieldset>
    <Field label={copy.message} error={errors.message}><textarea className="min-h-40 w-full resize-y rounded-control border border-[#424242] bg-transparent p-4 text-white" name="message" placeholder={copy.placeholder} aria-invalid={Boolean(errors.message)} /></Field>
    <fieldset data-invalid={Boolean(errors.budget)} aria-invalid={Boolean(errors.budget)}><legend className="mb-3 text-small font-medium">{copy.budget}</legend><div className="form-options form-options--budget flex flex-wrap gap-2">{budgets.map((budget) => <label key={budget.id}><input className="sr-only" type="radio" name="budget" value={budget.id} /><span className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-pill border border-[#424242] px-4 text-small">{budget[locale]}</span></label>)}</div>{errors.budget && <p className="field-message mt-2 text-small text-error">{errors.budget}</p>}</fieldset>
    <button className="form-submit relative inline-flex min-h-14 items-center justify-center gap-2 overflow-hidden rounded-pill bg-white px-6 font-medium text-ink" type="submit" disabled={state === "submitting"} data-state={state}><span className="form-submit__idle inline-flex items-center gap-2">{copy.submit}<Send className="size-4" /></span><span className="form-submit__pending absolute inline-flex items-center gap-2"><LoaderCircle className="form-submit__spinner size-4" />{copy.pending}</span></button>
    <p className="min-h-6 text-center text-small text-[#a8a8a2]" role="status">{state === "sent" ? copy.success : locale === "de" ? "Demo-Formular: Es werden noch keine Daten versendet oder gespeichert." : "Demo form: no data is sent or stored yet."}</p>
  </form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  const id = label.toLowerCase().replace(/\W+/g, "-");
  return <label className="form-field grid gap-2"><span className="text-small font-medium">{label}</span>{children}{error && <span id={`${id}-error`} className="field-message text-small text-error">{error}</span>}</label>;
}
