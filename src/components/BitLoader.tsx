import { useTx } from '../lib/app';
import { Mascot } from './Mascot';

/** Bit setting up a lab (or a panel) while its code loads. */
export function BitLoader({ label, className }: { label?: string; className?: string }) {
  const tx = useTx();
  return (
    <div className={`bitloader ${className ?? ''}`} role="status">
      <Mascot size={52} mood="think" follow={false} />
      <span>{label ?? tx('Bit دارد تمرین را آماده می‌کند…', 'Bit is setting up the lab…')}</span>
    </div>
  );
}
