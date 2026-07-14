export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  categories: string[];
  year: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  strategy: string;
  execution: string;
  timeline: string;
  tools: string[];
  palette: "violet" | "orange" | "blue" | "green" | "ink" | "yellow" | "coral" | "ice";
  visual: "dashboard" | "commerce" | "assistant" | "search" | "content" | "crm" | "brand" | "campaign";
};

export const projects: Project[] = [
  {
    slug: "atlas-growth-platform",
    title: "B2B SaaS Growth Platform",
    shortTitle: "Atlas",
    summary: "A sharper product story and a search-led acquisition system for a complex B2B platform.",
    categories: ["Website", "SEO & GEO", "Growth"],
    year: "2026",
    metric: "+184%",
    metricLabel: "organic traffic",
    challenge: "A strong product was hidden behind a fragmented story, slow site, and low-intent search footprint.",
    strategy: "Unify positioning, product education, technical search foundations, and demand capture around high-value use cases.",
    execution: "We rebuilt the information architecture, designed a modular product site, created an editorial engine, and connected attribution across the funnel.",
    timeline: "16 weeks",
    tools: ["Figma", "Next.js", "Ahrefs", "HubSpot", "GA4"],
    palette: "violet",
    visual: "dashboard",
  },
  {
    slug: "kindred-commerce",
    title: "Ecommerce Growth System",
    shortTitle: "Kindred",
    summary: "A joyful identity and performance storefront engineered to turn more discovery into revenue.",
    categories: ["Brand", "Paid Media", "Growth"],
    year: "2026",
    metric: "4.8×",
    metricLabel: "return on ad spend",
    challenge: "Growth had plateaued as acquisition costs rose and the storefront struggled to communicate product value.",
    strategy: "Reframe the brand around customer rituals, then connect creative testing, merchandising, and conversion data.",
    execution: "We developed a new identity, Shopify design system, landing-page program, paid creative toolkit, and weekly testing cadence.",
    timeline: "20 weeks",
    tools: ["Figma", "Shopify", "Meta Ads", "Klaviyo", "Looker Studio"],
    palette: "orange",
    visual: "commerce",
  },
  {
    slug: "nora-support-ai",
    title: "AI Customer Support Assistant",
    shortTitle: "Nora",
    summary: "An on-brand support agent that resolves routine questions and gives the team better context.",
    categories: ["AI", "Automation", "Product"],
    year: "2026",
    metric: "−60h",
    metricLabel: "manual work / month",
    challenge: "A lean support team was spending its best hours searching internal documentation and repeating standard replies.",
    strategy: "Create a governed knowledge layer with transparent citations, human escalation, and measurable resolution quality.",
    execution: "We mapped support intents, prepared the knowledge base, built retrieval and guardrails, and integrated the agent with the help desk.",
    timeline: "10 weeks",
    tools: ["OpenAI", "Supabase", "Next.js", "Intercom", "n8n"],
    palette: "blue",
    visual: "assistant",
  },
  {
    slug: "northstar-organic-search",
    title: "Organic Search Transformation",
    shortTitle: "Northstar",
    summary: "A technical, editorial, and authority program built for both search engines and answer engines.",
    categories: ["SEO & GEO", "Content", "Growth"],
    year: "2025",
    metric: "+230%",
    metricLabel: "AI-search visibility",
    challenge: "The brand ranked for its own name but was absent from the questions buyers asked while comparing solutions.",
    strategy: "Build topical authority across product, use-case, comparison, and proof content, supported by clean entities and schema.",
    execution: "We fixed crawl and rendering issues, rebuilt the content model, published expert-led clusters, and created a citation monitoring system.",
    timeline: "9 months",
    tools: ["Semrush", "Search Console", "Sanity", "Next.js", "Looker Studio"],
    palette: "green",
    visual: "search",
  },
  {
    slug: "orbit-content-engine",
    title: "Social Content Engine",
    shortTitle: "Orbit",
    summary: "A repeatable editorial operating system turning one expert idea into a month of useful content.",
    categories: ["Content", "Social", "Automation"],
    year: "2025",
    metric: "3.4×",
    metricLabel: "qualified engagement",
    challenge: "Subject-matter experts had plenty to say, but the publishing process was inconsistent and difficult to sustain.",
    strategy: "Create a recognizable editorial point of view and a production system that starts with expert conversations.",
    execution: "We designed content formats, production workflows, review automations, distribution playbooks, and a measurement dashboard.",
    timeline: "12 weeks",
    tools: ["Notion", "Figma", "Claude", "Make", "LinkedIn"],
    palette: "ink",
    visual: "content",
  },
  {
    slug: "lumen-lead-system",
    title: "CRM Lead Qualification System",
    shortTitle: "Lumen",
    summary: "An intelligent revenue workflow that researches, routes, and briefs every serious lead in minutes.",
    categories: ["AI", "Automation", "Growth"],
    year: "2025",
    metric: "93%",
    metricLabel: "faster lead response",
    challenge: "High-value inquiries sat in multiple systems while sales spent time researching fit and assembling context manually.",
    strategy: "Build a single qualification flow combining enrichment, fit scoring, intent, and human review for sensitive decisions.",
    execution: "We connected forms, CRM, enrichment, agent research, scoring, Slack routing, and personalized follow-up drafts.",
    timeline: "8 weeks",
    tools: ["HubSpot", "OpenAI", "Clay", "n8n", "Slack"],
    palette: "yellow",
    visual: "crm",
  },
  {
    slug: "form-technology-rebrand",
    title: "Technology Brand Redesign",
    shortTitle: "Form",
    summary: "A confident brand and product story for a technical company entering its next stage of growth.",
    categories: ["Brand", "Website", "Product"],
    year: "2025",
    metric: "+72%",
    metricLabel: "qualified leads",
    challenge: "The company had outgrown a startup identity that undersold the quality and scale of its platform.",
    strategy: "Clarify the category position, make the system tangible, and create a flexible identity that works from product UI to events.",
    execution: "We delivered strategy, verbal identity, art direction, visual identity, product UI foundations, and a new website.",
    timeline: "18 weeks",
    tools: ["Figma", "Rive", "Next.js", "Storybook", "Sanity"],
    palette: "coral",
    visual: "brand",
  },
  {
    slug: "wave-acquisition",
    title: "Multi-Channel Acquisition Campaign",
    shortTitle: "Wave",
    summary: "A coordinated search, social, and content launch that made every channel reinforce the next.",
    categories: ["Paid Media", "Content", "Growth"],
    year: "2025",
    metric: "−36%",
    metricLabel: "acquisition cost",
    challenge: "Campaigns were managed in channel silos, resulting in inconsistent stories, duplicated effort, and weak learning loops.",
    strategy: "Build one campaign architecture with shared messages, modular creative, and a measurement plan spanning the full journey.",
    execution: "We produced landing pages, paid search and social programs, creator briefs, nurture content, and executive reporting.",
    timeline: "14 weeks",
    tools: ["Google Ads", "Meta Ads", "Figma", "HubSpot", "GA4"],
    palette: "ice",
    visual: "campaign",
  },
];

