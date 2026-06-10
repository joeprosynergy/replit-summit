// One-off CMS fix: "Prices subject to change without warning" -> "without notice".
// Usage:
//   node scripts/fix-fine-print.mjs          (inspect only)
//   node scripts/fix-fine-print.mjs --apply  (apply fixes)
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
if (!url || !key) { console.error("Missing Supabase env vars"); process.exit(1); }
const supabase = createClient(url, key, { auth: { persistSession: false } });

const apply = process.argv.includes("--apply");
const BAD = "subject to change without warning";
const GOOD = "subject to change without notice";

const { data, error } = await supabase
  .from("section_content")
  .select("id, page_slug, section_name, content");
if (error) { console.error("read error:", error.message); process.exit(1); }

let hits = 0;
for (const row of data) {
  const json = JSON.stringify(row.content);
  if (!json.includes(BAD)) continue;
  hits++;
  console.log(`${row.page_slug} [${row.section_name}] (row ${row.id}) contains the phrase`);
  if (!apply) continue;
  const fixed = JSON.parse(json.split(BAD).join(GOOD));
  const { error: upErr } = await supabase
    .from("section_content")
    .update({ content: fixed, updated_at: new Date().toISOString() })
    .eq("id", row.id);
  console.log(upErr ? `  update error: ${upErr.message}` : "  UPDATED");
}
console.log(hits === 0 ? "No CMS rows contain the phrase." : `${hits} row(s) ${apply ? "fixed" : "found (run with --apply)"}`);
