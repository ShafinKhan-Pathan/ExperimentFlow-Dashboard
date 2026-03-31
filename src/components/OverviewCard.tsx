import type { OverviewStat } from '../types/dashboard';
import { ArrowUpRightIcon } from './Icons';

interface OverviewCardProps {
  stat: OverviewStat;
}

export function OverviewCard({ stat }: OverviewCardProps) {
  return (
    <article className="rounded-[28px] border border-white/70 bg-white p-5 shadow-panel transition-transform duration-200 motion-safe:hover:scale-[1.01] hover:shadow-[0_20px_44px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{stat.label}</p>
          <p className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{stat.value}</p>
        </div>
        <div className="rounded-2xl bg-accent-50 p-3 text-accent-600">
          <ArrowUpRightIcon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-emerald-700">{stat.detail}</p>
    </article>
  );
}
