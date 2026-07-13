import type { Metadata } from "next";
import { EditorialHero, PageFrame, ServiceLinkGrid, SplitCta } from "@/components/editorial";
import { servicePages } from "@/lib/content";

export const metadata: Metadata = { title: "Services", description: "Brand, product, search, acquisition, analytics, AI, and automation services." };

export default function ServicesPage() {
  return <PageFrame><EditorialHero eyebrow="Capabilities" index="02 / Services" title="One senior team from first idea to measurable growth." copy="We connect the work that shapes perception, creates demand, converts attention, and removes operational drag." /><section className="services-index section-pad"><ServiceLinkGrid services={servicePages} /></section><SplitCta title="Need the whole system?" copy="Our embedded growth team brings strategy, design, development, acquisition, content, analytics, and AI into one coordinated monthly program." href="/contact" label="Discuss your brief" /></PageFrame>;
}

