import { EditorialHero } from "@/components/editorial-hero";
import { t, type Locale } from "@/lib/i18n";
import type { MessageKey } from "@/i18n/translations";

type LegalPageKind = "imprint" | "privacy";

const content: Record<LegalPageKind, {
  title: MessageKey;
  copy: MessageKey;
  statusTitle: MessageKey;
  statusCopy: MessageKey;
  sections: Array<{
    title: MessageKey;
    copy: MessageKey;
    items: MessageKey[];
  }>;
}> = {
  imprint: {
    title: "imprint.title",
    copy: "imprint.copy",
    statusTitle: "imprint.statusTitle",
    statusCopy: "imprint.statusCopy",
    sections: [
      {
        title: "imprint.requiredTitle",
        copy: "imprint.requiredCopy",
        items: ["imprint.required1", "imprint.required2", "imprint.required3"],
      },
      {
        title: "imprint.conditionalTitle",
        copy: "imprint.conditionalCopy",
        items: ["imprint.conditional1", "imprint.conditional2", "imprint.conditional3", "imprint.conditional4"],
      },
    ],
  },
  privacy: {
    title: "privacy.title",
    copy: "privacy.copy",
    statusTitle: "privacy.statusTitle",
    statusCopy: "privacy.statusCopy",
    sections: [
      {
        title: "privacy.knownTitle",
        copy: "privacy.knownCopy",
        items: ["privacy.known1", "privacy.known2", "privacy.known3"],
      },
      {
        title: "privacy.requiredTitle",
        copy: "privacy.requiredCopy",
        items: ["privacy.required1", "privacy.required2", "privacy.required3", "privacy.required4", "privacy.required5"],
      },
    ],
  },
};

export function LegalDraftPage({ locale, kind }: { locale: Locale; kind: LegalPageKind }) {
  const page = content[kind];

  return (
    <main id="main-content">
      <EditorialHero title={t(locale, page.title)} copy={t(locale, page.copy)} />

      <section className="bg-canvas px-page pb-section">
        <div className="mx-auto max-w-reading">
          <div className="rounded-card bg-surface p-card-padding shadow-surface">
            <span className="text-xs/4 font-medium tracking-widest text-muted">{t(locale, "legal.draftLabel")}</span>
            <h2 className="mt-3 mb-0 text-heading-md">{t(locale, page.statusTitle)}</h2>
            <p className="mt-3 mb-0 text-base/6 text-muted">{t(locale, page.statusCopy)}</p>
          </div>

          <div className="mt-16 grid gap-12">
            {page.sections.map((section) => (
              <section className="border-t border-line pt-8" key={section.title}>
                <h2 className="m-0 text-heading-md">{t(locale, section.title)}</h2>
                <p className="mt-3 mb-0 text-base/6 text-muted">{t(locale, section.copy)}</p>
                <ul className="mt-6 mb-0 grid list-disc gap-3 pl-5 text-base/6 text-muted">
                  {section.items.map((item) => <li key={item}>{t(locale, item)}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
