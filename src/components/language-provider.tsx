"use client";

import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";

type Language = "de" | "en";
const LanguageContext = createContext<{ language: Language; toggleLanguage: () => void } | null>(null);

const translations: Record<string, string> = {
  "Recent work": "Aktuelle Arbeiten", Work: "Arbeiten", Services: "Leistungen", About: "Über uns", Insights: "Einblicke", Contact: "Kontakt",
  "Open navigation": "Navigation öffnen", "Close navigation": "Navigation schließen", "Site navigation": "Seitennavigation", "Main navigation": "Hauptnavigation", "Webpilot home": "Webpilot Startseite",
  "Berlin · Working worldwide": "Berlin · Weltweit tätig", "Berlin · Worldwide": "Berlin · Weltweit", Explore: "Entdecken", Connect: "Kontakt aufnehmen", Email: "E-Mail", "Private preview · noindex": "Private Vorschau · noindex",
  "Senior studio · selected engagements": "Senior Studio · ausgewählte Mandate",
  "A full-stack growth and technology partner for ambitious brands.": "Ein ganzheitlicher Wachstums- und Technologiepartner für ambitionierte Marken.",
  "Brand, web, SEO, AI search, content, paid acquisition, and intelligent automation—all delivered by one senior team.": "Marke, Web, SEO, KI-Suche, Content, Paid Acquisition und intelligente Automatisierung – alles aus einem erfahrenen Team.",
  "Book strategy call": "Strategiegespräch buchen", "Explore our work": "Unsere Arbeiten ansehen", "Selected work": "Ausgewählte Arbeiten",
  "Trusted by ambitious teams building what’s next.": "Vertraut von ambitionierten Teams, die Zukunft gestalten.", "+ 20 more": "+ 20 weitere", "Why Webpilot": "Warum Webpilot",
  "Outcome obsessed": "Konsequent ergebnisorientiert", "Beautiful work is only the beginning. Every engagement is tied to qualified demand, conversion, pipeline, or efficiency.": "Großartige Arbeit ist nur der Anfang. Jedes Mandat ist an qualifizierte Nachfrage, Conversion, Pipeline oder Effizienz gekoppelt.",
  "Senior specialists only": "Ausschließlich erfahrene Spezialisten", "You work directly with experienced strategists, designers, developers, marketers, and automation specialists.": "Sie arbeiten direkt mit erfahrenen Strategen, Designern, Entwicklern, Marketern und Automatisierungsspezialisten.",
  "Strategy through execution": "Von der Strategie bis zur Umsetzung", "Positioning, creative, technology, acquisition, content, and automation work as one coordinated system.": "Positionierung, Kreation, Technologie, Akquisition, Content und Automatisierung greifen als ein abgestimmtes System ineinander.",
  "One accountable partner": "Ein verantwortlicher Partner", "One senior team owns the strategy, delivery, communication, and performance from end to end.": "Ein erfahrenes Team verantwortet Strategie, Umsetzung, Kommunikation und Performance durchgängig.",
  "Creative and technology together": "Kreation und Technologie vereint", "Brand, content, code, data, and AI are planned together—not managed as disconnected silos.": "Marke, Content, Code, Daten und KI werden gemeinsam geplant – nicht in getrennten Silos verwaltet.",
  "One coordinated system": "Ein abgestimmtes System", "Build. Grow. Automate.": "Aufbauen. Wachsen. Automatisieren.",
  "The studio model is intentionally broad at the edges and tightly connected at the center: your commercial outcome.": "Unser Studiomodell ist bewusst breit aufgestellt und im Kern eng verbunden: für Ihr wirtschaftliches Ergebnis.",
  Build: "Aufbauen", Grow: "Wachsen", Automate: "Automatisieren",
  "We create distinctive brands, high-converting websites, and digital products designed for long-term growth.": "Wir entwickeln unverwechselbare Marken, conversionstarke Websites und digitale Produkte für langfristiges Wachstum.",
  "We increase visibility and demand through SEO, AI search, content, paid acquisition, and conversion optimization.": "Wir steigern Sichtbarkeit und Nachfrage durch SEO, KI-Suche, Content, Paid Acquisition und Conversion-Optimierung.",
  "We build AI agents, workflow automations, CRM systems, and intelligent tools that reduce manual work.": "Wir entwickeln KI-Agenten, Workflow-Automatisierungen, CRM-Systeme und intelligente Tools, die manuelle Arbeit reduzieren.",
  "Explore service ↗": "Leistung entdecken ↗", "Selected outcomes": "Ausgewählte Ergebnisse", "Work that earns its place on the dashboard.": "Arbeit, die ihren Platz im Dashboard verdient.",
  "Every result below is placeholder data for this private concept and must be replaced with verified client reporting before publication.": "Alle folgenden Ergebnisse sind Platzhalter für dieses private Konzept und müssen vor der Veröffentlichung durch verifizierte Kundendaten ersetzt werden.",
  "See all case studies": "Alle Case Studies ansehen", "Placeholder result": "Beispielergebnis", "Be visible wherever your customers search.": "Seien Sie sichtbar, wo immer Ihre Kunden suchen.",
  "We improve visibility across traditional search engines and AI-generated answers through technical SEO, content strategy, entity optimization, structured data, authority building, and Generative Engine Optimization.": "Wir verbessern die Sichtbarkeit in klassischen Suchmaschinen und KI-generierten Antworten durch technisches SEO, Content-Strategie, Entitätenoptimierung, strukturierte Daten, Autoritätsaufbau und Generative Engine Optimization.",
  "Explore SEO & AI search": "SEO & KI-Suche entdecken", Testimonials: "Kundenstimmen", "Placeholder testimonial": "Beispiel-Kundenstimme", "Tools we’ve mastered": "Tools, die wir beherrschen", "Senior people, close to the work.": "Erfahrene Menschen, nah an der Arbeit.",
  "Ways to work together": "Formen der Zusammenarbeit", "The right shape for the problem.": "Das passende Format für die Aufgabe.", Projects: "Projekte", "Growth retainers": "Growth-Retainer", "Embedded growth team": "Integriertes Growth-Team", "Audits & strategy": "Audits & Strategie",
  "Branding, websites, product design, development, AI implementations, and automation systems.": "Branding, Websites, Produktdesign, Entwicklung, KI-Implementierungen und Automatisierungssysteme.",
  "SEO, content, social media, paid acquisition, analytics, and conversion optimization.": "SEO, Content, Social Media, Paid Acquisition, Analytics und Conversion-Optimierung.",
  "A multidisciplinary monthly team across strategy, creative, technology, acquisition, content, data, and AI.": "Ein multidisziplinäres Monatsteam für Strategie, Kreation, Technologie, Akquisition, Content, Daten und KI.",
  "Focused growth, search, analytics, conversion, AI-readiness, and automation discovery.": "Fokussierte Analysen zu Wachstum, Suche, Analytics, Conversion, KI-Reife und Automatisierung.",
  "Good to know": "Gut zu wissen", "Ready to build your next growth system?": "Bereit für Ihr nächstes Wachstumssystem?", "Let’s combine brand, technology, marketing, and AI to create measurable growth.": "Verbinden wir Marke, Technologie, Marketing und KI für messbares Wachstum.",
  "Related work": "Ähnliche Projekte", "Explore ↗": "Entdecken ↗", "About the studio": "Über das Studio", "03 / About": "03 / Über uns", "Small by design. Broad where it matters.": "Bewusst klein. Breit aufgestellt, wo es zählt.",
  "Webpilot is a senior digital growth and AI studio for companies that want creative quality and commercial accountability in the same room.": "Webpilot ist ein erfahrenes Studio für digitales Wachstum und KI – für Unternehmen, die kreative Qualität und wirtschaftliche Verantwortung zusammenbringen wollen.",
  "Our point of view": "Unsere Haltung", "Growth is not a department. It is the result of a clear promise, a useful product, a visible brand, and a system that learns.": "Wachstum ist keine Abteilung. Es entsteht aus einem klaren Versprechen, einem nützlichen Produkt, einer sichtbaren Marke und einem lernenden System.",
  "That is why our team crosses traditional agency lines. The same people shaping the story understand how the experience will be built, discovered, measured, and improved.": "Deshalb überschreitet unser Team klassische Agenturgrenzen. Die Menschen, die die Geschichte prägen, verstehen auch, wie das Erlebnis entwickelt, gefunden, gemessen und verbessert wird.",
  Principles: "Prinzipien", "How we work.": "Wie wir arbeiten.", "Senior people do the work": "Erfahrene Menschen leisten die Arbeit", "Evidence before opinion": "Belege vor Meinung", "Connected over siloed": "Vernetzt statt isoliert", "Useful over theatrical": "Nützlich statt inszeniert",
  "The people in the room are the people researching, designing, building, and optimizing the system.": "Die Menschen im Raum sind diejenigen, die recherchieren, gestalten, entwickeln und das System optimieren.",
  "Taste matters, but customer insight, performance data, and a clear strategic argument keep the work honest.": "Geschmack zählt, doch Kundenverständnis, Performance-Daten und eine klare strategische Argumentation halten die Arbeit ehrlich.",
  "We plan brand, product, technology, acquisition, content, analytics, and AI as one commercial system.": "Wir planen Marke, Produkt, Technologie, Akquisition, Content, Analytics und KI als ein wirtschaftliches System.",
  "We use new technology where it creates leverage, not where it merely creates a more impressive presentation.": "Wir nutzen neue Technologie dort, wo sie Hebelwirkung schafft – nicht nur eine eindrucksvollere Präsentation.",
  "The team": "Das Team", "Different disciplines. One standard.": "Verschiedene Disziplinen. Ein Anspruch.", "Working with ambitious teams worldwide.": "Zusammenarbeit mit ambitionierten Teams weltweit.",
  Capabilities: "Kompetenzen", "02 / Services": "02 / Leistungen", "One senior team from first idea to measurable growth.": "Ein erfahrenes Team von der ersten Idee bis zum messbaren Wachstum.",
  "We connect the work that shapes perception, creates demand, converts attention, and removes operational drag.": "Wir verbinden die Arbeit, die Wahrnehmung prägt, Nachfrage schafft, Aufmerksamkeit konvertiert und operative Reibung beseitigt.",
  "Need the whole system?": "Brauchen Sie das ganze System?", "Our embedded growth team brings strategy, design, development, acquisition, content, analytics, and AI into one coordinated monthly program.": "Unser integriertes Growth-Team verbindet Strategie, Design, Entwicklung, Akquisition, Content, Analytics und KI in einem abgestimmten Monatsprogramm.", "Discuss your brief": "Projekt besprechen",
  Service: "Leistung", "What we solve": "Was wir lösen", "Make the system clearer, faster, and more valuable at every step.": "Machen Sie das System in jedem Schritt klarer, schneller und wertvoller.", Deliverables: "Leistungsumfang", "What we bring to the table.": "Was wir einbringen.",
  Process: "Prozess", "Simple stages. Serious craft.": "Klare Phasen. Ernsthaftes Handwerk.", Discover: "Verstehen", Define: "Definieren", Make: "Umsetzen", "Launch & learn": "Veröffentlichen & lernen",
  "Align on the business, audience, evidence, constraints, and the decisions the work must unlock.": "Geschäft, Zielgruppe, Erkenntnisse, Rahmenbedingungen und die nötigen Entscheidungen gemeinsam ausrichten.",
  "Turn the evidence into a clear strategy, system, and measurable plan for delivery.": "Erkenntnisse in eine klare Strategie, ein System und einen messbaren Umsetzungsplan übersetzen.",
  "Design, write, build, test, and refine in close weekly working sessions.": "In engen wöchentlichen Arbeitssitzungen gestalten, schreiben, entwickeln, testen und verfeinern.",
  "Ship carefully, measure what matters, and turn early evidence into the next improvement.": "Sorgfältig veröffentlichen, Relevantes messen und erste Erkenntnisse in die nächste Verbesserung überführen.",
  "Expected outcomes": "Erwartete Ergebnisse", "The change we are working toward.": "Die Veränderung, auf die wir hinarbeiten.", "Relevant tools": "Relevante Tools", "Service FAQs": "FAQs zur Leistung",
  "How quickly can we start?": "Wie schnell können wir starten?", "Most focused projects begin within two to four weeks. Embedded work can often start with a short discovery sprint.": "Die meisten fokussierten Projekte starten innerhalb von zwei bis vier Wochen. Integrierte Zusammenarbeit kann oft mit einem kurzen Discovery-Sprint beginnen.",
  "Can you work with our internal team?": "Können Sie mit unserem internen Team arbeiten?", "Yes. We can own the complete workstream or partner closely with internal brand, product, marketing, and engineering leads.": "Ja. Wir können den gesamten Arbeitsstrang verantworten oder eng mit internen Verantwortlichen für Marke, Produkt, Marketing und Engineering zusammenarbeiten.",
  "01 / Work": "01 / Projekte", "Built to look exceptional. Designed to perform.": "Entwickelt, um außergewöhnlich auszusehen. Gestaltet, um zu performen.", "Original concept work spanning brand, digital products, demand generation, and intelligent operations.": "Eigenständige Konzeptarbeiten aus Marke, digitalen Produkten, Nachfragegenerierung und intelligenten Abläufen.",
  All: "Alle", "Filter projects": "Projekte filtern", Timeline: "Zeitraum", "01 · Challenge": "01 · Herausforderung", "02 · Strategy": "02 · Strategie", "03 · Execution": "03 · Umsetzung", "Fictional client · Private concept": "Fiktiver Kunde · Privates Konzept", "Technology used": "Eingesetzte Technologie", "Next case studies": "Weitere Case Studies",
  "Ideas & field notes": "Ideen & Notizen aus der Praxis", "04 / Insights": "04 / Einblicke", "Clear thinking for connected growth.": "Klare Gedanken für vernetztes Wachstum.", "Practical perspectives on building brands, demand systems, and useful automation.": "Praktische Perspektiven zum Aufbau von Marken, Nachfragesystemen und nützlicher Automatisierung.", "Read article ↗": "Artikel lesen ↗", "← All insights": "← Alle Einblicke", "In brief": "Kurz gesagt",
  "Start with the decision, not the channel": "Beginnen Sie mit der Entscheidung, nicht mit dem Kanal", "Build evidence that can travel": "Schaffen Sie Belege, die weiterwirken", "Design a learning loop": "Gestalten Sie eine Lernschleife",
  "05 / Contact": "05 / Kontakt", "Let’s build your next growth system.": "Lassen Sie uns Ihr nächstes Wachstumssystem aufbauen.", "Tell us what you are building, where growth is getting stuck, and what a strong outcome would look like.": "Erzählen Sie uns, woran Sie arbeiten, wo Wachstum ins Stocken gerät und wie ein starkes Ergebnis aussehen würde.",
  "Your name": "Ihr Name", "Work email": "Geschäftliche E-Mail", Company: "Unternehmen", "Company name": "Unternehmensname", "What can we help with?": "Wobei können wir helfen?", "Brand & website": "Marke & Website", "SEO & AI search": "SEO & KI-Suche", "Content & paid": "Content & Paid", "AI & automation": "KI & Automatisierung", "Embedded team": "Integriertes Team",
  "What are you trying to achieve?": "Was möchten Sie erreichen?", "A little context, the important constraint, and what success looks like…": "Etwas Kontext, die wichtigste Rahmenbedingung und wie Erfolg für Sie aussieht …", "Indicative investment": "Voraussichtliches Budget", "Select a range": "Budget auswählen", "Send project brief": "Projektanfrage senden",
  "Submitting opens your email client. No form data is stored by this private prototype.": "Beim Absenden öffnet sich Ihr E-Mail-Programm. Dieser private Prototyp speichert keine Formulardaten.",
  "Private preview": "Private Vorschau", "Enter the studio.": "Studio betreten.", "This private deployment is protected. Enter the shared access password to continue.": "Diese private Bereitstellung ist geschützt. Geben Sie das gemeinsame Zugangspasswort ein, um fortzufahren.", "Access password": "Zugangspasswort", "That password was not recognized.": "Dieses Passwort wurde nicht erkannt.", "Continue ↗": "Weiter ↗",
  "That signal got lost.": "Dieses Signal ist verloren gegangen.", "The page you’re looking for does not exist or has moved.": "Die gesuchte Seite existiert nicht oder wurde verschoben.", "Back to the studio": "Zurück zum Studio",
  Brand: "Marke", Product: "Produkt", Growth: "Wachstum", Social: "Social", Automation: "Automatisierung", Strategy: "Strategie", "AI search": "KI-Suche", "SEO & AI Search": "SEO & KI-Suche", "AI Automation": "KI-Automatisierung",
  "organic traffic": "organischer Traffic", "return on ad spend": "Return on Ad Spend", "manual work / month": "manuelle Arbeit / Monat", "AI-search visibility": "Sichtbarkeit in der KI-Suche", "qualified engagement": "qualifizierte Interaktionen", "faster lead response": "schnellere Lead-Reaktion", "qualified leads": "qualifizierte Leads", "acquisition cost": "Akquisitionskosten",
  "16 weeks": "16 Wochen", "20 weeks": "20 Wochen", "10 weeks": "10 Wochen", "9 months": "9 Monate", "12 weeks": "12 Wochen", "8 weeks": "8 Wochen", "18 weeks": "18 Wochen", "14 weeks": "14 Wochen",
  "7 min": "7 Min.", "6 min": "6 Min.", "8 min": "8 Min.", "5 min": "5 Min.", "9 min": "9 Min.",
  "B2B SaaS Growth Platform": "B2B-SaaS-Wachstumsplattform", "Ecommerce Growth System": "E-Commerce-Wachstumssystem", "AI Customer Support Assistant": "KI-Assistent für den Kundenservice", "Organic Search Transformation": "Transformation der organischen Suche", "Social Content Engine": "Social-Content-System", "CRM Lead Qualification System": "CRM-System zur Lead-Qualifizierung", "Technology Brand Redesign": "Rebranding einer Technologiemarke", "Multi-Channel Acquisition Campaign": "Multichannel-Akquisitionskampagne",
  "The team connected our website, search strategy, paid acquisition, and CRM automation into one cohesive growth system.": "Das Team hat unsere Website, Suchstrategie, Paid Acquisition und CRM-Automatisierung zu einem schlüssigen Wachstumssystem verbunden.",
  "They made a complex product feel obvious. The new story sharpened every sales conversation and gave marketing a real system to build on.": "Sie haben ein komplexes Produkt verständlich gemacht. Die neue Geschichte hat jedes Verkaufsgespräch geschärft und dem Marketing ein echtes System gegeben.",
  "Our support agent now handles the repetitive work with care and gives the team better context when a person needs to step in.": "Unser Support-Agent übernimmt wiederkehrende Aufgaben zuverlässig und gibt dem Team besseren Kontext, wenn ein Mensch übernehmen muss.",
  "Webpilot brought brand taste and performance discipline to the same table. That combination changed the trajectory of the launch.": "Webpilot hat Markengefühl und Performance-Disziplin zusammengebracht. Diese Kombination hat den Verlauf des Launches verändert.",
  "Fast, senior, and unusually rigorous. Every weekly review ended with clearer decisions, not another deck of marketing activity.": "Schnell, erfahren und außergewöhnlich gründlich. Jedes Wochenreview endete mit klareren Entscheidungen statt mit einer weiteren Marketingpräsentation.",
  "They were the rare partner who could move from a positioning decision to a working product experience without losing the thread.": "Sie waren der seltene Partner, der von einer Positionierungsentscheidung zu einem funktionierenden Produkterlebnis gelangen konnte, ohne den roten Faden zu verlieren.",
  "Why work with Webpilot instead of a traditional agency?": "Warum mit Webpilot statt mit einer klassischen Agentur arbeiten?", "You get one senior, multidisciplinary team across strategy, design, development, growth, and AI. There are no junior handoffs and no separate vendors to coordinate.": "Sie erhalten ein erfahrenes, multidisziplinäres Team für Strategie, Design, Entwicklung, Wachstum und KI – ohne Übergaben an Juniors oder separate Dienstleister.",
  "Who will actually work on our project?": "Wer arbeitet konkret an unserem Projekt?", "The specialists you meet are the people doing the work. Your core team stays close from the first working session through launch and improvement.": "Die Spezialisten, die Sie kennenlernen, leisten auch die Arbeit. Ihr Kernteam bleibt von der ersten Sitzung bis zum Launch und der Weiterentwicklung eng eingebunden.",
  "What can Webpilot own end to end?": "Was kann Webpilot vollständig übernehmen?", "We can take a project from positioning and creative direction through design, development, launch, acquisition, measurement, and automation.": "Wir können ein Projekt von Positionierung und Creative Direction über Design und Entwicklung bis zu Launch, Akquisition, Messung und Automatisierung begleiten.",
  "How do we work together?": "Wie arbeiten wir zusammen?", "We agree on the outcome, assemble the right senior team, and work in a clear weekly rhythm with visible decisions, progress, and next steps.": "Wir stimmen das Ziel ab, stellen das passende erfahrene Team zusammen und arbeiten in einem klaren Wochenrhythmus mit sichtbaren Entscheidungen, Fortschritten und nächsten Schritten.",
  "Who owns the work when the engagement ends?": "Wem gehören die Arbeitsergebnisse nach Abschluss?", "You do. Approved designs, source code, content, production accounts, and project documentation are handed over to your team.": "Ihnen. Freigegebene Designs, Quellcode, Inhalte, Produktionszugänge und Projektdokumentation werden an Ihr Team übergeben.",
  "Creative Director": "Kreativdirektorin", "Growth Strategist": "Growth-Stratege", "Product Designer": "Produktdesignerin", "Full-stack Developer": "Full-Stack-Entwickler", "Content Strategist": "Content-Stratege", "Project Manager": "Projektmanager",
};

