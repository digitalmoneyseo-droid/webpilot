import { ContactForm } from "@/components/contact-form";
import { EditorialHero } from "@/components/editorial-hero";
import { getServiceCopy, type ServiceId } from "@/i18n/services";
import { t, type Locale } from "@/lib/i18n";
import { serviceOrder } from "@/lib/service-catalog";

export function ContactPage({ locale, serviceId }: { locale: Locale; serviceId?: ServiceId }) {
  const service = serviceId ? getServiceCopy(locale, serviceId) : undefined;
  const services = serviceOrder.map((id) => ({ id, name: getServiceCopy(locale, id).name }));

  return (
    <main id="main-content">
      <EditorialHero
        title={t(locale, "contact.title")}
        copy={t(locale, "contact.copy")}
      />
      <section className="px-page pb-section">
        <div className="reveal mx-auto max-w-[50rem]" data-reveal>
          <div className="rounded-shell bg-white p-10 shadow-surface max-[600px]:p-6">
            {service ? <p className="mt-0 mb-8 inline-flex rounded-control bg-interaction px-3 py-2 text-small text-muted"><span>{t(locale, "contact.selectedService")}: </span>&nbsp;<strong className="font-semibold text-ink">{service.name}</strong></p> : null}
            <ContactForm locale={locale} services={services} selectedServiceId={serviceId} />
          </div>
        </div>
      </section>
    </main>
  );
}
