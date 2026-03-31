import type { Experiment, FeatureFlag } from '../types/dashboard';

export const initialFeatureFlags: FeatureFlag[] = [
  {
    id: 'checkout-flow',
    name: 'New Checkout Flow',
    enabled: true,
    description: 'Launches the simplified payment and confirmation experience.',
  },
  {
    id: 'discount-banner',
    name: 'Discount Banner',
    enabled: false,
    description: 'Shows promotional messaging during high-intent sessions.',
  },
  {
    id: 'fast-approval-ui',
    name: 'Fast Approval UI',
    enabled: true,
    description: 'Reduces approval friction for enterprise onboarding flows.',
    linkedExperimentId: 'approval-flow-simplification',
    behavior: 'visibility',
  },
];

export const experiments: Experiment[] = [
  {
    id: 'checkout-optimization',
    name: 'Checkout Optimization',
    status: 'Running',
    insight:
      'Version B reduces friction by removing multi-step delivery input and surfacing inline validation, leading to a 12% lift in conversion among returning users.',
    owner: 'Growth Team',
    confidenceLevel: 92,
    updatedAt: '2026-03-30T14:58:00-05:00',
    variants: [
      {
        id: 'checkout-a',
        title: 'Version A',
        description: 'Current multi-step checkout with expanded delivery details.',
        conversionRate: 21.4,
        dropOffRate: 38.2,
        trafficPercentage: 50,
      },
      {
        id: 'checkout-b',
        title: 'Version B',
        description: 'Condensed checkout with a single-page summary and inline validation.',
        conversionRate: 24.0,
        dropOffRate: 31.5,
        trafficPercentage: 50,
        isWinner: true,
      },
    ],
  },
  {
    id: 'activation-flow',
    name: 'Activation Journey',
    status: 'Completed',
    insight:
      'Version B guides teams with segment-aware milestones and contextual prompts, which shortens the path to first value and improves activation completion.',
    owner: 'Product Onboarding',
    confidenceLevel: 88,
    updatedAt: '2026-03-30T14:21:00-05:00',
    variants: [
      {
        id: 'activation-a',
        title: 'Version A',
        description: 'Default onboarding with linear steps and static checklist.',
        conversionRate: 46.1,
        dropOffRate: 18.7,
        trafficPercentage: 50,
      },
      {
        id: 'activation-b',
        title: 'Version B',
        description: 'Segment-based onboarding with tailored milestones and prompts.',
        conversionRate: 51.6,
        dropOffRate: 14.1,
        trafficPercentage: 50,
        isWinner: true,
      },
    ],
  },
  {
    id: 'approval-flow-simplification',
    name: 'Approval Flow Simplification',
    status: 'Running',
    insight:
      'Version B reduces approval friction by delaying non-critical data collection until after pre-qualification, driving a 9% increase in funded application conversion.',
    owner: 'Risk & Growth',
    confidenceLevel: 76,
    updatedAt: '2026-03-30T15:06:00-05:00',
    variants: [
      {
        id: 'approval-a',
        title: 'Version A',
        description: 'Standard fintech approval journey with full identity and income details upfront.',
        conversionRate: 34.8,
        dropOffRate: 27.4,
        trafficPercentage: 50,
      },
      {
        id: 'approval-b',
        title: 'Version B',
        description: 'Progressive approval flow that collects only critical inputs before pre-qualification.',
        conversionRate: 37.9,
        dropOffRate: 22.1,
        trafficPercentage: 50,
        isWinner: true,
      },
    ],
  },
];