const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([english, german]) => [german, english]));
const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);

function translateValue(value: string, language: Language) {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const core = value.trim();
  if (!core) return value;
  const dictionary = language === "de" ? translations : reverseTranslations;
  let translated = dictionary[core];
  if (!translated) {
    const parts = core.split(/( · |, | — )/);
    if (parts.length > 1) {
      const translatedParts = parts.map((part) => dictionary[part] ?? dictionary[part.trim()] ?? part);
      if (translatedParts.some((part, index) => part !== parts[index])) translated = translatedParts.join("");
    }
  }
  return translated ? `${leading}${translated}${trailing}` : value;
}

function translateNode(root: Node, language: Language) {
  if (root instanceof Element && (root.closest("[data-no-translate]") || ignoredTags.has(root.tagName))) return;
  if (root.nodeType === Node.TEXT_NODE && root.textContent) {
    const parent = root.parentElement;
    if (!parent?.closest("[data-no-translate]") && !ignoredTags.has(parent?.tagName ?? "")) root.textContent = translateValue(root.textContent, language);
    return;
  }
  if (root instanceof Element) {
    for (const attribute of ["aria-label", "placeholder", "title"] as const) {
      const value = root.getAttribute(attribute);
      if (value) root.setAttribute(attribute, translateValue(value, language));
    }
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) { translateNode(node, language); node = walker.nextNode(); }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("de");
  const languageRef = useRef<Language>("de");
  useLayoutEffect(() => {
    if (window.localStorage.getItem("webpilot-language") === "en") queueMicrotask(() => setLanguage("en"));
  }, []);
  useLayoutEffect(() => {
    languageRef.current = language;
    document.documentElement.lang = language;
    window.localStorage.setItem("webpilot-language", language);
    translateNode(document.body, language);
    document.title = translateValue(document.title, language);
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => translateNode(node, languageRef.current))));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);
  return <LanguageContext.Provider value={{ language, toggleLanguage: () => setLanguage((current) => current === "de" ? "en" : "de") }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
