import type { Experiment } from '../types/dashboard';
import { formatRelativeTime, getConfidenceMeta } from '../utils/experimentDisplay';

interface ResultCardProps {
  experiment: Experiment;
}

function MetricRow({
  label,
  valueA,
  valueB,
  betterDirection,
}: {
  label: string;
  valueA: number;
  valueB: number;
  betterDirection: 'higher' | 'lower';
}) {
  const isAWinner = betterDirection === 'higher' ? valueA > valueB : valueA < valueB;
  const isBWinner = valueA === valueB ? false : !isAWinner;

  return (
    <div className="grid gap-3 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 md:grid-cols-[1.2fr_1fr_1fr] md:items-center">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <div
        className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
          isAWinner ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-700'
        }`}
      >
        A: {valueA.toFixed(1)}%
      </div>
      <div
        className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
          isBWinner ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-700'
        }`}
      >
        B: {valueB.toFixed(1)}%
      </div>
    </div>
  );
}

export function ResultCard({ experiment }: ResultCardProps) {
  const [variantA, variantB] = experiment.variants;
  const winner = experiment.variants.find((variant) => variant.isWinner);
  const confidenceMeta = getConfidenceMeta(experiment.confidenceLevel);

  return (
    <article className="rounded-[28px] border border-white/70 bg-white p-5 shadow-panel transition-transform duration-200 motion-safe:hover:scale-[1.005] hover:shadow-[0_20px_44px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{experiment.name}</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Owned by: {experiment.owner}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{experiment.insight}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">
            Last updated: {formatRelativeTime(experiment.updatedAt)}
          </p>
        </div>
        {winner ? (
          <div className="rounded-[22px] bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            Winning version: {winner.title}
          </div>
        ) : null}
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex flex-wrap items-center gap-3 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-sm font-semibold text-slate-700">
            Confidence: {experiment.confidenceLevel}% ({confidenceMeta.label})
          </p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${confidenceMeta.className}`}>
            {experiment.confidenceLevel >= 90 ? 'High confidence' : 'Moderate confidence'}
          </span>
        </div>
        <MetricRow
          label="Conversion Rate"
          valueA={variantA.conversionRate}
          valueB={variantB.conversionRate}
          betterDirection="higher"
        />
        <MetricRow
          label="Drop-off Rate"
          valueA={variantA.dropOffRate}
          valueB={variantB.dropOffRate}
          betterDirection="lower"
        />
      </div>
    </article>
  );
}
