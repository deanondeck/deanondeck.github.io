/* Client-side form intake — POSTs submissions to the Dean on Deck admin API.

   This is a static site (GitHub Pages, `output: export`), so there is no
   backend of our own: forms submit straight from the browser to the admin
   panel's open cross-origin intake endpoint. It's gated only by an origin
   allowlist on the API side (ALLOWED_FORM_ORIGIN) — the deployed origin
   `https://deanondeck.github.io` must be registered there or every request
   comes back 403. No auth header / API key is needed.

   Endpoint switches on build target: `next dev` (development) talks to the
   local admin at :3030; the production export talks to the live admin. */
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://admin.deanondeck.com"
    : "http://localhost:3030";

export const FORMS_ENDPOINT = `${API_BASE}/api/forms`;

export type FormResult =
  | { ok: true; id: string; emailed: boolean }
  | { ok: false; error: string };

/* Submit one form. `formName` is required by the API (400 without it); the
   rest of the fields are the submission data, sent as loose top-level keys.
   Include a field literally named `email` and the server uses it as reply-to. */
export async function submitForm(
  formName: string,
  data: Record<string, FormDataEntryValue>,
): Promise<FormResult> {
  try {
    const res = await fetch(FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formName, ...data }),
    });

    const out = await res.json().catch(() => null);

    // ok:true is success even when emailed:false — the submission was saved,
    // only the notification email failed.
    if (res.ok && out?.ok) {
      return { ok: true, id: String(out.id), emailed: Boolean(out.emailed) };
    }

    return {
      ok: false,
      error:
        (out && typeof out.error === "string" && out.error) ||
        `Something went wrong (${res.status}). Please try again.`,
    };
  } catch {
    return {
      ok: false,
      error:
        "Couldn't reach the server — check your connection or reach out directly.",
    };
  }
}
