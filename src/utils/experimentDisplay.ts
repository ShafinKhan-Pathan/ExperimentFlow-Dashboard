export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const updatedAt = new Date(timestamp);
  const diffMs = Math.max(0, now.getTime() - updatedAt.getTime());
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) {
    return 'just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min${diffMinutes === 1 ? '' : 's'} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hr${diffHours === 1 ? '' : 's'} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}

export function getConfidenceMeta(confidenceLevel: number) {
  if (confidenceLevel >= 90) {
    return {
      label: 'Statistically significant',
      className: 'bg-emerald-100 text-emerald-700',
    };
  }

  return {
    label: 'Needs more data',
    className: 'bg-amber-100 text-amber-700',
  };
}
