import type { Locale } from "@/lib/i18n";

export type ServiceId = "websites-apps" | "seo-ai-visibility" | "paid-campaigns" | "ai-automation";

export type WebExperienceAnimationCopy = {
  title: string;
  status: string;
  desktopLabel: string;
  mobileLabel: string;
  headline: string;
  cta: string;
};

export type OptimizationAnimationCopy = {
  query: string;
  resultLabel: string;
  rankLabel: string;
  topRankedLabel: string;
  winnerDescription: string;
  descriptions: readonly string[];
};

export type CampaignAnimationCopy = { metricLabel: string };

export type AutomationAnimationCopy = {
  title: string;
  status: string;
  inputs: readonly string[];
  intelligence: string;
  outputs: readonly string[];
};

type CopyRow = readonly [label: string, copy: string];
type ContentItem = { title: string; copy: string };
type ScopeGroup = { title: string; items: readonly string[] };
type FaqItem = { question: string; answer: string };

export type ServiceCopy = {
  id: ServiceId;
  name: string;
  navDescription: string;
  summary: string;
  rows: readonly CopyRow[];
  cta: string;
  page: {
    metaDescription: string;
    title: string;
    intro: string;
    outcomesHeading: string;
    outcomesIntro: string;
    outcomes: readonly ContentItem[];
    scopeHeading: string;
    scopeIntro: string;
    scopeGroups: readonly ScopeGroup[];
    processHeading: string;
    processIntro: string;
    process: readonly ContentItem[];
    faqHeading: string;
    faqs: readonly FaqItem[];
    finalTitle: string;
    finalCopy: string;
    finalCta: string;
  };
};

export type ServicesCopy = {
  services: readonly ServiceCopy[];
  webExperienceAnimation: WebExperienceAnimationCopy;
  optimizationAnimation: OptimizationAnimationCopy;
  campaignAnimation: CampaignAnimationCopy;
  automationAnimation: AutomationAnimationCopy;
};

