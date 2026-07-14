import Link from "next/link";
import { CtaButton, TextLink } from "@/components/buttons";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ShinyText } from "@/components/shiny-text";
import { SiteFooter } from "@/components/site-footer";
import { faqs, projects, team } from "@/lib/content";

const benefits = [
  ["✦", "Outcome obsessed", "Beautiful work is only the beginning. Every engagement is tied to qualified demand, conversion, pipeline, or efficiency."],
  ["⌁", "Senior specialists only", "You work directly with experienced strategists, designers, developers, marketers, and automation specialists."],
  ["◫", "Strategy through execution", "Positioning, creative, technology, acquisition, content, and automation work as one coordinated system."],
  ["◎", "One accountable partner", "One senior team owns the strategy, delivery, communication, and performance from end to end."],
  ["✣", "Creative and technology together", "Brand, content, code, data, and AI are planned together—not managed as disconnected silos."],
] as const;

const testimonials = [
  ["NORTH/CO", "The team connected our website, search strategy, paid acquisition, and CRM automation into one cohesive growth system.", "Camille R. · VP Growth"],
  ["MORROW", "They made a complex product feel obvious. The new story sharpened every sales conversation and gave marketing a real system to build on.", "Ben A. · Co-founder"],
  ["ARC LABS", "Our support agent now handles the repetitive work with care and gives the team better context when a person needs to step in.", "Sonia K. · COO"],
  ["KINSHIP", "Fifth Signal brought brand taste and performance discipline to the same table. That combination changed the trajectory of the launch.", "Alex D. · CEO"],
  ["VANTAIRE", "Fast, senior, and unusually rigorous. Every weekly review ended with clearer decisions, not another deck of marketing activity.", "Maya L. · CMO"],
  ["FOLD", "They were the rare partner who could move from a positioning decision to a working product experience without losing the thread.", "Jonas P. · Product Lead"],
] as const;

const tools = [
  "Figma", "Framer", "Webflow", "Next.js", "React", "Tailwind CSS", "Shopify", "WordPress", "After Effects", "Rive", "Lottie",
  "Google Analytics", "Search Console", "Ahrefs", "Semrush", "Looker Studio", "HubSpot", "Microsoft Clarity", "Hotjar",
  "Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "YouTube", "Instagram", "LinkedIn",
  "OpenAI", "Claude", "Gemini", "Make", "Zapier", "n8n", "Airtable", "Notion", "Supabase",
];

