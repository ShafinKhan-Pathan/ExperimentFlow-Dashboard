interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  titleId?: string;
}

export function SectionHeader({ eyebrow, title, description, titleId }: SectionHeaderProps) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-600">{eyebrow}</p>
      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h2 id={titleId} className="text-2xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}
