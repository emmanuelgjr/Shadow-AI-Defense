import { useStack } from './StackContext';
import { Check, X } from 'lucide-react';

interface StackOption {
  slug: string;
  name: string;
  short: string;
  description: string;
}

interface Props {
  stacks: StackOption[];
}

export default function StackSelector({ stacks }: Props) {
  const [current, setCurrent] = useStack();
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4">
        {stacks.map((s) => {
          const isCurrent = current === s.slug;
          return (
            <button
              key={s.slug}
              onClick={() => setCurrent(s.slug)}
              className={`text-left card transition-colors ${
                isCurrent ? 'border-accent-500 bg-accent-50/40' : 'hover:border-accent-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-ink-900">{s.name}</h3>
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 text-xs text-accent-700">
                    <Check size={14} /> Current
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-600">{s.description}</p>
            </button>
          );
        })}
      </div>

      {current && (
        <div className="mt-6 flex items-center justify-between bg-ok-50 border border-ok-200 rounded-md px-4 py-3">
          <p className="text-sm text-ok-700">
            Stack set to <strong>{current}</strong>. Detection rules and runbooks will be filtered accordingly.
          </p>
          <button
            onClick={() => setCurrent(null)}
            className="text-xs text-ink-500 hover:text-risk-600 inline-flex items-center gap-1"
            aria-label="Clear stack selection"
          >
            <X size={12} /> Clear
          </button>
        </div>
      )}
    </div>
  );
}
