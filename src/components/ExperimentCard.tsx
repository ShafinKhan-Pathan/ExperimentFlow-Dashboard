import type { Experiment, ExperimentVariant } from '../types/dashboard';
import { formatRelativeTime } from '../utils/experimentDisplay';

interface ExperimentCardProps {
  experiment: Experiment;
}

function VariantPanel({ variant }: { variant: ExperimentVariant }) {
  return (
    <div
      className={`rounded-[24px] border p-4 transition duration-300 ${
        variant.isWinner
          ? 'border-emerald-200 bg-emerald-50/80'
          : 'border-slate-200 bg-slate-50/80'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900">{variant.title}</h4>
        {variant.isWinner ? (
          <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
            Winner
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">{variant.description}</p>
    </div>
  );
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const [variantA, variantB] = experiment.variants;

  return (
    <article className="rounded-[28px] border border-purple-500 bg-white p-5 shadow-panel transition-transform duration-200 motion-safe:hover:scale-[1.005] hover:shadow-[0_20px_44px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{experiment.name}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                experiment.status === 'Running'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {experiment.status}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Owned by: {experiment.owner}
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Traffic Split: {variantA.trafficPercentage}% A / {variantB.trafficPercentage}% B
          </p>
          <p className="mt-2 text-xs font-medium text-slate-500">
            Last updated: {formatRelativeTime(experiment.updatedAt)}
          </p>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600 border border-purple-200 rounded-xl p-2">{experiment.insight}</p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <VariantPanel variant={variantA} />
        <VariantPanel variant={variantB} />
      </div>
    </article>
  );
}
