/* Minimal, dependency-free Markdown for `richtext` fields.

   The site only needs a small subset of inline formatting that the original
   hand-written JSX used: bold, emphasis, and links. `renderInline` turns a
   Markdown string into React nodes for use inside any element (headings,
   paragraphs, list items). `RichText` renders block copy, splitting on blank
   lines into paragraphs and single newlines into <br/>.

   Deliberately not a full CommonMark parser — no headings/lists/code. Keep the
   authored content within bold / italic / link and it renders faithfully. */

import { Fragment, type ReactNode } from "react";

// Earliest match wins; bold (`**`) is tried before emphasis (`*`) so the
// double marker isn't consumed as two singles.
const TOKEN =
  /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(_([^_]+)_)|(\[([^\]]+)\]\(([^)]+)\))/;

/** Parse a single line of inline Markdown into React nodes. */
export function renderInline(input: string, keyPrefix = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = input;
  let i = 0;

  while (rest.length > 0) {
    const m = TOKEN.exec(rest);
    if (!m) {
      out.push(rest);
      break;
    }
    if (m.index > 0) out.push(rest.slice(0, m.index));

    const key = `${keyPrefix}-${i++}`;
    if (m[1]) {
      out.push(<strong key={key}>{renderInline(m[2], key)}</strong>);
    } else if (m[3]) {
      out.push(<em key={key}>{renderInline(m[4], key)}</em>);
    } else if (m[5]) {
      out.push(<em key={key}>{renderInline(m[6], key)}</em>);
    } else if (m[7]) {
      const href = m[9];
      const external = /^https?:\/\//.test(href);
      out.push(
        <a
          key={key}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {renderInline(m[8], key)}
        </a>,
      );
    }
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

/** Render block Markdown copy: blank lines → paragraphs, `\n` → <br/>. */
export function RichText({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  const paragraphs = markdown.trim().split(/\n{2,}/);
  return (
    <>
      {paragraphs.map((para, pi) => (
        <p key={pi} className={className}>
          {para.split("\n").map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {renderInline(line, `p${pi}-l${li}`)}
            </Fragment>
          ))}
        </p>
      ))}
    </>
  );
}
