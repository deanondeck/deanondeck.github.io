/* CMS styling → CSS.

   A section instance can carry a `style` (whole-section) and `fieldStyles`
   (per top-level field). This module compiles those into ONE scoped `<style>`
   block per page. Nothing is applied inline — components only emit
   `data-cms-id` (root) and `data-cms-field="<key>"` attributes, and these
   generated rules target them.

   Scoping uses a DOUBLED attribute selector, e.g.
     [data-cms-id="hero-a1"][data-cms-id="hero-a1"] { … }         (0,2,0)
     [data-cms-id="hero-a1"][data-cms-id="hero-a1"] [data-cms-field="log"] { … }
   The repeated attribute raises specificity to 0,2,0 / 0,3,0 so these reliably
   win over base rules like `.band--shell .log` (0,2,0) via later source order,
   without touching the 1969-line globals.css. */

import type { CmsStyle, SectionInstance } from "./types";

/** Font choices for the CMS font-family picker. Only faces the site already
    loads (its display/script/body vars) plus web-safe stacks — so every choice
    always renders and no font loader is needed. `value` is a CSS font-family. */
export const FONT_OPTIONS: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Display — Noto Serif", value: "var(--font-display)" },
  { label: "Script — Corinthia", value: "var(--font-script)" },
  { label: "Body — System Sans", value: "var(--font-body)" },
  { label: "Georgia", value: 'Georgia, "Times New Roman", serif' },
  { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { label: "Palatino", value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
  { label: "Helvetica", value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  { label: "Arial", value: "Arial, Helvetica, sans-serif" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { label: "Trebuchet MS", value: '"Trebuchet MS", Helvetica, sans-serif' },
  { label: "Courier", value: '"Courier New", Courier, monospace' },
];

/** Escape a value for use inside a `[attr="…"]` selector. Instance ids are
    `<type>-<hex>`, so this is belt-and-suspenders. */
function escapeAttr(value: string): string {
  return value.replace(/["\\]/g, "\\$&");
}

/** Sanitize a single CSS value: no rule-breaking or tag-breaking characters. */
function cleanValue(value: string): string {
  return value.replace(/[;{}<>]/g, "").replace(/@import/gi, "").trim();
}

/** Sanitize a CSS property name to `a-z` + hyphen (custom props allowed). */
function cleanProp(prop: string): string {
  return prop.trim().toLowerCase().replace(/[^a-z-]/g, "");
}

/** Sanitize a schema field key for a `data-cms-field` selector. Keys are
    identifier-like (often camelCase, e.g. `bookLabel`) so case is preserved. */
function cleanKey(key: string): string {
  return key.trim().replace(/[^a-zA-Z0-9_-]/g, "");
}

/** Turn a raw declaration list into a safe one: strip anything that could
    escape the scoped rule or the `<style>` tag. Selectors/braces are removed,
    so authors write declarations only (`color: red; transform: rotate(2deg)`). */
function cleanDeclarations(css: string): string {
  return css
    .replace(/<\/?\s*style/gi, "")
    .replace(/@import/gi, "")
    .replace(/[{}<>]/g, "")
    .trim();
}

/** Build the declaration body (no braces) for one CmsStyle. */
function declarations(style: CmsStyle | undefined): string {
  if (!style) return "";
  const parts: string[] = [];
  if (style.props) {
    for (const [rawProp, rawVal] of Object.entries(style.props)) {
      const prop = cleanProp(rawProp);
      const val = cleanValue(String(rawVal ?? ""));
      if (prop && val) parts.push(`${prop}: ${val}`);
    }
  }
  if (style.css) {
    const raw = cleanDeclarations(style.css);
    if (raw) parts.push(raw.replace(/;\s*$/, ""));
  }
  return parts.join("; ");
}

/** Compile all instances' styling on a page into one scoped CSS string.
    Returns "" when nothing is styled (caller can skip the <style> tag). */
export function buildPageStyleCss(sections: SectionInstance[]): string {
  const rules: string[] = [];
  for (const section of sections) {
    if (section.hidden) continue;
    const idSel = `[data-cms-id="${escapeAttr(section.id)}"]`;
    const scope = `${idSel}${idSel}`; // doubled → higher specificity

    const sectionDecl = declarations(section.style);
    if (sectionDecl) rules.push(`${scope} { ${sectionDecl} }`);

    if (section.fieldStyles) {
      for (const [key, fieldStyle] of Object.entries(section.fieldStyles)) {
        const fieldKey = cleanKey(key);
        const decl = declarations(fieldStyle);
        if (fieldKey && decl) {
          const attr = `[data-cms-field="${escapeAttr(fieldKey)}"]`;
          // Descendant form (normal components: field element is inside the
          // root) AND self form (page-level components like AboutMe/Cruises
          // put the field attribute on the same element that carries the id).
          rules.push(`${scope} ${attr}, ${scope}${attr} { ${decl} }`);
        }
      }
    }
  }
  return rules.join("\n");
}
