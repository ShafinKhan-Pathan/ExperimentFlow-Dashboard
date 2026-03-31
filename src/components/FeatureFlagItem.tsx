import type { FeatureFlag } from '../types/dashboard';

interface FeatureFlagItemProps {
  flag: FeatureFlag;
  onToggle: (flagId: string) => void;
}

export function FeatureFlagItem({ flag, onToggle }: FeatureFlagItemProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-4 transition-transform duration-200 motion-safe:hover:scale-[1.005] hover:shadow-[0_18px_40px_-26px_rgba(15,23,42,0.2)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-slate-900">{flag.name}</h3>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              flag.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {flag.enabled ? 'ON' : 'OFF'}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-500">{flag.description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={flag.enabled}
        aria-label={`${flag.name} ${flag.enabled ? 'enabled' : 'disabled'}`}
        onClick={() => onToggle(flag.id)}
        className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
          flag.enabled ? 'bg-accent-500' : 'bg-slate-300'
        }`}
      >
        <span
          className={`h-6 w-6 rounded-full bg-white shadow-sm transition-all duration-200 ease-out ${
            flag.enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
