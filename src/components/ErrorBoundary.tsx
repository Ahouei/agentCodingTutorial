import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Mascot } from './Mascot';

type Props = {
  children: ReactNode;
  /** 'page' replaces the whole page; 'lab' replaces just one interactive lab. */
  scope: 'page' | 'lab';
  lang: 'fa' | 'en';
  /** Changing this value clears a caught error (e.g. route or lab id). */
  resetKey?: string;
};
type State = { error: Error | null; prevKey?: string };

/**
 * Catches render errors so one broken lab (or a bad stored value) never blanks
 * the whole site (QA-01). The lab version offers "try again" in place.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, prevKey: this.props.resetKey };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    if (props.resetKey !== state.prevKey) return { error: null, prevKey: props.resetKey };
    return null;
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[zero-to-hero]', this.props.scope, error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const fa = this.props.lang === 'fa';
    if (this.props.scope === 'lab') {
      return (
        <div className="eb-lab sticker" role="alert">
          <Mascot size={52} mood="wow" follow={false} />
          <div>
            <p className="eb-title">{fa ? 'این تمرین به مشکل خورد.' : 'This lab hit a snag.'}</p>
            <p className="eb-text">
              {fa ? 'بقیه فصل سالم است. می‌توانید تمرین را از اول شروع کنید.' : 'The rest of the chapter is fine. You can restart the lab.'}
            </p>
            <button type="button" className="btn btn--small" onClick={() => this.setState({ error: null })}>
              {fa ? 'شروع دوباره تمرین' : 'Restart the lab'}
            </button>
          </div>
        </div>
      );
    }
    return (
      <main className="wrap eb-page" role="alert">
        <Mascot size={120} mood="wow" follow={false} />
        <h1 className="display">{fa ? 'اوه! چیزی درست کار نکرد.' : 'Oops, something went wrong.'}</h1>
        <p>{fa ? 'پیشرفت شما سالم است. صفحه را دوباره باز کنید.' : 'Your progress is safe. Reload the page to continue.'}</p>
        <button type="button" className="btn btn--primary" onClick={() => location.reload()}>
          {fa ? 'بارگذاری دوباره' : 'Reload'}
        </button>
      </main>
    );
  }
}
