import type { Locale } from "@/i18n/config";

export type NotFoundCopy = {
  title: string;
  copy: string;
  back: string;
};

export const notFoundMessages = {
  de: {
    title: "Seite nicht gefunden.",
    copy: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    back: "Zurück zur Startseite",
  },
  en: {
    title: "Page not found.",
    copy: "The page you’re looking for does not exist or has moved.",
    back: "Back to the homepage",
  },
  fr: {
    title: "Page introuvable.",
    copy: "La page que vous recherchez n’existe pas ou a été déplacée.",
    back: "Retour à l’accueil",
  },
} as const satisfies Record<Locale, NotFoundCopy>;
