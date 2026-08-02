export type Locale = "de" | "en";
export interface Faq { translationKey: string; locale: Locale; slug: string; order: number; question: string; answer: string }
export interface ContentEntry<T> { id: string; data: T }
export type LocalizedEntries<T> = Record<Locale, ContentEntry<T>[]>;
export interface ContentRepository { faqs: LocalizedEntries<Faq> }
export function parseFaq(value: unknown, source: string): Faq;
export function loadContentRepository(root: string): ContentRepository;