export const servicePages = [
  {
    slug: "brand-web-product",
    title: "Brand, web & product",
    eyebrow: "Build",
    summary: "Distinctive brands and digital products with the clarity, craft, and systems needed to keep growing.",
    problems: ["An undifferentiated position", "A website that no longer reflects the business", "Slow product delivery", "Disconnected brand and product experiences"],
    deliverables: ["Brand strategy and positioning", "Visual and verbal identity", "Web and product design", "Full-stack development", "Design systems", "Motion and interaction"],
    outcomes: ["Clearer market position", "Higher conversion confidence", "Faster launches", "A scalable digital system"],
    tools: ["Figma", "Next.js", "React", "Shopify", "Rive", "Framer"],
  },
  {
    slug: "seo-ai-search",
    title: "SEO & AI search",
    eyebrow: "Grow",
    summary: "Technical and editorial visibility wherever customers research, compare, and ask for recommendations.",
    problems: ["Falling organic visibility", "Weak non-brand demand", "Little presence in AI answers", "Content that does not convert"],
    deliverables: ["Technical SEO", "Search and entity strategy", "Generative engine optimization", "Content systems", "Structured data", "Authority building"],
    outcomes: ["Qualified organic demand", "Stronger answer-engine citations", "Compounding content value", "Lower blended acquisition cost"],
    tools: ["Ahrefs", "Semrush", "Search Console", "GA4", "Looker Studio", "Schema.org"],
  },
  {
    slug: "content-social",
    title: "Content & social",
    eyebrow: "Grow",
    summary: "Expert-led content systems that build attention, trust, and demand without feeding the content treadmill.",
    problems: ["Inconsistent publishing", "Generic thought leadership", "Low audience trust", "Slow content production"],
    deliverables: ["Editorial strategy", "Content design", "Social systems", "Production workflows", "Executive content", "Distribution playbooks"],
    outcomes: ["Recognizable expertise", "A repeatable publishing rhythm", "More useful engagement", "A growing content library"],
    tools: ["Notion", "Figma", "LinkedIn", "YouTube", "Make", "Claude"],
  },
  {
    slug: "paid-acquisition",
    title: "Paid acquisition",
    eyebrow: "Grow",
    summary: "Sharper campaigns, better creative learning, and accountable acquisition across the channels that matter.",
    problems: ["Rising acquisition costs", "Weak creative testing", "Fragmented channel strategy", "Unclear attribution"],
    deliverables: ["Channel and offer strategy", "Google Ads", "Meta and LinkedIn Ads", "Creative systems", "Landing pages", "Performance reporting"],
    outcomes: ["Lower acquisition cost", "Higher quality pipeline", "Faster creative learning", "Clearer investment decisions"],
    tools: ["Google Ads", "Meta Ads", "LinkedIn Ads", "GA4", "HubSpot", "Looker Studio"],
  },
  {
    slug: "ai-automation",
    title: "AI & automation",
    eyebrow: "Automate",
    summary: "Useful agents, workflows, and internal tools that remove repetitive work while keeping people in control.",
    problems: ["Manual handoffs", "Knowledge trapped in documents", "Slow lead and support response", "Disconnected operational data"],
    deliverables: ["AI agents", "Knowledge systems", "Workflow automation", "CRM automation", "Internal tools", "API integrations"],
    outcomes: ["Hours returned to the team", "Faster response times", "More consistent operations", "Better use of company knowledge"],
    tools: ["OpenAI", "Claude", "n8n", "Make", "Supabase", "Airtable"],
  },
  {
    slug: "analytics-cro",
    title: "Analytics & CRO",
    eyebrow: "Optimize",
    summary: "A reliable measurement foundation and an experimentation program focused on business outcomes.",
    problems: ["Conflicting reports", "Unknown funnel friction", "Low experiment velocity", "Activity metrics without decisions"],
    deliverables: ["Measurement strategy", "Analytics implementation", "Conversion research", "Experiment design", "Dashboards", "Attribution models"],
    outcomes: ["Trusted performance data", "Higher conversion rates", "Faster learning cycles", "More confident allocation"],
    tools: ["GA4", "Google Tag Manager", "Clarity", "Hotjar", "Looker Studio", "Vercel Analytics"],
  },
];

