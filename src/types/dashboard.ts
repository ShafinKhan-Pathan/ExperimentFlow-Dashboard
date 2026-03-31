export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  linkedExperimentId?: string;
  behavior?: 'visibility';
}

export interface ExperimentVariant {
  id: string;
  title: string;
  description: string;
  conversionRate: number;
  dropOffRate: number;
  trafficPercentage: number;
  isWinner?: boolean;
}

export type ExperimentStatus = 'Running' | 'Completed';

export interface Experiment {
  id: string;
  name: string;
  status: ExperimentStatus;
  insight: string;
  owner: string;
  confidenceLevel: number;
  updatedAt: string;
  variants: [ExperimentVariant, ExperimentVariant];
}

export interface OverviewStat {
  id: string;
  label: string;
  value: string;
  detail: string;
}
