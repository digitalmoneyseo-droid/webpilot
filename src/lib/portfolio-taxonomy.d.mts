export const projectCategoryIds: readonly ["brand", "website", "product", "growth", "seo-geo", "content", "social", "paid-media", "ai", "automation"];
export type ProjectCategory = (typeof projectCategoryIds)[number];
export const projectFilterIds: readonly ["all", "build", "grow", "automate"];
export type ProjectFilter = (typeof projectFilterIds)[number];
export type ProjectLocale = "de" | "en";
export function parseProjectCategories(value: unknown, source: string): ProjectCategory[];
export function projectCategoryLabel(locale: ProjectLocale, category: ProjectCategory): string;
export function parseProjectFilter(value: string | null): ProjectFilter;
export function projectMatchesFilter(categories: readonly ProjectCategory[], filter: ProjectFilter): boolean;