export function Homepage() {
  return <>
    <main>
      <section className="hero hero--home"><div className="hero-inner"><span className="status-pill"><i /> Senior studio · selected engagements</span><h1><ShinyText text="A full-stack growth and technology partner for ambitious brands." speed={3.5} delay={1} color="#0c0c0c" shineColor="#b8b8b2" spread={120} yoyo /></h1><p>Brand, web, SEO, AI search, content, paid acquisition, and intelligent automation—all delivered by one senior team.</p><div className="hero-actions"><CtaButton href="/contact">Book strategy call</CtaButton><CtaButton href="/work" light>Explore our work</CtaButton></div></div></section>

      <section className="work-ribbon" aria-label="Selected work"><div className="work-ribbon-track">{projects.slice(0, 4).map(project => <ProjectCard project={project} key={project.slug} />)}</div></section>

      <section className="logo-cloud"><h2>Trusted by ambitious teams building what’s next.</h2><div className="logo-row"><span>VERDANT</span><span>North/Co</span><span>orbit*</span><span>MORROW</span><span>Arc Labs</span><span>KINDRED</span><span>FORM</span><span>+ 20 more</span></div></section>

      <section className="why-section section-pad"><SectionHeading title="Why Fifth Signal" align="center" /><div className="benefit-grid">{benefits.map(([icon, title, copy], index) => <Reveal key={title} className={`benefit-card benefit-card-${index + 1}`} delay={index * 50}><div className="benefit-visual"><span>{icon}</span><i /><i /><i /></div><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></section>

      <section className="service-section section-pad"><SectionHeading eyebrow="One coordinated system" title="Build. Grow. Automate." copy="The studio model is intentionally broad at the edges and tightly connected at the center: your commercial outcome." /><div className="service-trio">{[
        ["Build", "We create distinctive brands, high-converting websites, and digital products designed for long-term growth.", "brand-web-product", "01"],
        ["Grow", "We increase visibility and demand through SEO, AI search, content, paid acquisition, and conversion optimization.", "seo-ai-search", "02"],
        ["Automate", "We build AI agents, workflow automations, CRM systems, and intelligent tools that reduce manual work.", "ai-automation", "03"],
      ].map(([title, copy, slug, number]) => <Link href={`/services/${slug}`} className="service-card" key={title}><span>{number}</span><div className={`service-symbol symbol-${title.toLowerCase()}`}><i /><i /><i /></div><h3>{title}</h3><p>{copy}</p><b>Explore service ↗</b></Link>)}</div></section>

      <section className="results-section section-pad"><div className="results-intro"><SectionHeading eyebrow="Selected outcomes" title="Work that earns its place on the dashboard." copy="Every result below is placeholder data for this private concept and must be replaced with verified client reporting before publication." /><TextLink href="/work">See all case studies</TextLink></div><div className="metrics-grid">{projects.slice(0, 4).map((project, index) => <Reveal className="metric-card" delay={index * 70} key={project.slug}><span>Placeholder result</span><strong>{project.metric}</strong><h3>{project.metricLabel}</h3><Link href={`/work/${project.slug}`}>{project.shortTitle} ↗</Link></Reveal>)}</div></section>

      <section className="search-section section-pad"><div className="search-art" aria-hidden="true"><div className="search-orbit"><i /><i /><i /><span>?</span></div><div className="answer-chip chip-a">Google</div><div className="answer-chip chip-b">ChatGPT</div><div className="answer-chip chip-c">Gemini</div><div className="answer-chip chip-d">Perplexity</div><div className="search-pulse" /></div><div className="search-copy"><span className="eyebrow">SEO + GEO</span><h2>Be visible wherever your customers search.</h2><p>We improve visibility across traditional search engines and AI-generated answers through technical SEO, content strategy, entity optimization, structured data, authority building, and Generative Engine Optimization.</p><div className="mini-tags"><span>Google</span><span>Bing</span><span>ChatGPT</span><span>Gemini</span><span>Perplexity</span><span>AI Overviews</span></div><CtaButton href="/services/seo-ai-search">Explore SEO & AI search</CtaButton></div></section>

      <section className="testimonial-section section-pad"><SectionHeading title="Testimonials" align="center" /><div className="testimonial-grid">{testimonials.map(([brand, quote, person], index) => <Reveal className="testimonial-card" delay={(index % 3) * 50} key={brand}><span>{brand}</span><blockquote>“{quote}”</blockquote><small>{person}</small><i>Placeholder testimonial</i></Reveal>)}</div></section>

      <section className="tools-section section-pad"><SectionHeading title="Tools we’ve mastered" align="center" /><div className="tools-marquee"><div>{[...tools, ...tools].map((tool, index) => <span key={`${tool}-${index}`}><i />{tool}</span>)}</div></div></section>

      <section className="team-section section-pad"><SectionHeading title="Senior people, close to the work." align="center" /><div className="team-grid">{team.map(([name, role, initials], index) => <Reveal className="team-card" delay={(index % 5) * 40} key={name}><div className={`team-portrait portrait-${(index % 5) + 1}`}><span>{initials}</span><i /></div><h3>{name}</h3><p>{role}</p></Reveal>)}</div></section>

      <section className="engagement-section section-pad"><SectionHeading eyebrow="Ways to work together" title="The right shape for the problem." /><div className="engagement-list">{[
        ["Projects", "Branding, websites, product design, development, AI implementations, and automation systems."],
        ["Growth retainers", "SEO, content, social media, paid acquisition, analytics, and conversion optimization."],
        ["Embedded growth team", "A multidisciplinary monthly team across strategy, creative, technology, acquisition, content, data, and AI."],
        ["Audits & strategy", "Focused growth, search, analytics, conversion, AI-readiness, and automation discovery."],
      ].map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>

      <section className="faq-section section-pad"><SectionHeading title="FAQs" align="center" /><Faq items={faqs} /></section><FinalCta />
    </main><SiteFooter />
  </>;
}
