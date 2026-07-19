const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://webpilot.studio";
try { new URL(siteUrl); } catch { throw new Error("PUBLIC_SITE_URL must be an absolute URL"); }
console.log("Configuration valid.");
