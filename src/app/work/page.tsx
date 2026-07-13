import type { Metadata } from "next";
import { EditorialHero, PageFrame } from "@/components/editorial";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const metadata: Metadata = { title: "Work", description: "Selected brand, digital, growth, and AI systems by Fifth Signal." };

export default function WorkPage() {
  return <PageFrame><EditorialHero eyebrow="Selected work" index="01 / Work" title="Built to look exceptional. Designed to perform." copy="Original concept work spanning brand, digital products, demand generation, and intelligent operations." /><section className="work-index section-pad"><PortfolioGrid /></section></PageFrame>;
}

