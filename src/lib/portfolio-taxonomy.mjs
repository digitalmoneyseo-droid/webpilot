export const projectCategoryIds = [
  "brand", "website", "product", "growth", "seo-geo", "content", "social", "paid-media", "ai", "automation",
];

export const projectFilterIds = ["all", "build", "grow", "automate"];

const categoryIdSet = new Set(projectCategoryIds);

const categoryLabels = {
  de: { brand: "Marke", website: "Website", product: "Produkt", growth: "Wachstum", "seo-geo": "SEO & GEO", content: "Content", social: "Social", "paid-media": "Paid Media", ai: "AI", automation: "Automatisierung" },
  en: { brand: "Brand", website: "Website", product: "Product", growth: "Growth", "seo-geo": "SEO & GEO", content: "Content", social: "Social", "paid-media": "Paid Media", ai: "AI", automation: "Automation" },
};

const filterCategories = {
  all: new Set(projectCategoryIds),
  build: new Set(["brand", "website", "product"]),
  grow: new Set(["growth", "seo-geo", "content", "social", "paid-media"]),
  automate: new Set(["ai", "automation"]),
};

export function parseProjectCategories(value, source) {
  if (!Array.isArray(value) || value.length === 0 || value.some((category) => !categoryIdSet.has(category))) {
    throw new Error(`Invalid categories in ${source}. Use stable Portfolio category IDs.`);
  }
  if (new Set(value).size !== value.length) throw new Error(`Duplicate category in ${source}.`);
  return value;
}

export function projectCategoryLabel(locale, category) {
  return categoryLabels[locale][category];
}

export function parseProjectFilter(value) {
  return projectFilterIds.includes(value) ? value : "all";
}

export function projectMatchesFilter(categories, filter) {
  const accepted = filterCategories[filter];
  return categories.some((category) => accepted.has(category));
}