export const servicesContent = {
  de: {
    services: [
      {
        id: "websites-apps",
        name: "Websites & Apps",
        navDescription: "Digitale Erlebnisse planen, gestalten und entwickeln.",
        summary: "Websites, Web-Apps und digitale Produkte von Strategie und UX bis Entwicklung und Launch.",
        rows: [
          ["Ideal für", "Unternehmen, die eine neue Website, App oder digitale Plattform aufbauen oder grundlegend erneuern möchten."],
          ["Das Ergebnis", "Ein schnelles, zugängliches und überzeugendes digitales Erlebnis, das zu deinen Kunden und Geschäftszielen passt."],
          ["Was dazugehört", "Strategie, UX und UI Design, Entwicklung, CMS, Analytics, Integrationen und eine solide Conversion-Grundlage."],
        ],
        cta: "Websites & Apps entdecken",
        page: {
          metaDescription: "Websites, Web-Apps und digitale Produkte von Webpilot: Strategie, UX/UI Design, Entwicklung, Integrationen, Analytics und Launch.",
          title: "Digitale Erlebnisse, die für dein Unternehmen arbeiten.",
          intro: "Wir planen, gestalten und entwickeln schnelle, zugängliche Websites und Apps rund um deine Kunden und Geschäftsziele.",
          outcomesHeading: "Mehr als eine schöne Oberfläche",
          outcomesIntro: "Design, Technologie und Conversion werden gemeinsam geplant, damit das Ergebnis im Alltag funktioniert.",
          outcomes: [
            { title: "Ein klarer Weg zur Handlung", copy: "Inhalte, Navigation und Interaktionen führen Besucher verständlich zum nächsten sinnvollen Schritt." },
            { title: "Schnell und zugänglich", copy: "Das Erlebnis funktioniert zuverlässig auf verschiedenen Geräten und für möglichst viele Menschen." },
            { title: "Bereit für Weiterentwicklung", copy: "Saubere Systeme, sinnvolle Integrationen und messbare Grundlagen machen spätere Verbesserungen leichter." },
          ],
          scopeHeading: "Was wir gestalten und entwickeln",
          scopeIntro: "Der konkrete Umfang richtet sich nach deinem Ziel. Diese Bereiche können Teil des Projekts sein.",
          scopeGroups: [
            { title: "Strategie & UX", items: ["Ziele, Zielgruppen und Nutzerwege", "Informationsarchitektur und Inhalte", "Prototypen und Nutzertests", "Technische Planung"] },
            { title: "Design & Entwicklung", items: ["UX und UI Design", "Responsive Websites", "Web-Apps und digitale Produkte", "CMS und Frontend-Entwicklung"] },
            { title: "Launch & Verbesserung", items: ["Analytics und Consent-Setup", "CRM- und API-Integrationen", "Conversion-Grundlagen", "Launch, Übergabe und Support"] },
          ],
          processHeading: "Von der Idee bis zum Launch",
          processIntro: "Ein fokussierter Ablauf schafft frühe Klarheit und hält Entscheidungen nachvollziehbar.",
          process: [
            { title: "Verstehen", copy: "Wir klären Ziel, Zielgruppe, vorhandene Systeme und die wichtigsten Anforderungen." },
            { title: "Gestalten", copy: "Wir entwickeln Struktur, Nutzerführung und Oberfläche in überprüfbaren Schritten." },
            { title: "Bauen und starten", copy: "Wir setzen das Erlebnis um, testen es sorgfältig und bereiten Übergabe und Weiterentwicklung vor." },
          ],
          faqHeading: "Häufige Fragen zu Websites & Apps",
          faqs: [
            { question: "Übernehmt ihr Design und Entwicklung?", answer: "Ja. Wir können Strategie, UX, UI Design und technische Umsetzung gemeinsam übernehmen oder an dem Punkt einsteigen, an dem dein Team Unterstützung braucht." },
            { question: "Könnt ihr mit unserer bestehenden Marke oder Technik arbeiten?", answer: "Ja. Wir prüfen zuerst, was tragfähig ist, und bauen darauf auf. Eine Erneuerung empfehlen wir nur dort, wo sie für das Ziel wirklich nötig ist." },
            { question: "Sind Analytics und Conversion-Optimierung enthalten?", answer: "Eine saubere Messgrundlage und wichtige Conversion-Prinzipien gehören zur Planung. Laufende Tests und Optimierung können anschließend passend zum Bedarf vereinbart werden." },
            { question: "Wem gehören Design und Quellcode?", answer: "Dir. Nach Abschluss erhält dein Team die freigegebenen Designs, den vereinbarten Quellcode, Inhalte, Produktionszugänge und die relevante Dokumentation." },
          ],
          finalTitle: "Planen wir dein nächstes digitales Produkt.",
          finalCopy: "Erzähl uns, was du aufbauen oder verbessern möchtest. Wir empfehlen einen klaren nächsten Schritt.",
          finalCta: "Projekt besprechen",
        },
      },
      {
        id: "seo-ai-visibility",
        name: "SEO & KI-Sichtbarkeit",
        navDescription: "In Suche und KI-Antworten besser gefunden werden.",
        summary: "Technisches SEO, Inhalte und KI-Sichtbarkeit als ein zusammenhängender Weg zu nachhaltiger Auffindbarkeit.",
        rows: [
          ["Ideal für", "Unternehmen mit einem guten Angebot, die in Suchmaschinen und relevanten KI-Antworten sichtbarer werden möchten."],
          ["Das Ergebnis", "Eine belastbare Grundlage, hilfreiche Inhalte und klare Prioritäten für bessere organische Auffindbarkeit."],
          ["Was dazugehört", "Technisches SEO, Suchintention, Content, lokale Suche, strukturierte Daten, KI-Sichtbarkeit und Messung."],
        ],
        cta: "SEO & KI-Sichtbarkeit entdecken",
        page: {
          metaDescription: "SEO und KI-Sichtbarkeit von Webpilot: technische Optimierung, Content, lokale Suche und bessere Auffindbarkeit in Suchmaschinen und KI-Antworten.",
          title: "Gefunden werden, wo Kunden nach Antworten suchen.",
          intro: "Wir verbessern Technik, Inhalte und Autorität für klassische Suche und relevante KI-gestützte Antworten.",
          outcomesHeading: "Sichtbarkeit mit Substanz",
          outcomesIntro: "Wir verbinden bewährte SEO-Grundlagen mit der Frage, wie deine Inhalte in neuen Sucherlebnissen verstanden und zitiert werden.",
          outcomes: [
            { title: "Eine auffindbare Grundlage", copy: "Technische Hindernisse werden sichtbar und wichtige Seiten können zuverlässig gefunden, verstanden und indexiert werden." },
            { title: "Inhalte für echte Suchintention", copy: "Themen und Seiten beantworten die Fragen, die potenzielle Kunden vor einer Entscheidung wirklich haben." },
            { title: "Klare Signale statt GEO-Hacks", copy: "Nachvollziehbare Informationen, Struktur und externe Belege stärken die Sichtbarkeit in Suche und KI-Antworten." },
          ],
          scopeHeading: "Was wir verbessern",
          scopeIntro: "Wir priorisieren die Arbeit nach Ausgangslage, Nachfrage und dem realistischen Potenzial deiner Website.",
          scopeGroups: [
            { title: "Technische Grundlage", items: ["Technische SEO-Audits", "Indexierung und interne Verlinkung", "Performance und Seitenerlebnis", "Strukturierte Daten"] },
            { title: "Inhalte & Autorität", items: ["Suchintention und Themenstrategie", "Seiten- und Content-Optimierung", "Lokale Suche", "Marken- und Vertrauenssignale"] },
            { title: "KI-Suche & Messung", items: ["Analyse relevanter KI-Antworten", "Informationsstruktur und Zitierfähigkeit", "Search Console und Analytics", "Regelmäßige Priorisierung"] },
          ],
          processHeading: "Lernen, priorisieren, verbessern",
          processIntro: "SEO wird als fortlaufendes System behandelt, nicht als einmalige Checkliste.",
          process: [
            { title: "Analysieren", copy: "Wir prüfen Technik, Inhalte, Nachfrage, Wettbewerbsumfeld und bestehende Sichtbarkeit." },
            { title: "Priorisieren", copy: "Wir ordnen Maßnahmen nach Wirkung, Aufwand und Abhängigkeiten in eine klare Reihenfolge." },
            { title: "Verbessern und messen", copy: "Wir setzen um, beobachten die Entwicklung und passen die nächsten Schritte an reale Daten an." },
          ],
          faqHeading: "Häufige Fragen zu SEO & KI-Sichtbarkeit",
          faqs: [
            { question: "Was bedeutet GEO?", answer: "GEO steht für Generative Engine Optimization. Gemeint ist die Sichtbarkeit in KI-gestützten Antworten. Wir behandeln sie als Erweiterung einer soliden SEO-, Content- und Markenstrategie, nicht als Sammlung kurzfristiger Tricks." },
            { question: "Wann sind Ergebnisse sichtbar?", answer: "Das hängt von Ausgangslage, Wettbewerb und Umfang ab. Technische Probleme lassen sich oft schnell beheben, während nachhaltige organische Sichtbarkeit kontinuierliche Arbeit und belastbare Inhalte erfordert." },
            { question: "Erstellt ihr auch Inhalte?", answer: "Ja. Wir können Themen planen, bestehende Inhalte verbessern und neue Seiten oder Beiträge entwickeln. Fachliche Aussagen stimmen wir eng mit deinem Team ab." },
            { question: "Könnt ihr lokale Suche verbessern?", answer: "Ja. Wenn lokale Nachfrage für dein Unternehmen wichtig ist, beziehen wir Standortseiten, Unternehmensprofile, lokale Signale und passende Suchintentionen ein." },
          ],
          finalTitle: "Machen wir dein Angebot leichter auffindbar.",
          finalCopy: "Wir prüfen, wo Sichtbarkeit verloren geht und welche nächsten Schritte das größte realistische Potenzial haben.",
          finalCta: "SEO-Projekt besprechen",
        },
      },
      {
        id: "paid-campaigns",
        name: "Werbekampagnen",
        navDescription: "Bezahlte Reichweite in qualifizierte Nachfrage verwandeln.",
        summary: "Strategie, Anzeigen, Creative, Landingpages und Tracking als durchgängiger Weg von Aufmerksamkeit zu Anfrage.",
        rows: [
          ["Ideal für", "Unternehmen mit einem überzeugenden Angebot, die über Google Ads oder Paid Social planbar Nachfrage erzeugen möchten."],
          ["Das Ergebnis", "Bessere Entscheidungsgrundlagen, schnellere Lernzyklen und ein klarer Weg von der Anzeige zur qualifizierten Anfrage."],
          ["Was dazugehört", "Kampagnenstrategie, Media Buying, Creative, Landingpages, Tracking, Attribution und CRM-Lead-Routing."],
        ],
        cta: "Werbekampagnen entdecken",
        page: {
          metaDescription: "Werbekampagnen von Webpilot: Google Ads, Paid Social, Creative, Landingpages, Tracking und laufende Optimierung für qualifizierte Nachfrage.",
          title: "Bezahlte Aufmerksamkeit in Nachfrage verwandeln.",
          intro: "Wir verbinden Strategie, Anzeigen, Landingpages und Messung zu einem klaren Akquisitionsweg.",
          outcomesHeading: "Die ganze Kampagne im Blick",
          outcomesIntro: "Gute Media-Performance entsteht nicht nur im Anzeigenkonto. Angebot, Creative und Conversion-Pfad müssen zusammenarbeiten.",
          outcomes: [
            { title: "Ein überzeugendes Angebot", copy: "Botschaft, Zielgruppe und nächster Schritt werden vor dem Skalieren klar definiert." },
            { title: "Schnellere Lernzyklen", copy: "Strukturierte Tests zeigen, welche Kombinationen aus Kanal, Creative und Landingpage funktionieren." },
            { title: "Messbare Nachfrage", copy: "Tracking und Lead-Routing verbinden Werbeausgaben mit den Anfragen, die für dein Unternehmen relevant sind." },
          ],
          scopeHeading: "Was eine Kampagne verbinden kann",
          scopeIntro: "Wir übernehmen den Teil des Akquisitionswegs, der für eine belastbare Kampagne nötig ist.",
          scopeGroups: [
            { title: "Strategie & Angebot", items: ["Ziele und Zielgruppen", "Angebots- und Botschaftsstrategie", "Kanal- und Budgetplanung", "Kampagnenstruktur"] },
            { title: "Creative & Ausspielung", items: ["Google Ads und Paid Social", "Anzeigenkonzepte und Creatives", "Landingpages", "Zielgruppen- und Angebotstests"] },
            { title: "Messung & Optimierung", items: ["Analytics und Conversion-Tracking", "Attribution und Reporting", "CRM-Lead-Routing", "Laufende Kampagnenoptimierung"] },
          ],
          processHeading: "Von der Hypothese zur Verbesserung",
          processIntro: "Jede Kampagne startet mit einer klaren Annahme und wird anhand echter Reaktionen weiterentwickelt.",
          process: [
            { title: "Ausrichten", copy: "Wir klären Angebot, Zielgruppe, Wirtschaftlichkeit und den relevanten Conversion-Pfad." },
            { title: "Starten und testen", copy: "Wir entwickeln Kampagnen, Creatives und Landingpages und testen die wichtigsten Annahmen." },
            { title: "Lernen und skalieren", copy: "Wir bewerten Ergebnisse, verbessern schwache Stellen und erhöhen Investitionen nur auf einer belastbaren Grundlage." },
          ],
          faqHeading: "Häufige Fragen zu Werbekampagnen",
          faqs: [
            { question: "Ist das Werbebudget im Honorar enthalten?", answer: "Nein. Media-Budget und unser Honorar werden transparent getrennt ausgewiesen. Auch weitere Drittanbieterkosten erscheinen im Angebot." },
            { question: "Welche Plattformen betreut ihr?", answer: "Je nach Ziel und Zielgruppe arbeiten wir insbesondere mit Google Ads und relevanten Paid-Social-Plattformen. Die Kanalauswahl folgt der Strategie, nicht einer festen Standardkombination." },
            { question: "Erstellt ihr auch Landingpages und Creatives?", answer: "Ja. Wenn der bestehende Conversion-Pfad nicht ausreicht, können Landingpage, Botschaft und Anzeigen-Creative Teil des Kampagnenumfangs sein." },
            { question: "Könnt ihr bestehende Werbekonten übernehmen?", answer: "Ja. Wir prüfen Struktur, Tracking, historische Daten und Zugänge, bevor wir festlegen, was übernommen, bereinigt oder neu aufgebaut werden sollte." },
          ],
          finalTitle: "Planen wir eine Kampagne mit klarer Grundlage.",
          finalCopy: "Erzähl uns von Angebot, Zielgruppe und bisheriger Akquise. Wir prüfen, welcher nächste Schritt sinnvoll ist.",
          finalCta: "Kampagne besprechen",
        },
      },
      {
        id: "ai-automation",
        name: "KI & Automatisierung",
        navDescription: "Wiederkehrende Arbeit reduzieren und Systeme verbinden.",
        summary: "Praktische KI-Funktionen und Automatisierungen, die Abläufe vereinfachen, Informationen verbinden und Teams entlasten.",
        rows: [
          ["Ideal für", "Unternehmen mit wiederkehrenden Aufgaben, getrennten Systemen oder einer konkreten Idee für eine nützliche KI-Funktion."],
          ["Das Ergebnis", "Ein nachvollziehbarer Ablauf, der manuelle Arbeit reduziert und sich sinnvoll in bestehende Systeme einfügt."],
          ["Was dazugehört", "Prozessanalyse, Prototypen, KI-Funktionen, Workflow-Automatisierung, CRM-Integrationen, Tests und Übergabe."],
        ],
        cta: "KI & Automatisierung entdecken",
        page: {
          metaDescription: "Praktische KI-Lösungen und Workflow-Automatisierung von Webpilot: Prozessanalyse, Prototypen, Integrationen, CRM-Automation und produktive KI-Funktionen.",
          title: "Praktische KI für bessere Abläufe.",
          intro: "Wir verbinden Systeme, automatisieren wiederkehrende Arbeit und entwickeln KI-Funktionen für konkrete Aufgaben.",
          outcomesHeading: "Technologie mit einem klaren Zweck",
          outcomesIntro: "Wir starten beim Ablauf und dem gewünschten Ergebnis, nicht bei einem bestimmten KI-Tool.",
          outcomes: [
            { title: "Weniger manuelle Übergaben", copy: "Informationen bewegen sich zuverlässig zwischen Formularen, Postfächern, CRM und internen Werkzeugen." },
            { title: "Schnellere Bearbeitung", copy: "Wiederkehrende Aufgaben werden vorbereitet oder automatisiert, während wichtige Entscheidungen sichtbar bleiben." },
            { title: "KI dort, wo sie hilft", copy: "Assistenten und produktintegrierte Funktionen lösen eine klar definierte Aufgabe statt nur einen Demo-Effekt zu erzeugen." },
          ],
          scopeHeading: "Was wir automatisieren und entwickeln",
          scopeIntro: "Der richtige Ansatz kann ein einfacher Workflow, eine Integration oder eine individuell entwickelte KI-Funktion sein.",
          scopeGroups: [
            { title: "Prozesse & Chancen", items: ["Ablauf- und Systemanalyse", "Priorisierung sinnvoller Automationen", "Daten- und Qualitätsanforderungen", "Prototypen und Machbarkeitstests"] },
            { title: "Automatisierung & Integration", items: ["Workflow-Automatisierung", "CRM- und Systemintegrationen", "Lead- und Dokumentenverarbeitung", "Benachrichtigungen und Reporting"] },
            { title: "KI-Funktionen", items: ["Interne Assistenten", "Suche und Wissenszugriff", "Produktintegrierte KI", "Tests, Leitplanken und Übergabe"] },
          ],
          processHeading: "Vom Engpass zum verlässlichen Ablauf",
          processIntro: "Kleine, überprüfbare Schritte reduzieren Risiko und zeigen früh, ob die Lösung im Alltag trägt.",
          process: [
            { title: "Ablauf verstehen", copy: "Wir dokumentieren Aufgabe, Systeme, Ausnahmen, Daten und die notwendige menschliche Kontrolle." },
            { title: "Lösung erproben", copy: "Wir bauen einen fokussierten Prototyp und prüfen Qualität, Nutzen und technische Grenzen." },
            { title: "Integrieren und absichern", copy: "Wir verbinden die Lösung mit dem echten Ablauf, machen Fehler sichtbar und dokumentieren die Übergabe." },
          ],
          faqHeading: "Häufige Fragen zu KI & Automatisierung",
          faqs: [
            { question: "Wann ist KI wirklich sinnvoll?", answer: "Wenn eine Aufgabe Sprache, unstrukturierte Informationen oder variable Entscheidungen umfasst, kann KI helfen. Für einfache, feste Regeln ist eine klassische Automatisierung oft zuverlässiger und günstiger." },
            { question: "Müssen wir unsere bestehenden Systeme ersetzen?", answer: "Meistens nicht. Wir prüfen zuerst vorhandene Werkzeuge und Schnittstellen und verbinden sie, wenn das stabiler und wirtschaftlicher ist als ein kompletter Neubau." },
            { question: "Wie geht ihr mit sensiblen Daten um?", answer: "Datenzugriff, Speicherung, Anbieter und menschliche Kontrolle werden vor der Umsetzung geklärt. Wir wählen den technischen Ansatz passend zu Risiko und rechtlichen Anforderungen." },
            { question: "Könnt ihr eine KI-Funktion in unsere Website oder App integrieren?", answer: "Ja. Wenn die Funktion einen klaren Nutzen hat, können Produktdesign, technische Integration, Nutzeroberfläche und Messung gemeinsam Teil des Projekts sein." },
          ],
          finalTitle: "Finden wir den sinnvollsten Automationsschritt.",
          finalCopy: "Zeig uns den Ablauf, der Zeit kostet oder regelmäßig stockt. Wir prüfen eine praktische Lösung.",
          finalCta: "Automation besprechen",
        },
      },
    ],
    webExperienceAnimation: {
      title: "Responsive Erlebnis",
      status: "Startbereit",
      desktopLabel: "Website",
      mobileLabel: "App",
      headline: "Klar. Schnell. Nutzbar.",
      cta: "Anfrage starten",
    },
    optimizationAnimation: {
      query: "Beste Agentur für digitales Wachstum",
      resultLabel: "Suchergebnisse",
      rankLabel: "Rang",
      topRankedLabel: "Top platziert",
      winnerDescription: "Digitale Systeme für profitables Wachstum",
      descriptions: ["Strategie und digitale Kampagnen", "Digitale Erlebnisse für wachsende Marken", "Performance Marketing und Optimierung"],
    },
    campaignAnimation: { metricLabel: "neue qualifizierte Anfragen" },
    automationAnimation: {
      title: "Automatisierter Ablauf",
      status: "Läuft",
      inputs: ["Formular", "Postfach", "CRM"],
      intelligence: "KI-Prüfung",
      outputs: ["Qualifiziert", "Aktualisiert", "Weitergeleitet"],
    },
  },
  en: {
    services: [
      {
        id: "websites-apps",
        name: "Websites & Apps",
        navDescription: "Plan, design, and build useful digital experiences.",
        summary: "Websites, web apps, and digital products from strategy and UX through development and launch.",
        rows: [
          ["Best for", "Businesses creating or replacing a website, app, or digital platform."],
          ["The outcome", "A fast, accessible, and persuasive digital experience designed around your customers and commercial goals."],
          ["What it can include", "Strategy, UX and UI design, development, CMS, analytics, integrations, and a strong conversion foundation."],
        ],
        cta: "Explore Websites & Apps",
        page: {
          metaDescription: "Websites, web apps, and digital products by Webpilot: strategy, UX/UI design, development, integrations, analytics, and launch support.",
          title: "Digital experiences built to perform.",
          intro: "We plan, design, and build fast, accessible websites and apps around your customers and commercial goals.",
          outcomesHeading: "More than a polished interface",
          outcomesIntro: "Design, technology, and conversion are planned together so the finished experience works in the real world.",
          outcomes: [
            { title: "A clear path to action", copy: "Content, navigation, and interactions help visitors understand the next useful step." },
            { title: "Fast and accessible", copy: "The experience works reliably across devices and for as many people as possible." },
            { title: "Ready to evolve", copy: "Clean systems, useful integrations, and measurable foundations make future improvements easier." },
          ],
          scopeHeading: "What we design and build",
          scopeIntro: "The exact scope follows your goal. These areas can form part of the project.",
          scopeGroups: [
            { title: "Strategy & UX", items: ["Goals, audiences, and user journeys", "Information architecture and content", "Prototypes and user testing", "Technical planning"] },
            { title: "Design & development", items: ["UX and UI design", "Responsive websites", "Web apps and digital products", "CMS and frontend development"] },
            { title: "Launch & improvement", items: ["Analytics and consent setup", "CRM and API integrations", "Conversion foundations", "Launch, handover, and support"] },
          ],
          processHeading: "From idea to launch",
          processIntro: "A focused process creates clarity early and keeps decisions easy to follow.",
          process: [
            { title: "Understand", copy: "We clarify the goal, audience, existing systems, and the most important requirements." },
            { title: "Design", copy: "We develop the structure, user journey, and interface in steps that can be reviewed." },
            { title: "Build and launch", copy: "We deliver the experience, test it carefully, and prepare the handover and next improvements." },
          ],
          faqHeading: "Common questions about Websites & Apps",
          faqs: [
            { question: "Do you handle both design and development?", answer: "Yes. We can cover strategy, UX, UI design, and technical delivery together, or join at the point where your team needs support." },
            { question: "Can you work with our existing brand or technology?", answer: "Yes. We first assess what is sound and build on it. We only recommend replacing something when the project goal genuinely requires it." },
            { question: "Are analytics and conversion optimization included?", answer: "A sound measurement setup and important conversion principles are part of the planning. Ongoing testing and improvement can be scoped afterward when useful." },
            { question: "Who owns the designs and source code?", answer: "You do. At completion, your team receives the approved designs, agreed source code, content, production access, and relevant documentation." },
          ],
          finalTitle: "Let’s plan your next digital product.",
          finalCopy: "Tell us what you want to build or improve. We will recommend a clear next step.",
          finalCta: "Discuss your project",
        },
      },
      {
        id: "seo-ai-visibility",
        name: "SEO & AI Visibility",
        navDescription: "Be found in search results and AI answers.",
        summary: "Technical SEO, content, and AI visibility working together to create durable discoverability.",
        rows: [
          ["Best for", "Businesses with a strong offer that need greater visibility in search engines and relevant AI answers."],
          ["The outcome", "A sound foundation, useful content, and clear priorities for stronger organic discoverability."],
          ["What it can include", "Technical SEO, search intent, content, local search, structured data, AI visibility, and measurement."],
        ],
        cta: "Explore SEO & AI Visibility",
        page: {
          metaDescription: "SEO and AI visibility by Webpilot: technical optimization, content, local search, and stronger discoverability in search engines and AI answers.",
          title: "Be found where customers look for answers.",
          intro: "We improve technology, content, and authority for traditional search and relevant AI-powered answers.",
          outcomesHeading: "Visibility with substance",
          outcomesIntro: "We connect proven SEO foundations with how your information is understood and cited in new search experiences.",
          outcomes: [
            { title: "A discoverable foundation", copy: "Technical barriers become visible and important pages can be found, understood, and indexed reliably." },
            { title: "Content for real search intent", copy: "Topics and pages answer the questions potential customers genuinely have before making a decision." },
            { title: "Clear signals, not GEO hacks", copy: "Useful information, sound structure, and external evidence strengthen visibility in search and AI answers." },
          ],
          scopeHeading: "What we improve",
          scopeIntro: "We prioritize the work around your starting point, real demand, and the realistic potential of your website.",
          scopeGroups: [
            { title: "Technical foundation", items: ["Technical SEO audits", "Indexing and internal linking", "Performance and page experience", "Structured data"] },
            { title: "Content & authority", items: ["Search intent and topic strategy", "Page and content optimization", "Local search", "Brand and trust signals"] },
            { title: "AI search & measurement", items: ["Analysis of relevant AI answers", "Information structure and citability", "Search Console and analytics", "Regular prioritization"] },
          ],
          processHeading: "Learn, prioritize, improve",
          processIntro: "SEO is treated as an ongoing system, not a one-time checklist.",
          process: [
            { title: "Analyze", copy: "We examine technology, content, demand, competitors, and your existing visibility." },
            { title: "Prioritize", copy: "We order the work by likely impact, effort, and dependencies." },
            { title: "Improve and measure", copy: "We implement, observe the development, and adjust the next steps using real data." },
          ],
          faqHeading: "Common questions about SEO & AI Visibility",
          faqs: [
            { question: "What does GEO mean?", answer: "GEO stands for Generative Engine Optimization. It refers to visibility in AI-powered answers. We treat it as an extension of sound SEO, content, and brand strategy, not a collection of short-term tricks." },
            { question: "When will we see results?", answer: "That depends on your starting point, competition, and scope. Technical problems can often be corrected quickly, while durable organic visibility requires sustained work and useful content." },
            { question: "Can you create the content too?", answer: "Yes. We can plan topics, improve existing content, and develop new pages or articles. We validate specialist claims closely with your team." },
            { question: "Can you improve local search visibility?", answer: "Yes. When local demand matters, we include location pages, business profiles, local signals, and the relevant search intent." },
          ],
          finalTitle: "Make your offer easier to find.",
          finalCopy: "We will identify where visibility is being lost and which next steps have the strongest realistic potential.",
          finalCta: "Discuss your SEO project",
        },
      },
      {
        id: "paid-campaigns",
        name: "Paid Campaigns",
        navDescription: "Turn paid reach into qualified demand.",
        summary: "Strategy, ads, creative, landing pages, and tracking connected from first impression to inquiry.",
        rows: [
          ["Best for", "Businesses with a persuasive offer that want to create predictable demand through Google Ads or paid social."],
          ["The outcome", "Clearer acquisition decisions, faster learning cycles, and a direct path from ad to qualified inquiry."],
          ["What it can include", "Campaign strategy, media buying, creative, landing pages, tracking, attribution, and CRM lead routing."],
        ],
        cta: "Explore Paid Campaigns",
        page: {
          metaDescription: "Paid campaigns by Webpilot: Google Ads, paid social, creative, landing pages, tracking, and ongoing optimization for qualified demand.",
          title: "Turn paid attention into demand.",
          intro: "We connect strategy, ads, landing pages, and measurement into one clear acquisition path.",
          outcomesHeading: "See the whole campaign",
          outcomesIntro: "Strong media performance is not created inside an ad account alone. The offer, creative, and conversion path must work together.",
          outcomes: [
            { title: "A persuasive offer", copy: "The message, audience, and next action are made clear before spending is scaled." },
            { title: "Faster learning cycles", copy: "Structured tests reveal which combinations of channel, creative, and landing page work." },
            { title: "Measurable demand", copy: "Tracking and lead routing connect advertising spend to the inquiries that matter to your business." },
          ],
          scopeHeading: "What a campaign can connect",
          scopeIntro: "We take responsibility for the parts of the acquisition path needed to make the campaign credible.",
          scopeGroups: [
            { title: "Strategy & offer", items: ["Goals and audiences", "Offer and message strategy", "Channel and budget planning", "Campaign structure"] },
            { title: "Creative & delivery", items: ["Google Ads and paid social", "Ad concepts and creative", "Landing pages", "Audience and offer tests"] },
            { title: "Measurement & improvement", items: ["Analytics and conversion tracking", "Attribution and reporting", "CRM lead routing", "Ongoing campaign optimization"] },
          ],
          processHeading: "From hypothesis to improvement",
          processIntro: "Every campaign begins with a clear assumption and develops through real audience response.",
          process: [
            { title: "Align", copy: "We clarify the offer, audience, economics, and the relevant conversion path." },
            { title: "Launch and test", copy: "We develop campaigns, creative, and landing pages and test the most important assumptions." },
            { title: "Learn and scale", copy: "We evaluate results, improve weak points, and increase investment only when the foundation supports it." },
          ],
          faqHeading: "Common questions about Paid Campaigns",
          faqs: [
            { question: "Is advertising spend included in your fee?", answer: "No. Media spend and our fee are shown separately and transparently. Any other third-party costs are also included in the proposal." },
            { question: "Which platforms do you manage?", answer: "Depending on the goal and audience, we work primarily with Google Ads and relevant paid social platforms. Channel selection follows the strategy rather than a fixed bundle." },
            { question: "Do you also create landing pages and ad creative?", answer: "Yes. When the existing conversion path is not strong enough, the landing page, message, and advertising creative can form part of the campaign scope." },
            { question: "Can you take over existing advertising accounts?", answer: "Yes. We review the structure, tracking, historical data, and access before deciding what should be retained, corrected, or rebuilt." },
          ],
          finalTitle: "Plan a campaign on a clear foundation.",
          finalCopy: "Tell us about your offer, audience, and current acquisition. We will identify a sensible next step.",
          finalCta: "Discuss a campaign",
        },
      },
      {
        id: "ai-automation",
        name: "AI & Automation",
        navDescription: "Reduce repetitive work and connect your systems.",
        summary: "Practical AI features and automations that simplify workflows, connect information, and give teams time back.",
        rows: [
          ["Best for", "Businesses with repetitive work, disconnected systems, or a specific idea for a useful AI feature."],
          ["The outcome", "A dependable workflow that reduces manual effort and fits sensibly into your existing systems."],
          ["What it can include", "Process analysis, prototypes, AI features, workflow automation, CRM integrations, testing, and handover."],
        ],
        cta: "Explore AI & Automation",
        page: {
          metaDescription: "Practical AI solutions and workflow automation by Webpilot: process analysis, prototypes, integrations, CRM automation, and useful AI features.",
          title: "Put practical AI to work.",
          intro: "We connect systems, automate repetitive work, and build AI features for clearly defined tasks.",
          outcomesHeading: "Technology with a clear purpose",
          outcomesIntro: "We begin with the workflow and desired result, not with a particular AI tool.",
          outcomes: [
            { title: "Fewer manual handoffs", copy: "Information moves reliably between forms, inboxes, CRM platforms, and internal tools." },
            { title: "Faster handling", copy: "Repetitive work is prepared or automated while important decisions remain visible." },
            { title: "AI where it helps", copy: "Assistants and product features solve one defined task instead of creating a temporary demo effect." },
          ],
          scopeHeading: "What we automate and build",
          scopeIntro: "The right answer may be a simple workflow, an integration, or a custom AI feature.",
          scopeGroups: [
            { title: "Processes & opportunities", items: ["Workflow and system analysis", "Prioritization of useful automation", "Data and quality requirements", "Prototypes and feasibility tests"] },
            { title: "Automation & integration", items: ["Workflow automation", "CRM and system integrations", "Lead and document processing", "Notifications and reporting"] },
            { title: "AI features", items: ["Internal assistants", "Search and knowledge access", "AI inside digital products", "Testing, safeguards, and handover"] },
          ],
          processHeading: "From bottleneck to dependable workflow",
          processIntro: "Small, testable steps reduce risk and show early whether the solution works in daily use.",
          process: [
            { title: "Understand the workflow", copy: "We document the task, systems, exceptions, data, and necessary human control." },
            { title: "Test the solution", copy: "We build a focused prototype and assess its quality, value, and technical limits." },
            { title: "Integrate and safeguard", copy: "We connect the solution to the real workflow, make failures visible, and document the handover." },
          ],
          faqHeading: "Common questions about AI & Automation",
          faqs: [
            { question: "When is AI genuinely useful?", answer: "AI can help when a task involves language, unstructured information, or variable decisions. For simple fixed rules, conventional automation is often more dependable and economical." },
            { question: "Do we need to replace our existing systems?", answer: "Usually not. We first assess your current tools and interfaces and connect them when that is more stable and economical than replacing everything." },
            { question: "How do you handle sensitive data?", answer: "Data access, storage, providers, and human control are agreed before delivery. We choose the technical approach according to the risk and applicable legal requirements." },
            { question: "Can you add an AI feature to our website or app?", answer: "Yes. When the feature has a clear purpose, product design, technical integration, interface, and measurement can be delivered as one project." },
          ],
          finalTitle: "Find the most useful automation step.",
          finalCopy: "Show us the workflow that consumes time or regularly stalls. We will assess a practical solution.",
          finalCta: "Discuss automation",
        },
      },
    ],
    webExperienceAnimation: {
      title: "Responsive experience",
      status: "Launch ready",
      desktopLabel: "Website",
      mobileLabel: "App",
      headline: "Clear. Fast. Useful.",
      cta: "Start an inquiry",
    },
    optimizationAnimation: {
      query: "Best digital growth agency",
      resultLabel: "Search results",
      rankLabel: "Rank",
      topRankedLabel: "Top ranked",
      winnerDescription: "Digital systems for profitable growth",
      descriptions: ["Strategy and digital campaigns", "Digital experiences for growing brands", "Performance marketing and optimization"],
    },
    campaignAnimation: { metricLabel: "new qualified inquiries" },
    automationAnimation: {
      title: "Automated workflow",
      status: "Running",
      inputs: ["Form", "Inbox", "CRM"],
      intelligence: "AI review",
      outputs: ["Qualified", "Updated", "Routed"],
    },
  },
} satisfies Record<Locale, ServicesCopy>;

export function getServiceCopy(locale: Locale, id: ServiceId): ServiceCopy {
  const service = servicesContent[locale].services.find((entry) => entry.id === id);
  if (!service) throw new Error(`Missing ${id} service copy for ${locale}.`);
  return service;
}
