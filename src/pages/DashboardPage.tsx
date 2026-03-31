import { useMemo, useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { ExperimentCard } from '../components/ExperimentCard';
import { FeatureFlagItem } from '../components/FeatureFlagItem';
import { OverviewCard } from '../components/OverviewCard';
import { ResultCard } from '../components/ResultCard';
import { SectionHeader } from '../components/SectionHeader';
import { experiments, initialFeatureFlags } from '../data/mockData';
import type { OverviewStat } from '../types/dashboard';

export function DashboardPage() {
  const [flags, setFlags] = useState(initialFeatureFlags);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleFlag = (flagId: string) => {
    setFlags((currentFlags) =>
      currentFlags.map((flag) =>
        flag.id === flagId ? { ...flag, enabled: !flag.enabled } : flag,
      ),
    );
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const availableExperiments = useMemo(() => {
    return experiments.filter((experiment) => {
      const controllingFlag = flags.find(
        (flag) =>
          flag.linkedExperimentId === experiment.id &&
          flag.behavior === 'visibility',
      );

      if (!controllingFlag) {
        return true;
      }

      return controllingFlag.enabled;
    });
  }, [flags]);

  const filteredFlags = useMemo(() => {
    if (!normalizedQuery) {
      return flags;
    }

    return flags.filter((flag) => flag.name.toLowerCase().includes(normalizedQuery));
  }, [flags, normalizedQuery]);

  const filteredExperiments = useMemo(() => {
    if (!normalizedQuery) {
      return availableExperiments;
    }

    return availableExperiments.filter((experiment) =>
      experiment.name.toLowerCase().includes(normalizedQuery),
    );
  }, [availableExperiments, normalizedQuery]);

  const overviewStats = useMemo<OverviewStat[]>(() => {
    const activeExperimentCount = availableExperiments.filter(
      (experiment) => experiment.status === 'Running',
    ).length;
    const activeFlagCount = flags.filter((flag) => flag.enabled).length;
    const winningExperimentCount = availableExperiments.filter((experiment) =>
      experiment.variants.some((variant) => variant.isWinner),
    ).length;

    return [
      {
        id: 'active-experiments',
        label: 'Active Experiments',
        value: activeExperimentCount.toString().padStart(2, '0'),
        detail: `${filteredExperiments.length} visible in current view`,
      },
      {
        id: 'active-flags',
        label: 'Active Feature Flags',
        value: activeFlagCount.toString().padStart(2, '0'),
        detail: `${filteredFlags.length} flags matching search`,
      },
      {
        id: 'winning-experiments',
        label: 'Winning Experiments',
        value: winningExperimentCount.toString().padStart(2, '0'),
        detail: `${availableExperiments.length} experiments currently tracked`,
      },
    ];
  }, [availableExperiments, filteredExperiments.length, filteredFlags.length, flags]);

  const noSearchMatches = filteredFlags.length === 0 && filteredExperiments.length === 0;

  return (
    <AppLayout searchValue={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-8">
        <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-28 grid gap-4 xl:grid-cols-3">
          <h2 id="overview-heading" className="sr-only">
            Overview
          </h2>
          {overviewStats.map((stat) => (
            <OverviewCard key={stat.id} stat={stat} />
          ))}
        </section>

        <section
          id="feature-flags"
          aria-labelledby="feature-flags-heading"
          className="scroll-mt-28 rounded-[32px] border border-white/70 bg-white p-6 shadow-panel"
        >
          <SectionHeader
            eyebrow="Feature Flags"
            title="Control product releases in real time"
            description="Flip UI changes on and off without waiting on a backend. These switches are powered by local React state for quick product exploration."
            titleId="feature-flags-heading"
          />
          <div className="grid gap-4">
            {filteredFlags.map((flag) => (
              <FeatureFlagItem key={flag.id} flag={flag} onToggle={handleToggleFlag} />
            ))}
            {filteredFlags.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">
                No feature flags match the current search.
              </div>
            ) : null}
          </div>
        </section>

        <section
          id="experiments"
          aria-labelledby="experiments-heading"
          className="defer-section scroll-mt-28 rounded-[32px] border border-white/70 bg-white p-6 shadow-panel"
        >
          <SectionHeader
            eyebrow="Experiments"
            title="Monitor live A/B tests"
            description="Each experiment tracks status, traffic allocation, and side-by-side treatments so teams can quickly compare what customers are experiencing."
            titleId="experiments-heading"
          />
          <div className="grid gap-5">
            {filteredExperiments.map((experiment) => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
            ))}
            {filteredExperiments.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">
                No experiments match the current search or enabled feature flags.
              </div>
            ) : null}
          </div>
        </section>

        <section id="results" aria-labelledby="results-heading" className="defer-section grid scroll-mt-28 gap-8 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-[32px] border border-white/70 bg-white p-6 shadow-panel">
            <SectionHeader
              eyebrow="Results"
              title="Spot the winning experience faster"
              description="Compare outcome metrics at a glance and elevate the stronger variant so product and engineering can make confident rollout decisions."
              titleId="results-heading"
            />
            <div className="grid gap-5">
              {filteredExperiments.map((experiment) => (
                <ResultCard key={experiment.id} experiment={experiment} />
              ))}
              {filteredExperiments.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">
                  No result cards are available for the current filters.
                </div>
              ) : null}
            </div>
          </div>

          <aside
            id="insights"
            aria-labelledby="insights-heading"
            className="scroll-mt-28 rounded-[32px] bg-slate-950 p-6 text-white shadow-panel"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-300">
              Insight
            </p>
            <h2 id="insights-heading" className="mt-3 text-2xl font-bold tracking-tight">
              Product insight summary
            </h2>
            <div className="mt-6 space-y-4">
              {filteredExperiments.map((experiment) => (
                <div key={experiment.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{experiment.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">{experiment.insight}</p>
                </div>
              ))}
              {noSearchMatches ? (
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  Search for a feature flag or experiment name to narrow the dashboard.
                </div>
              ) : null}
            </div>
            <div className="mt-6 rounded-[24px] bg-accent-500/20 p-4">
              <p className="text-sm font-semibold text-accent-100">Recommended action</p>
              <p className="mt-2 text-sm leading-6 text-accent-50">
                Roll out the simplified checkout to a broader audience, and keep the approval flow experiment behind the Fast Approval UI flag until confidence stays above target.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}
