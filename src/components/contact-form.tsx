"use client";

import { ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, MonitorSmartphone, RadioTower, Search, Workflow } from "lucide-react";
import { type FormEvent, type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { t, type Locale } from "@/lib/i18n";

type FieldName = "name" | "email" | "service" | "budget" | "message";
type Errors = Partial<Record<FieldName | "form", string>>;
type Status = "idle" | "sending" | "success";

type ServiceOption = { id: string; name: string };

const fieldControlClass = "w-full rounded-[12px] border-0 bg-[var(--ds-background-200)] px-4 text-ink shadow-surface transition-[background-color,box-shadow,scale] duration-150 ease-[var(--ease-out)] placeholder:text-[#8f8f8b] hover:bg-white hover:shadow-surface-hover focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-invalid:outline-2 aria-invalid:outline-error motion-reduce:transition-none";

const serviceOptionStyles: Record<string, { selected: string; icon: string }> = {
  "websites-apps": { selected: "peer-checked:bg-[#eaf2ff] peer-checked:text-[#245bb8]", icon: "bg-[#eaf2ff] text-[#245bb8]" },
  "seo-ai-visibility": { selected: "peer-checked:bg-[#e9f7ef] peer-checked:text-[#26734d]", icon: "bg-[#e9f7ef] text-[#26734d]" },
  "paid-campaigns": { selected: "peer-checked:bg-[#fff8e8] peer-checked:text-[#9a651b]", icon: "bg-[#fff8e8] text-[#9a651b]" },
  "ai-automation": { selected: "peer-checked:bg-[#f2edff] peer-checked:text-[#6650a6]", icon: "bg-[#f2edff] text-[#6650a6]" },
  "not-sure": { selected: "peer-checked:bg-[#e5e5e2] peer-checked:text-ink peer-checked:shadow-surface-hover", icon: "bg-white text-[#73736f]" },
};

const serviceIcons = {
  "websites-apps": MonitorSmartphone,
  "seo-ai-visibility": Search,
  "paid-campaigns": RadioTower,
  "ai-automation": Workflow,
  "not-sure": CircleHelp,
};

export function ContactForm({
  locale,
  services,
  selectedServiceId,
}: {
  locale: Locale;
  services: ServiceOption[];
  selectedServiceId?: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const budgetControlRef = useRef<HTMLDivElement>(null);
  const budgetButtonRef = useRef<HTMLButtonElement>(null);
  const budgetMenuRef = useRef<HTMLDivElement>(null);
  const copy = {
    name: t(locale, "contact.formName"),
    namePlaceholder: t(locale, "contact.formNamePlaceholder"),
    email: t(locale, "contact.formEmail"),
    emailPlaceholder: t(locale, "contact.formEmailPlaceholder"),
    company: t(locale, "contact.formCompany"),
    companyPlaceholder: t(locale, "contact.formCompanyPlaceholder"),
    companyOptional: t(locale, "contact.formOptional"),
    service: t(locale, "contact.formService"),
    budget: t(locale, "contact.formBudget"),
    budgetPlaceholder: t(locale, "contact.formBudgetPlaceholder"),
    budgetOptions: [
      t(locale, "contact.formBudget1"),
      t(locale, "contact.formBudget2"),
      t(locale, "contact.formBudget3"),
      t(locale, "contact.formBudget4"),
      t(locale, "contact.formBudgetUnsure"),
    ],
    message: t(locale, "contact.formMessage"),
    placeholder: t(locale, "contact.formPlaceholder"),
    submit: t(locale, "contact.formSubmit"),
    sending: t(locale, "contact.formSending"),
    required: t(locale, "contact.formRequired"),
    emailError: t(locale, "contact.formEmailError"),
    messageError: t(locale, "contact.formMessageError"),
    note: t(locale, "contact.formNote"),
    error: t(locale, "contact.formError"),
    successTitle: t(locale, "contact.formSuccessTitle"),
    successCopy: t(locale, "contact.formSuccessCopy"),
    another: t(locale, "contact.formAnother"),
  };

  const serviceOptions = [...services, { id: "not-sure", name: t(locale, "contact.formServiceUnsure") }];
  const budgetOptions = copy.budgetOptions.map((label, index) => ({ id: `budget-${index + 1}`, label }));
  const selectedBudgetLabel = budgetOptions.find(({ id }) => id === selectedBudget)?.label;

  useEffect(() => {
    if (!budgetOpen) return;
    const closeOnPointerDown = (event: PointerEvent) => {
      if (!budgetControlRef.current?.contains(event.target as Node)) setBudgetOpen(false);
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setBudgetOpen(false);
      budgetButtonRef.current?.focus();
    };
    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [budgetOpen]);

  function clearError(field: FieldName) {
    setErrors((current) => current[field] || current.form ? { ...current, [field]: undefined, form: undefined } : current);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const service = String(data.get("service") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const nextErrors: Errors = {};

    if (!name) nextErrors.name = copy.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.emailError;
    if (!service) nextErrors.service = copy.required;
    if (!budget) nextErrors.budget = copy.required;
    if (message.length < 20) nextErrors.message = copy.messageError;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalidField = Object.keys(nextErrors)[0] as FieldName;
      if (firstInvalidField === "budget") budgetButtonRef.current?.focus();
      else (form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: String(data.get("company") ?? "").trim(),
          service,
          budget,
          message,
          locale,
          website: String(data.get("website") ?? ""),
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");
      setSubmittedEmail(email);
      setStatus("success");
      setSelectedBudget("");
      form.reset();
    } catch {
      setErrors({ form: copy.error });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[32rem] flex-col items-start justify-center" role="status" aria-live="polite">
        <span className="mb-6 grid size-12 place-items-center rounded-[12px] bg-ink text-white shadow-surface" aria-hidden="true">
          <Check className="size-5" strokeWidth={2} />
        </span>
        <h2 className="m-0 max-w-[32rem] text-heading-lg text-ink">{copy.successTitle}</h2>
        <p className="mt-4 mb-0 max-w-[32rem] text-body text-muted">
          {copy.successCopy.replace("{email}", submittedEmail)}
        </p>
        <button
          className="mt-8 rounded-lg bg-[var(--ds-gray-alpha-100)] px-3 py-2 text-small font-medium text-ink transition-[background-color,scale] duration-150 hover:bg-[var(--ds-gray-alpha-200)] active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100"
          type="button"
          onClick={() => setStatus("idle")}
        >
          {copy.another}
        </button>
      </div>
    );
  }

  return (
    <form className="grid gap-6" noValidate onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
        <Field id="contact-name" label={copy.name} error={errors.name}>
          <input
            id="contact-name"
            className={`min-h-12 ${fieldControlClass}`}
            name="name"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            maxLength={100}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={() => clearError("name")}
          />
        </Field>
        <Field id="contact-email" label={copy.email} error={errors.email}>
          <input
            id="contact-email"
            className={`min-h-12 ${fieldControlClass}`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            inputMode="email"
            maxLength={254}
            spellCheck={false}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={() => clearError("email")}
          />
        </Field>
      </div>

      <Field id="contact-company" label={copy.company} hint={copy.companyOptional}>
        <input
          id="contact-company"
          className={`min-h-12 ${fieldControlClass}`}
          name="company"
          autoComplete="organization"
          placeholder={copy.companyPlaceholder}
          maxLength={120}
        />
      </Field>

      <fieldset className="m-0 grid gap-3 border-0 p-0" aria-describedby={errors.service ? "contact-service-error" : undefined}>
        <legend className={`mb-1 text-small font-medium ${errors.service ? "text-error" : "text-ink"}`}>{copy.service}</legend>
        <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
          {serviceOptions.map((service) => {
            const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? CircleHelp;
            const styles = serviceOptionStyles[service.id] ?? serviceOptionStyles["not-sure"];
            return (
            <label key={service.id} className="group relative cursor-pointer">
              <input
                className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0"
                type="radio"
                name="service"
                value={service.id}
                defaultChecked={selectedServiceId === service.id || (!selectedServiceId && service.id === "not-sure")}
                onChange={() => clearError("service")}
              />
              <span className={`flex min-h-14 items-center gap-3 rounded-[12px] bg-[var(--ds-background-200)] p-2 text-small text-muted shadow-surface transition-[background-color,color,box-shadow,scale] duration-150 ease-[var(--ease-out)] group-hover:bg-white group-hover:shadow-surface-hover peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus peer-active:scale-[.96] motion-reduce:transition-none motion-reduce:peer-active:scale-100 ${styles.selected}`}>
                <span className={`grid size-9 shrink-0 place-items-center rounded-[9px] shadow-surface ${styles.icon}`} aria-hidden="true">
                  <Icon className="size-4.5" strokeWidth={1.7} />
                </span>
                <span>{service.name}</span>
              </span>
            </label>
          );})}
        </div>
        {errors.service ? <span id="contact-service-error" className="text-small text-error" role="alert">{errors.service}</span> : null}
      </fieldset>

      <Field id="contact-budget" label={copy.budget} error={errors.budget}>
        <div ref={budgetControlRef} className="relative">
          <input name="budget" type="hidden" value={selectedBudget} readOnly />
          <button
            ref={budgetButtonRef}
            id="contact-budget"
            className={`flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 rounded-[12px] border-0 bg-[var(--ds-background-200)] px-4 text-left text-small shadow-surface transition-[background-color,box-shadow,scale] duration-150 ease-[var(--ease-out)] hover:bg-white hover:shadow-surface-hover active:scale-[.99] focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[invalid=true]:outline-2 data-[invalid=true]:outline-error motion-reduce:transition-none motion-reduce:active:scale-100 ${selectedBudgetLabel ? "text-ink" : "text-muted"}`}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={budgetOpen}
            aria-controls="contact-budget-menu"
            data-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "contact-budget-error" : undefined}
            onClick={() => setBudgetOpen((current) => !current)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              event.preventDefault();
              setBudgetOpen(true);
              window.setTimeout(() => budgetMenuRef.current?.querySelector<HTMLButtonElement>("[role='option']")?.focus(), 0);
            }}
          >
            <span>{selectedBudgetLabel ?? copy.budgetPlaceholder}</span>
            <ChevronDown className={`size-4 shrink-0 text-[#73736f] transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none ${budgetOpen ? "rotate-180" : ""}`} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <div
            ref={budgetMenuRef}
            id="contact-budget-menu"
            className={`absolute top-full right-0 left-0 z-20 pt-2 transition-[opacity,translate] duration-200 ease-[var(--ease-out)] motion-reduce:duration-0 ${budgetOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
            role="listbox"
            aria-label={copy.budget}
            aria-hidden={!budgetOpen}
            inert={!budgetOpen}
          >
            <div className="rounded-[12px] bg-white p-1 shadow-surface">
              {budgetOptions.map((option, index) => (
                <button
                  key={option.id}
                  className={`flex min-h-9 w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-3 text-left text-small transition-[background-color,scale] duration-150 hover:bg-[var(--ds-gray-alpha-100)] active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus motion-reduce:transition-none motion-reduce:active:scale-100 ${selectedBudget === option.id ? "bg-[var(--ds-gray-alpha-100)] text-ink" : "text-muted"}`}
                  type="button"
                  role="option"
                  aria-selected={selectedBudget === option.id}
                  tabIndex={budgetOpen ? 0 : -1}
                  onClick={() => {
                    setSelectedBudget(option.id);
                    clearError("budget");
                    setBudgetOpen(false);
                    budgetButtonRef.current?.focus();
                  }}
                  onKeyDown={(event) => moveBudgetFocus(event, index, budgetOptions.length, budgetMenuRef.current)}
                >
                  <span>{option.label}</span>
                  {selectedBudget === option.id ? <Check className="size-4" strokeWidth={1.8} aria-hidden="true" /> : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Field>

      <Field id="contact-message" label={copy.message} error={errors.message}>
        <textarea
          id="contact-message"
          className={`min-h-44 resize-y p-4 ${fieldControlClass}`}
          name="message"
          autoComplete="off"
          placeholder={copy.placeholder}
          minLength={20}
          maxLength={5000}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-form-note"}
          onChange={() => clearError("message")}
        />
      </Field>

      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button
          className="pill-button pill-button--dark inline-flex min-h-[52px] items-center gap-3.5 rounded-pill bg-dark py-0 pr-2.5 pl-4 text-control text-white shadow-dark-surface disabled:cursor-wait disabled:opacity-65 max-[600px]:w-full max-[600px]:justify-between"
          type="submit"
          disabled={status === "sending"}
        >
          <span className="block h-[1.5em] overflow-hidden leading-control">
            <span className="pill-button__label-track flex h-[200%] flex-col">
              <span className="flex h-[1.5em] shrink-0 items-center whitespace-nowrap">{status === "sending" ? copy.sending : copy.submit}</span>
              <span className="flex h-[1.5em] shrink-0 items-center whitespace-nowrap" aria-hidden="true">{status === "sending" ? copy.sending : copy.submit}</span>
            </span>
          </span>
          <span className="pill-button__icon relative size-8 flex-none overflow-hidden rounded-pill bg-white text-ink" aria-hidden="true">
            <ArrowRight className="pill-button__arrow pill-button__arrow--right absolute inset-[7px] size-[18px]" strokeWidth={1.7} />
            <ArrowUpRight className="pill-button__arrow pill-button__arrow--up-right absolute inset-[7px] size-[18px] opacity-0 [transform:translate(-6px,6px)_scale(.8)]" strokeWidth={1.7} />
          </span>
        </button>
        <p id="contact-form-note" className="mt-4 mb-0 max-w-[36rem] text-small text-muted">
          {copy.note}
        </p>
        {errors.form ? <p className="mt-4 mb-0 text-small text-error" role="alert">{errors.form}</p> : null}
      </div>
    </form>
  );
}

function moveBudgetFocus(event: KeyboardEvent<HTMLButtonElement>, index: number, optionCount: number, menu: HTMLDivElement | null) {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const options = menu?.querySelectorAll<HTMLButtonElement>("[role='option']");
  if (!options?.length) return;
  const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? optionCount - 1 : event.key === "ArrowDown" ? (index + 1) % optionCount : (index - 1 + optionCount) % optionCount;
  options[nextIndex]?.focus();
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label className={`flex items-baseline justify-between gap-4 text-small font-medium ${error ? "text-error" : "text-ink"}`} htmlFor={id}>
        <span>{label}</span>
        {hint ? <span className="font-normal text-muted">{hint}</span> : null}
      </label>
      {children}
      {error ? <span id={`${id}-error`} className="text-small text-error" role="alert">{error}</span> : null}
    </div>
  );
}
