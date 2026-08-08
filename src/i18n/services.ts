import type { Locale } from "@/lib/i18n";
import { frServices } from "./services-fr";

export type ServiceId = "websites-apps" | "seo-ai-visibility" | "paid-campaigns" | "ai-automation";

export type WebExperienceAnimationCopy = {
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
  trigger: string;
  agent: string;
  extract: string;
  condition: string;
  success: string;
  notify: string;
  fallback: string;
  model: string;
  context: string;
  research: string;
  yes: string;
  review: string;
};

type CopyRow = readonly [label: string, copy: string];
type ContentItem = { title: string; copy: string };
export type ScopeGroup = { title: string; copy: string; items: readonly string[] };
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
          ["Was dazugehört", "Strategie, UX und UI Design, Entwicklung, CMS, kundennahe Integrationen und eine solide technische Messgrundlage."],
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
          scopeHeading: "Was wir entwickeln",
          scopeIntro: "Dieser Service verantwortet das sichtbare digitale Erlebnis: Struktur, Oberfläche und technische Umsetzung. Organische Sichtbarkeit, laufende Kampagnen und nachgelagerte Automatisierung werden bei Bedarf als klar abgegrenzte Services eingebunden.",
          scopeGroups: [
            {
              title: "Marketing-Websites",
              copy: "Mehrseitige Websites, die ein Angebot verständlich erklären, Vertrauen aufbauen und Besucher gezielt zur nächsten Handlung führen.",
              items: ["Informationsarchitektur und Nutzerwege", "UX und UI Design", "CMS und redaktionelle Komponenten", "Technische Grundlage für Performance, Barrierefreiheit und Messung"],
            },
            {
              title: "Landingpages",
              copy: "Fokussierte Seiten für Kampagnen, Produkte oder Markteintritte. Wir verantworten Botschaftsstruktur, Nutzerführung und Umsetzung; laufende Media- und Kampagnenoptimierung gehört zu Werbekampagnen.",
              items: ["Angebots- und Botschaftsstruktur", "Responsive Design und Entwicklung", "Formulare und Terminbuchung", "Conversion-Tracking als technische Grundlage"],
            },
            {
              title: "E-Commerce & Onlineshops",
              copy: "Verkaufsstarke Einkaufserlebnisse für Produkte, Abonnements oder digitale Angebote, passend zu Sortiment und internen Abläufen.",
              items: ["Shop- und Produktseiten-UX", "Warenkorb und Checkout", "Zahlungs-, Versand- und Systemintegrationen", "E-Commerce-Tracking und Consent"],
            },
            {
              title: "Apps & Kundenportale",
              copy: "Web- und native Apps für Self-Service, Zusammenarbeit oder interne Abläufe, entwickelt für deine Nutzer und sinnvoll mit bestehenden Systemen verbunden.",
              items: ["Product Discovery und Prototypen", "Web-, Cross-Platform- und native App-Entwicklung", "Authentifizierte Bereiche und Nutzerkonten", "Daten-, API- und Systemintegrationen"],
            },
            {
              title: "Content-Plattformen",
              copy: "Redaktionelle Systeme für Teams, die Inhalte zuverlässig erstellen, prüfen und über mehrere Seitentypen oder Kanäle ausspielen müssen.",
              items: ["CMS-Architektur und Inhaltsmodelle", "Rollen und redaktionelle Freigaben", "Wiederverwendbare Komponenten", "Migration und kontrollierter Launch"],
            },
            {
              title: "Formular- & Buchungserlebnisse",
              copy: "Kundennahe Abläufe für Anfragen, Qualifizierung und Termine. Wir gestalten und bauen den sichtbaren Weg; CRM-Routing, Anreicherung und Follow-up gehören zu KI & Automatisierung.",
              items: ["Mehrstufige Formulare", "Nutzerfreundliche Qualifizierung", "Termin- und Kalenderintegration", "Saubere Übergabe an verbundene Systeme"],
            },
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
            { question: "Sind Analytics und Conversion-Optimierung enthalten?", answer: "Eine saubere technische Messgrundlage und wichtige Conversion-Prinzipien gehören zur Planung. Laufende Kampagnentests werden über Werbekampagnen betreut; organische Messung und Suchoptimierung über SEO & KI-Sichtbarkeit." },
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
          scopeHeading: "Wie wir Sichtbarkeit verbessern",
          scopeIntro: "Dieser Service verantwortet organische Auffindbarkeit in Suche und relevanten KI-Antworten. Größere Website-Umbauten und laufende Werbemaßnahmen bleiben klar bei Websites & Apps beziehungsweise Werbekampagnen verortet.",
          scopeGroups: [
            {
              title: "Technisches SEO",
              copy: "Wir diagnostizieren und priorisieren technische Hindernisse, damit wichtige Seiten zuverlässig gecrawlt, verstanden und indexiert werden können. Größere technische Umbauten werden mit Websites & Apps umgesetzt.",
              items: ["Technischer SEO-Audit", "Crawling und Indexierung", "Interne Verlinkung und strukturierte Daten", "Suchrelevante Performance-Prioritäten"],
            },
            {
              title: "Suchintention & Themen",
              copy: "Wir ermitteln, wonach potenzielle Kunden suchen und welche Seiten ihre Fragen entlang der Entscheidungsreise beantworten müssen.",
              items: ["Keyword- und Suchintention-Analyse", "Wettbewerbs- und Content-Gap-Analyse", "Themenstruktur und Priorisierung", "Seiten- und Content-Planung"],
            },
            {
              title: "Onpage & Content",
              copy: "Bestehende und neue Inhalte werden für organische Suchintention strukturiert. UX, visuelles Design und technische Seitenentwicklung bleiben Teil von Websites & Apps.",
              items: ["Optimierung wichtiger Seiten", "Suchorientierte Service-Inhalte", "Content-Briefings und redaktionelle Planung", "Metadaten und interne Verlinkung"],
            },
            {
              title: "Lokale Sichtbarkeit",
              copy: "Für regional tätige Unternehmen stärken wir die Signale, die bei standortbezogenen Suchen und Karten-Ergebnissen relevant sind.",
              items: ["Google-Unternehmensprofil", "Standort- und Leistungsseiten", "Maps und lokale Verzeichnisse", "Bewertungs- und Reputationsstrategie"],
            },
            {
              title: "KI-Suche & GEO",
              copy: "Wir verbessern Klarheit, Struktur und Belegbarkeit deiner Informationen für relevante KI-Antworten und neue Sucherlebnisse.",
              items: ["Analyse relevanter KI-Antworten", "Marken-, Themen- und Entitätssignale", "Zitierfähige Inhalte und Quellen", "Strukturierte Informationen und externe Belege"],
            },
            {
              title: "Messung & Weiterentwicklung",
              copy: "Organische Sichtbarkeit wird nicht nur über Rankings bewertet. Wir verbinden Suchdaten mit relevanten Besuchen, Handlungen und Geschäftszielen, getrennt von bezahlter Kampagnenattribution.",
              items: ["Search Console und organische Analytics", "Ranking- und Sichtbarkeitsmonitoring", "Organische Conversion- und Nachfrageauswertung", "Regelmäßige Priorisierung"],
            },
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
        summary: "Strategie, Anzeigen, Creative, Kampagnenoptimierung und Messung als durchgängiger Weg von bezahlter Aufmerksamkeit zu qualifizierter Anfrage.",
        rows: [
          ["Ideal für", "Unternehmen mit einem überzeugenden Angebot, die über Google Ads oder Paid Social planbar Nachfrage erzeugen möchten."],
          ["Das Ergebnis", "Bessere Entscheidungsgrundlagen, schnellere Lernzyklen und ein klarer Weg von der Anzeige zur qualifizierten Anfrage."],
          ["Was dazugehört", "Kampagnenstrategie, Media Buying, Creative, Conversion-Optimierung, Attribution und eine definierte Übergabe qualifizierter Leads."],
        ],
        cta: "Werbekampagnen entdecken",
        page: {
          metaDescription: "Werbekampagnen von Webpilot: Google Ads, Paid Social, Creative, Conversion-Optimierung, Tracking und laufende Verbesserung für qualifizierte Nachfrage.",
          title: "Bezahlte Aufmerksamkeit in Nachfrage verwandeln.",
          intro: "Wir verbinden Strategie, Anzeigen, Conversion-Pfade und Messung zu einem klaren Akquisitionsweg.",
          outcomesHeading: "Die ganze Kampagne im Blick",
          outcomesIntro: "Gute Media-Performance entsteht nicht nur im Anzeigenkonto. Angebot, Creative und Conversion-Pfad müssen zusammenarbeiten.",
          outcomes: [
            { title: "Ein überzeugendes Angebot", copy: "Botschaft, Zielgruppe und nächster Schritt werden vor dem Skalieren klar definiert." },
            { title: "Schnellere Lernzyklen", copy: "Strukturierte Tests zeigen, welche Kombinationen aus Kanal, Creative und Conversion-Pfad funktionieren." },
            { title: "Messbare Nachfrage", copy: "Tracking und eine definierte Lead-Übergabe verbinden Werbeausgaben mit den Anfragen, die für dein Unternehmen relevant sind." },
          ],
          scopeHeading: "Was wir für Kampagnen entwickeln",
          scopeIntro: "Dieser Service verantwortet bezahlte Akquise vom Kanal bis zur Kampagnenauswertung. Neue Landingpages werden mit Websites & Apps gebaut; CRM-Automation nach der Übergabe gehört zu KI & Automatisierung.",
          scopeGroups: [
            {
              title: "Kampagnenstrategie & Angebot",
              copy: "Vor dem Media-Einsatz klären wir Zielgruppe, Botschaft, Wirtschaftlichkeit und den nächsten sinnvollen Schritt für Interessenten.",
              items: ["Ziele und Zielgruppen", "Angebots- und Botschaftsstrategie", "Kanal- und Budgetplanung", "Kampagnen- und Teststruktur"],
            },
            {
              title: "Google Search & Shopping",
              copy: "Suchkampagnen erreichen Menschen mit konkreter Nachfrage. Shopping ergänzt den Ansatz, wenn Produkte und Daten dafür geeignet sind.",
              items: ["Keyword- und Nachfrageanalyse", "Search- und Shopping-Kampagnen", "Anzeigen und Erweiterungen", "Gebots-, Budget- und Suchanfragensteuerung"],
            },
            {
              title: "Social Ads",
              copy: "Bezahlte Social-Kampagnen schaffen Nachfrage mit Zielgruppen, Formaten und Botschaften, die zum jeweiligen Kanal passen.",
              items: ["Kanal- und Zielgruppenauswahl", "Prospecting und Retargeting", "Kampagnen- und Anzeigensets", "Platzierungs- und Budgetoptimierung"],
            },
            {
              title: "Creative & Botschaften",
              copy: "Wir entwickeln Anzeigenkonzepte und Varianten, die den Nutzen des Angebots schnell verständlich und testbar machen.",
              items: ["Creative- und Messaging-Konzepte", "Statische, Video- und Textvarianten", "Angebots- und Hook-Tests", "Lernplan für neue Creatives"],
            },
            {
              title: "Kampagnenpfade & CRO",
            copy: "Wir optimieren nach dem Anzeigenklick Botschaft, Formular und Qualifizierung innerhalb des vorhandenen Kampagnenpfads. Neue Seiten werden über Websites & Apps konzipiert und gebaut.",
              items: ["Übergang von Anzeige zu Angebot", "Kampagnenbezogene Lead-Qualifizierung", "Funnel- und Conversion-Optimierung", "Testhypothesen und Auswertung"],
            },
            {
              title: "Kampagnenmessung & Lead-Übergabe",
              copy: "Messung verbindet Media-Ausgaben mit echten Ergebnissen. Wir definieren und prüfen die Übergabe; Anreicherung, CRM-Routing und automatisiertes Follow-up werden über KI & Automatisierung umgesetzt.",
              items: ["Kampagnen- und Conversion-Tracking", "Consent und Plattform-Signale", "Attribution und Reporting", "Übergabekriterien und Lead-Qualität"],
            },
          ],
          processHeading: "Von der Hypothese zur Verbesserung",
          processIntro: "Jede Kampagne startet mit einer klaren Annahme und wird anhand echter Reaktionen weiterentwickelt.",
          process: [
            { title: "Ausrichten", copy: "Wir klären Angebot, Zielgruppe, Wirtschaftlichkeit und den relevanten Conversion-Pfad." },
            { title: "Starten und testen", copy: "Wir starten Kampagnen und Creatives und testen die wichtigsten Annahmen entlang des vereinbarten Conversion-Pfads." },
            { title: "Lernen und skalieren", copy: "Wir bewerten Ergebnisse, verbessern schwache Stellen und erhöhen Investitionen nur auf einer belastbaren Grundlage." },
          ],
          faqHeading: "Häufige Fragen zu Werbekampagnen",
          faqs: [
            { question: "Ist das Werbebudget im Honorar enthalten?", answer: "Nein. Media-Budget und unser Honorar werden transparent getrennt ausgewiesen. Auch weitere Drittanbieterkosten erscheinen im Angebot." },
            { question: "Welche Plattformen betreut ihr?", answer: "Je nach Ziel und Zielgruppe arbeiten wir insbesondere mit Google Ads und relevanten Paid-Social-Plattformen. Die Kanalauswahl folgt der Strategie, nicht einer festen Standardkombination." },
            { question: "Optimiert ihr auch den Conversion-Pfad und Anzeigen-Creatives?", answer: "Ja. Wir stimmen Anzeigenbotschaft, vorhandene Seite und Formulare aufeinander ab und optimieren den Weg im Kampagnenumfang. Wenn eine neue Landingpage gestaltet und entwickelt werden muss, erfolgt das über Websites & Apps." },
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
        summary: "Praktische KI-Funktionen und Automatisierungen für die Abläufe hinter Formularen, Postfächern, CRM-Systemen und digitalen Produkten.",
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
          scopeIntro: "Dieser Service verantwortet interne Abläufe, Systemübergaben und klar definierte KI-Funktionen. Die sichtbare Website- oder App-Oberfläche wird bei Bedarf gemeinsam mit Websites & Apps geliefert.",
          scopeGroups: [
            {
              title: "Workflow-Automatisierung",
              copy: "Wiederkehrende Abläufe werden über klare Regeln automatisiert, damit Informationen zuverlässig weitergegeben und Aufgaben angestoßen werden.",
              items: ["Ablauf- und Systemanalyse", "Trigger, Regeln und Freigaben", "Benachrichtigungen und Aufgaben", "Fehlerpfade und manuelle Kontrolle"],
            },
            {
              title: "CRM & Lead-Prozesse",
              copy: "Nach der Übergabe aus Website oder Kampagne werden neue Kontakte ergänzt, bewertet und an den passenden Vertriebs- oder Serviceprozess weitergegeben.",
              items: ["Formular- und CRM-Übergabe", "Lead-Anreicherung und systemische Qualifizierung", "Routing und automatisiertes Follow-up", "Pipeline- und Statusautomatisierung"],
            },
            {
              title: "Dokumente & Kommunikation",
              copy: "KI kann Inhalte aus E-Mails und Dokumenten erfassen, strukturieren und für die weitere Bearbeitung vorbereiten.",
              items: ["E-Mail- und Postfachverarbeitung", "Dokumentenklassifizierung", "Datenextraktion und Zusammenfassungen", "Entwürfe und Freigabeprozesse"],
            },
            {
              title: "Interne KI-Assistenten",
              copy: "Teams erhalten einen kontrollierten Zugang zu internem Wissen, Richtlinien und Informationen aus verbundenen Quellen.",
              items: ["Wissenssuche und Frage-Antwort-Systeme", "Quellenangaben und Berechtigungen", "Rollenbezogene Assistenten", "Qualitätstests und Feedback"],
            },
            {
              title: "KI-Funktionen in Websites & Apps",
              copy: "Nützliche KI-Funktionen werden auf eine klar definierte Nutzeraufgabe ausgerichtet. KI-Logik und Modellintegration liegen hier; das umgebende Produkterlebnis entsteht mit Websites & Apps.",
              items: ["Aufgabe und Qualitätskriterien", "Prototypen und Machbarkeitstests", "Modell- und API-Integration", "Nutzung, Kosten und Qualitätsmessung"],
            },
            {
              title: "Integrationen & sicherer Betrieb",
              copy: "Systeme, Daten und Anbieter werden mit sichtbaren Fehlern, angemessenen Zugriffsrechten und einer dokumentierten Übergabe verbunden.",
              items: ["API- und Systemintegrationen", "Datenzugriff und Berechtigungen", "Monitoring, Protokolle und Warnungen", "Leitplanken, Dokumentation und Übergabe"],
            },
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
            { question: "Könnt ihr eine KI-Funktion in unsere Website oder App integrieren?", answer: "Ja. KI-Logik, Modellintegration und Qualitätsmessung werden über KI & Automatisierung betreut. Produktkonzept, Oberfläche und das umgebende Nutzererlebnis entstehen bei Bedarf gemeinsam mit Websites & Apps." },
          ],
          finalTitle: "Finden wir den sinnvollsten Automationsschritt.",
          finalCopy: "Zeig uns den Ablauf, der Zeit kostet oder regelmäßig stockt. Wir prüfen eine praktische Lösung.",
          finalCta: "Automation besprechen",
        },
      },
    ],
    webExperienceAnimation: {
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
      trigger: "Formular erhalten",
      agent: "KI Agent",
      extract: "Analysiert die Anfrage",
      condition: "Qualifiziert?",
      success: "Lead im CRM anlegen",
      notify: "Vertrieb informieren",
      fallback: "Manuell prüfen",
      model: "KI",
      context: "CRM",
      research: "Web",
      yes: "Ja",
      review: "Prüfen",
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
          ["What it can include", "Strategy, UX and UI design, development, CMS, customer-facing integrations, and a sound technical measurement foundation."],
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
          scopeHeading: "What we build",
          scopeIntro: "This service owns the visible digital experience: structure, interface, and technical delivery. Organic visibility, ongoing campaigns, and downstream automation are added as clearly defined services when needed.",
          scopeGroups: [
            {
              title: "Marketing websites",
              copy: "Multi-page websites that explain your offer clearly, build trust, and guide visitors toward a meaningful next action.",
              items: ["Information architecture and user journeys", "UX and UI design", "CMS and editorial components", "Technical foundation for performance, accessibility, and measurement"],
            },
            {
              title: "Landing pages",
              copy: "Focused pages for campaigns, products, or market launches. We own message structure, user journey, and delivery; ongoing media and campaign optimization belongs to Paid Campaigns.",
              items: ["Offer and message structure", "Responsive design and development", "Forms and scheduling", "Conversion tracking as a technical foundation"],
            },
            {
              title: "E-commerce experiences",
              copy: "Useful shopping experiences for products, subscriptions, or digital offers, designed around your catalogue and operational workflow.",
              items: ["Storefront and product-page UX", "Cart and checkout", "Payment, shipping, and system integrations", "E-commerce tracking and consent"],
            },
            {
              title: "Applications & customer portals",
              copy: "Web and native applications for self-service, collaboration, or internal workflows, designed around your users and connected to existing systems.",
              items: ["Product discovery and prototypes", "Web, cross-platform, and native development", "Authenticated experiences and user accounts", "Data, API, and system integrations"],
            },
            {
              title: "Content platforms",
              copy: "Editorial systems for teams that need to create, review, and publish content reliably across multiple page types or channels.",
              items: ["CMS architecture and content models", "Roles and editorial approvals", "Reusable components", "Migration and controlled launch"],
            },
            {
              title: "Form & booking experiences",
              copy: "Customer-facing journeys for inquiries, qualification, and appointments. We design and build the visible path; CRM routing, enrichment, and follow-up belong to AI & Automation.",
              items: ["Multi-step forms", "User-friendly qualification", "Scheduling and calendar integration", "Clean handoff to connected systems"],
            },
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
            { question: "Are analytics and conversion optimization included?", answer: "A sound technical measurement foundation and important conversion principles are included in the planning. Ongoing campaign testing is handled through Paid Campaigns; organic measurement and search optimization through SEO & AI Visibility." },
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
          scopeHeading: "How we improve visibility",
          scopeIntro: "This service owns organic discoverability in search and relevant AI answers. Larger website changes and ongoing advertising remain clearly assigned to Websites & Apps and Paid Campaigns respectively.",
          scopeGroups: [
            {
              title: "Technical SEO",
              copy: "We diagnose and prioritize technical barriers so important pages can be crawled, understood, and indexed reliably. Larger technical changes are delivered with Websites & Apps.",
              items: ["Technical SEO audit", "Crawling and indexation", "Internal linking and structured data", "Search-related performance priorities"],
            },
            {
              title: "Search intent & topics",
              copy: "We identify what potential customers search for and which pages must answer their questions throughout the decision journey.",
              items: ["Keyword and search-intent research", "Competitor and content-gap analysis", "Topic structure and prioritization", "Page and content planning"],
            },
            {
              title: "On-page SEO & content",
              copy: "Existing and new content is structured around organic search intent. UX, visual design, and technical page delivery remain part of Websites & Apps.",
              items: ["Optimization of priority pages", "Search-led service content", "Content briefs and editorial planning", "Metadata and internal linking"],
            },
            {
              title: "Local visibility",
              copy: "For location-based businesses, we strengthen the signals that matter in local searches and map results.",
              items: ["Google Business Profile", "Location and service pages", "Maps and local directories", "Review and reputation strategy"],
            },
            {
              title: "AI search & GEO",
              copy: "We improve the clarity, structure, and support behind your information for relevant AI answers and emerging search experiences.",
              items: ["Analysis of relevant AI answers", "Brand, topic, and entity signals", "Citable content and sources", "Structured information and external evidence"],
            },
            {
              title: "Measurement & iteration",
              copy: "Organic visibility is not judged by rankings alone. We connect search data with relevant visits, actions, and commercial objectives, separate from paid campaign attribution.",
              items: ["Search Console and organic analytics", "Ranking and visibility monitoring", "Organic conversion and demand analysis", "Regular prioritization"],
            },
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
        summary: "Strategy, ads, creative, campaign optimization, and measurement connected from paid attention to qualified inquiry.",
        rows: [
          ["Best for", "Businesses with a persuasive offer that want to create predictable demand through Google Ads or paid social."],
          ["The outcome", "Clearer acquisition decisions, faster learning cycles, and a direct path from ad to qualified inquiry."],
          ["What it can include", "Campaign strategy, media buying, creative, conversion optimization, attribution, and a defined handoff for qualified leads."],
        ],
        cta: "Explore Paid Campaigns",
        page: {
          metaDescription: "Paid campaigns by Webpilot: Google Ads, paid social, creative, conversion optimization, tracking, and ongoing improvement for qualified demand.",
          title: "Turn paid attention into demand.",
          intro: "We connect strategy, ads, conversion journeys, and measurement into one clear acquisition path.",
          outcomesHeading: "See the whole campaign",
          outcomesIntro: "Strong media performance is not created inside an ad account alone. The offer, creative, and conversion path must work together.",
          outcomes: [
            { title: "A persuasive offer", copy: "The message, audience, and next action are made clear before spending is scaled." },
            { title: "Faster learning cycles", copy: "Structured tests reveal which combinations of channel, creative, and conversion journey work." },
            { title: "Measurable demand", copy: "Tracking and a defined lead handoff connect advertising spend to the inquiries that matter to your business." },
          ],
          scopeHeading: "What we build for campaigns",
          scopeIntro: "This service owns paid acquisition from channel selection through campaign analysis. New landing pages are built with Websites & Apps; CRM automation after handoff belongs to AI & Automation.",
          scopeGroups: [
            {
              title: "Campaign strategy & offer",
              copy: "Before media spend begins, we clarify the audience, message, economics, and the next useful action for potential customers.",
              items: ["Goals and audiences", "Offer and message strategy", "Channel and budget planning", "Campaign and testing structure"],
            },
            {
              title: "Google Search & Shopping",
              copy: "Search campaigns reach people with active demand. Shopping extends the approach when the product and data are suitable.",
              items: ["Keyword and demand analysis", "Search and Shopping campaigns", "Ads and extensions", "Bid, budget, and search-term management"],
            },
            {
              title: "Paid social",
              copy: "Paid social campaigns create demand through audiences, formats, and messages designed for the relevant channel.",
              items: ["Channel and audience selection", "Prospecting and retargeting", "Campaigns and ad sets", "Placement and budget optimization"],
            },
            {
              title: "Creative & messaging",
              copy: "We develop advertising concepts and variants that make the value of the offer understandable and testable quickly.",
              items: ["Creative and messaging concepts", "Static, video, and copy variants", "Offer and hook tests", "Learning plan for new creative"],
            },
            {
              title: "Campaign journeys & CRO",
            copy: "We improve message continuity, forms, and qualification within the existing campaign journey. New pages are designed and built through Websites & Apps.",
              items: ["Ad-to-offer message continuity", "Campaign-specific lead qualification", "Funnel and conversion optimization", "Test hypotheses and analysis"],
            },
            {
              title: "Campaign measurement & lead handoff",
              copy: "Measurement connects media spend with real outcomes. We define and verify the handoff; enrichment, CRM routing, and automated follow-up are delivered through AI & Automation.",
              items: ["Campaign and conversion tracking", "Consent and platform signals", "Attribution and reporting", "Handoff criteria and lead quality"],
            },
          ],
          processHeading: "From hypothesis to improvement",
          processIntro: "Every campaign begins with a clear assumption and develops through real audience response.",
          process: [
            { title: "Align", copy: "We clarify the offer, audience, economics, and the relevant conversion path." },
            { title: "Launch and test", copy: "We launch campaigns and creative, then test the most important assumptions across the agreed conversion journey." },
            { title: "Learn and scale", copy: "We evaluate results, improve weak points, and increase investment only when the foundation supports it." },
          ],
          faqHeading: "Common questions about Paid Campaigns",
          faqs: [
            { question: "Is advertising spend included in your fee?", answer: "No. Media spend and our fee are shown separately and transparently. Any other third-party costs are also included in the proposal." },
            { question: "Which platforms do you manage?", answer: "Depending on the goal and audience, we work primarily with Google Ads and relevant paid social platforms. Channel selection follows the strategy rather than a fixed bundle." },
            { question: "Do you also improve the conversion journey and ad creative?", answer: "Yes. We align ad messaging with the existing page and forms, then improve the journey within the campaign scope. If a new landing page needs to be designed and built, that is delivered through Websites & Apps." },
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
        summary: "Practical AI features and automations for the workflows behind forms, inboxes, CRM systems, and digital products.",
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
          scopeIntro: "This service owns internal workflows, system handoffs, and clearly defined AI features. The visible website or app interface is delivered with Websites & Apps when needed.",
          scopeGroups: [
            {
              title: "Workflow automation",
              copy: "Repetitive workflows use clear rules so information moves reliably and the right tasks begin without manual coordination.",
              items: ["Workflow and system analysis", "Triggers, rules, and approvals", "Notifications and task creation", "Failure paths and human control"],
            },
            {
              title: "CRM & lead processes",
              copy: "After the handoff from a website or campaign, new contacts are enriched, assessed, and passed into the appropriate sales or service process.",
              items: ["Form-to-CRM handoff", "Lead enrichment and system-level qualification", "Routing and automated follow-up", "Pipeline and status automation"],
            },
            {
              title: "Documents & communication",
              copy: "AI can interpret information from emails and documents, structure it, and prepare it for the next stage of work.",
              items: ["Email and inbox processing", "Document classification", "Data extraction and summaries", "Drafting and approval workflows"],
            },
            {
              title: "Internal AI assistants",
              copy: "Teams gain controlled access to internal knowledge, policies, and information from connected sources.",
              items: ["Knowledge search and question answering", "Source references and permissions", "Role-specific assistants", "Quality testing and feedback"],
            },
            {
              title: "AI features in websites & apps",
              copy: "Useful AI capabilities focus on one clearly defined user task. AI logic and model integration sit here; the surrounding product experience is developed with Websites & Apps.",
              items: ["Task and quality criteria", "Prototypes and feasibility tests", "Model and API integration", "Usage, cost, and quality measurement"],
            },
            {
              title: "Integration & dependable operation",
              copy: "Systems, data, and providers are connected with visible failures, appropriate access controls, and documented handover.",
              items: ["API and system integrations", "Data access and permissions", "Monitoring, logs, and alerts", "Safeguards, documentation, and handover"],
            },
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
            { question: "Can you add an AI feature to our website or app?", answer: "Yes. AI logic, model integration, and quality measurement are handled through AI & Automation. Product concept, interface, and the surrounding user experience are delivered with Websites & Apps when needed." },
          ],
          finalTitle: "Find the most useful automation step.",
          finalCopy: "Show us the workflow that consumes time or regularly stalls. We will assess a practical solution.",
          finalCta: "Discuss automation",
        },
      },
    ],
    webExperienceAnimation: {
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
      trigger: "Form received",
      agent: "AI agent",
      extract: "Analyzes the enquiry",
      condition: "Qualified?",
      success: "Create CRM lead",
      notify: "Notify sales",
      fallback: "Human review",
      model: "AI",
      context: "CRM",
      research: "Web",
      yes: "Yes",
      review: "Review",
    },
  },
  fr: frServices,
} satisfies Record<Locale, ServicesCopy>;

export function getServiceCopy(locale: Locale, id: ServiceId): ServiceCopy {
  const service = servicesContent[locale].services.find((entry) => entry.id === id);
  if (!service) throw new Error(`Missing ${id} service copy for ${locale}.`);
  return service;
}