export const insights = [
  { slug: "search-is-becoming-a-recommendation-layer", category: "AI search", date: "Jun 18, 2026", read: "7 min", title: "Search is becoming a recommendation layer", excerpt: "How brand authority, product clarity, and technical evidence influence answer engines." },
  { slug: "the-compounding-value-of-a-content-system", category: "Content", date: "May 29, 2026", read: "6 min", title: "The compounding value of a content system", excerpt: "A practical operating model for turning expertise into useful, reusable demand assets." },
  { slug: "what-to-automate-first", category: "Automation", date: "May 7, 2026", read: "8 min", title: "What to automate first", excerpt: "A simple way to find high-value workflows without automating a broken process." },
  { slug: "why-brand-and-performance-belong-together", category: "Strategy", date: "Apr 11, 2026", read: "5 min", title: "Why brand and performance belong together", excerpt: "The best growth systems make memory and measurement reinforce one another." },
  { slug: "a-better-b2b-website-brief", category: "Web", date: "Mar 26, 2026", read: "9 min", title: "A better B2B website brief", excerpt: "The decisions to make before wireframes, visual directions, or a single line of code." },
  { slug: "measurement-for-ai-assisted-growth", category: "Analytics", date: "Feb 19, 2026", read: "6 min", title: "Measurement for AI-assisted growth", excerpt: "How to distinguish real operational leverage from impressive-looking automation demos." },
];

export const team = [
  ["Mara Voss", "Creative Director", "MV"], ["Jon Bell", "Growth Strategist", "JB"],
  ["Aya Chen", "Product Designer", "AC"], ["Noah Reed", "Full-stack Developer", "NR"],
  ["Lina Park", "SEO & AI Search", "LP"], ["Owen Tate", "Content Strategist", "OT"],
  ["Iris Cole", "Paid Media", "IC"], ["Samir Khan", "AI Automation", "SK"],
  ["Elena Moss", "Analytics", "EM"], ["Theo Wright", "Project Manager", "TW"],
] as const;

export const faqs = [
  ["Why work with Webpilot instead of a traditional agency?", "You get one senior, multidisciplinary team across strategy, design, development, growth, and AI. There are no junior handoffs and no separate vendors to coordinate."],
  ["Who will actually work on our project?", "The specialists you meet are the people doing the work. Your core team stays close from the first working session through launch and improvement."],
  ["What can Webpilot own end to end?", "We can take a project from positioning and creative direction through design, development, launch, acquisition, measurement, and automation."],
  ["How do we work together?", "We agree on the outcome, assemble the right senior team, and work in a clear weekly rhythm with visible decisions, progress, and next steps."],
  ["Who owns the work when the engagement ends?", "You do. Approved designs, source code, content, production accounts, and project documentation are handed over to your team."],
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getService(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
