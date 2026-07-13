import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHero, PageFrame } from "@/components/editorial";
import { insights } from "@/lib/content";

export const metadata: Metadata = { title: "Insights", description: "Practical notes on brand, growth, search, analytics, and AI systems." };

export default function InsightsPage() {
  return <PageFrame><EditorialHero eyebrow="Ideas & field notes" index="04 / Insights" title="Clear thinking for connected growth." copy="Practical perspectives on building brands, demand systems, and useful automation." /><section className="insights-grid section-pad">{insights.map((insight, index) => <Link href={`/insights/${insight.slug}`} className={`insight-card insight-card-${(index % 3) + 1}`} key={insight.slug}><div className="insight-art"><span>{String(index + 1).padStart(2, "0")}</span><i /><i /><b>{insight.category}</b></div><div className="insight-meta"><span>{insight.date}</span><span>{insight.read}</span></div><h2>{insight.title}</h2><p>{insight.excerpt}</p><b>Read article ↗</b></Link>)}</section></PageFrame>;
}

