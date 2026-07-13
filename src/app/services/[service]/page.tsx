import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialHero, NumberedList, PageFrame, RelatedWork } from "@/components/editorial";
import { Faq } from "@/components/faq";
import { SectionHeading } from "@/components/section-heading";
import { getService, servicePages } from "@/lib/content";

export function generateStaticParams() { return servicePages.map(service => ({ service: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> { const { service: slug } = await params; const service = getService(slug); return service ? { title: service.title, description: service.summary } : {}; }

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params; const service = getService(slug); if (!service) notFound();
  const localFaq = [
    [`What does a typical ${service.title.toLowerCase()} engagement include?`, `We shape the team and scope around the outcome, then confirm a clear sequence of research, strategy, production, implementation, and measurement.`],
    ["How quickly can we start?", "Most focused projects begin within two to four weeks. Embedded work can often start with a short discovery sprint."],
    ["Can you work with our internal team?", "Yes. We can own the complete workstream or partner closely with internal brand, product, marketing, and engineering leads."],
  ] as const;
  return <PageFrame><EditorialHero eyebrow={service.eyebrow} index="Service" title={service.title} copy={service.summary} /><section className="service-detail-intro section-pad"><div className="service-statement"><span>What we solve</span><h2>Make the system clearer, faster, and more valuable at every step.</h2></div><div className="tag-cloud">{service.problems.map(problem => <span key={problem}>{problem}</span>)}</div></section><section className="deliverables section-pad"><SectionHeading eyebrow="Deliverables" title="What we bring to the table." /><NumberedList items={service.deliverables.map((title) => ({ title, copy: `A senior-led ${title.toLowerCase()} workstream, aligned to your team, customers, and commercial priorities from day one.` }))} /></section><section className="process-section section-pad"><SectionHeading eyebrow="Process" title="Simple stages. Serious craft." /><NumberedList items={[{title:"Discover",copy:"Align on the business, audience, evidence, constraints, and the decisions the work must unlock."},{title:"Define",copy:"Turn the evidence into a clear strategy, system, and measurable plan for delivery."},{title:"Make",copy:"Design, write, build, test, and refine in close weekly working sessions."},{title:"Launch & learn",copy:"Ship carefully, measure what matters, and turn early evidence into the next improvement."}]} /></section><section className="outcomes-section section-pad"><SectionHeading eyebrow="Expected outcomes" title="The change we are working toward." /><div className="outcome-grid">{service.outcomes.map((outcome, index) => <div key={outcome}><span>0{index + 1}</span><h3>{outcome}</h3></div>)}</div></section><section className="case-tools service-tools"><span>Relevant tools</span><div>{service.tools.map(tool => <i key={tool}>{tool}</i>)}</div></section><RelatedWork /><section className="faq-section section-pad"><SectionHeading title="Service FAQs" align="center" /><Faq items={localFaq} /></section></PageFrame>;
}
