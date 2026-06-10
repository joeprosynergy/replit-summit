// One-off CMS fix: broken H1 templates on /cabin and /utility-shed.
// Usage:
//   node scripts/fix-product-titles.mjs          (inspect only)
//   node scripts/fix-product-titles.mjs --apply  (apply fixes)
// Credentials come from .env.local; values are never printed.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=["']?(.*?)["']?\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing Supabase env vars in .env.local");
  process.exit(1);
}
const canWrite = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
const supabase = createClient(url, key, { auth: { persistSession: false } });

const apply = process.argv.includes("--apply");
const TITLE_FIELDS = ["title", "titleHighlight", "titlePosition", "subtitle", "metaTitle"];

for (const slug of ["cabin", "utility-shed"]) {
  const { data, error } = await supabase
    .from("section_content")
    .select("id, page_slug, section_name, content")
    .eq("page_slug", slug)
    .eq("section_name", "main");
  if (error) { console.error(slug, "read error:", error.message); continue; }
  for (const row of data) {
    const c = row.content || {};
    console.log(`--- ${slug} (row ${row.id})`);
    for (const f of TITLE_FIELDS) console.log(`  ${f}: ${JSON.stringify(c[f])}`);

    if (!apply) continue;
    if (!canWrite) { console.error("No SUPABASE_SERVICE_ROLE_KEY; cannot apply."); process.exit(1); }

    // DynamicPageClient renders `${titleHighlight} ${title}` (highlight always
    // first), so the fix is in the data, not the template.
    const next = { ...c };
    if (slug === "cabin") {
      // Was title=SUMMIT, highlight=CABIN -> "CABIN SUMMIT"
      next.title = "CABIN";
      next.titleHighlight = "SUMMIT";
    }
    if (slug === "utility-shed") {
      // Was title="PRO -", highlight="UTILITY SHED" -> "UTILITY SHED PRO -"
      next.title = "UTILITY SHED";
      next.titleHighlight = "PRO";
    }
    const { error: upErr } = await supabase
      .from("section_content")
      .update({ content: next, updated_at: new Date().toISOString() })
      .eq("id", row.id);
    console.log(!upErr ? `  UPDATED -> H1 reads "${next.titleHighlight} ${next.title}"` : `  update error: ${upErr?.message}`);
  }
}
