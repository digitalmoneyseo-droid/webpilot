import type { ProjectCategory } from "./portfolio-taxonomy.mjs";
export type Locale = "de" | "en";
export type Palette = "violet" | "orange" | "blue" | "green" | "ink" | "yellow" | "coral" | "ice";
export type Visual = "dashboard" | "commerce" | "assistant" | "search" | "content" | "crm" | "brand" | "campaign";
export interface Project { translationKey: string; locale: Locale; slug: string; order: number; title: string; shortTitle: string; summary: string; categories: ProjectCategory[]; year: string; metric: string; metricLabel: string; challenge: string; strategy: string; execution: string; timeline: string; tools: string[]; palette: Palette; visual: Visual }
export interface Faq { translationKey: string; locale: Locale; slug: string; order: number; question: string; answer: string }
export interface ContentEntry<T> { id: string; data: T }
export type LocalizedEntries<T> = Record<Locale, ContentEntry<T>[]>;
export interface ContentRepository { projects: LocalizedEntries<Project>; faqs: LocalizedEntries<Faq>; solutionFaqs: LocalizedEntries<Faq> }
export function parseProject(value: unknown, source: string): Project;
export function parseFaq(value: unknown, source: string): Faq;
export function loadContentRepository(root: string): ContentRepository;
