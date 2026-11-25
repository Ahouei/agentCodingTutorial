import { Fragment, useContext, useId, type ReactNode } from 'react';
import { TermScope, useGlossary } from './glossaryCtx';

/**
 * Renders the inline markup allowed in content: **bold** and `code`.
 *
 * In Persian text, runs of Latin script (DNS, Agentic AI, cafe-sahar.ir) are isolated
 * with <bdi> so punctuation around them never jumps (RD-04: «Domain، DNS و Nameserver»).
 * Inside running-text blocks of a chapter, the first mention of a term taught in
 * another chapter becomes a tap-a-term button (RD-05).
 */
export function Rich({ text }: { text: string }) {
  const persian = /[؀-ۿ]/.test(text);
  const owner = useContext(TermScope);
  const gl = useGlossary();
  const rid = useId();
  const out: ReactNode[] = [];
  let k = 0;
  let occ = 0;

  const plain = (s: string) => {
    const nodes: ReactNode[] = [];
    let rest = s;
    const pat = owner && gl?.pattern ? gl.pattern : null;
    while (rest) {
      const m = pat ? pat.exec(rest) : null;
      if (!m) {
        nodes.push(...latin(rest));
        break;
      }
      if (m.index > 0) nodes.push(...latin(rest.slice(0, m.index)));
      const term = m[1];
      if (gl && owner && gl.claim(term, `${owner}${rid}:${occ++}`)) {
        nodes.push(
          <bdi key={k++}>
            <button type="button" className={`term ${gl.active === term ? 'is-active' : ''}`} onClick={() => gl.open(term)} aria-haspopup="dialog">
              {term}
            </button>
          </bdi>,
        );
      } else {
        nodes.push(...latin(term));
      }
      rest = rest.slice(m.index + term.length);
    }
    return nodes;
  };

  // Isolate Latin runs inside Persian text.
  const latin = (s: string): ReactNode[] => {
    if (!persian) return [<Fragment key={k++}>{s}</Fragment>];
    const nodes: ReactNode[] = [];
    const re = /[A-Za-z][A-Za-z0-9.+#&/_-]*(?:[ ][A-Za-z0-9][A-Za-z0-9.+#&/_-]*)*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(s))) {
      if (m.index > last) nodes.push(<Fragment key={k++}>{s.slice(last, m.index)}</Fragment>);
      nodes.push(<bdi key={k++}>{m[0]}</bdi>);
      last = m.index + m[0].length;
    }
    if (last < s.length) nodes.push(<Fragment key={k++}>{s.slice(last)}</Fragment>);
    return nodes;
  };

  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(...plain(text.slice(last, m.index)));
    const tok = m[0];
    if (tok.startsWith('**')) out.push(<strong key={k++}>{plain(tok.slice(2, -2))}</strong>);
    else
      out.push(
        <code key={k++} className="inline-code">
          {tok.slice(1, -1)}
        </code>,
      );
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(...plain(text.slice(last)));
  // One wrapper element: inside flex/grid parents (headings, buttons, quiz options) the
  // text must stay a single item, or each fragment becomes its own column/row.
  return <span className="rx">{out}</span>;
}
