import { Fragment, type ReactNode } from 'react';

/**
 * Renders the tiny inline markup allowed in content: **bold** and `code`.
 * Latin runs inside Persian text are left to the bidi algorithm; inline code
 * is isolated as LTR so things like `npx wrangler deploy` never get scrambled.
 */
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    const tok = m[0];
    if (tok.startsWith('**')) out.push(<strong key={k++}>{tok.slice(2, -2)}</strong>);
    else
      out.push(
        <code key={k++} className="inline-code">
          {tok.slice(1, -1)}
        </code>,
      );
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}
