import { expect, test } from "bun:test";

async function componentSources() {
  const paths = Array.from(new Bun.Glob("src/components/**/*.tsx").scanSync("."));
  return Promise.all(paths.map(async (path) => ({
    path: path.replaceAll("\\", "/"),
    source: await Bun.file(path).text(),
  })));
}

test("keeps editorial typography on documented semantic roles", async () => {
  const exceptions = ["src/components/offer-animations", "src/components/brand-mark.tsx"];
  const arbitraryType = /(?:text-\[(?:clamp\(|calc\(|-?(?:\d|\.)+(?:px|rem|em|vw|vh))|leading-\[|tracking-\[|font-\[\d)/g;
  const violations = (await componentSources())
    .filter(({ path }) => !exceptions.some((exception) => path.startsWith(exception)))
    .flatMap(({ path, source }) => (source.match(arbitraryType) ?? []).map((match) => `${path}: ${match}`));

  expect(violations).toEqual([]);
});

test("keeps editorial spacing and surfaces on documented semantic roles", async () => {
  const exceptions = ["src/components/offer-animations"];
  const rules = [
    { label: "arbitrary spacing", pattern: /(?<![\w-])(?:-?m[trblxy]?|p[trblxy]?|gap(?:-[xy])?)-\[[^\]]+\]/g },
    { label: "raw shadow", pattern: /(?<![\w-])shadow-\[[^\]]+\]/g },
    { label: "raw border color", pattern: /(?<![\w-])border(?:-[trblxy])?-(?:\[[^\]]+\]|white\/\d+)/g },
    { label: "generic or arbitrary radius", pattern: /(?<![\w-])rounded-(?:sm|md|lg|xl|2xl|3xl|\[[^\]]+\])/g },
  ];
  const allowedGeometry = new Set([
    "src/components/brand-mark.tsx: gap-[.035em]",
    "src/components/pages/home-page.tsx: pt-[52px]",
  ]);
  const violations = (await componentSources())
    .filter(({ path }) => !exceptions.some((exception) => path.startsWith(exception)))
    .flatMap(({ path, source }) => rules.flatMap(({ label, pattern }) => (
      (source.match(pattern) ?? []).map((match) => ({ label, value: `${path}: ${match}` }))
    )))
    .filter(({ value }) => !allowedGeometry.has(value))
    .map(({ label, value }) => `${label}: ${value}`);

  expect(violations).toEqual([]);
});
