import {
  BarChart3Icon,
  FlaskConicalIcon,
  LayoutDashboardIcon,
  SlidersHorizontalIcon,
  ToggleRightIcon,
} from './Icons';

const navItems = [
  { label: 'Overview', icon: LayoutDashboardIcon, href: '#overview' },
  { label: 'Feature Flags', icon: ToggleRightIcon, href: '#feature-flags' },
  { label: 'Experiments', icon: FlaskConicalIcon, href: '#experiments' },
  { label: 'Results', icon: BarChart3Icon, href: '#results' },
  { label: 'Insights', icon: SlidersHorizontalIcon, href: '#insights' },
];

export function Sidebar() {
  return (
    <aside
      aria-label="Sidebar"
      className="border-b border-white/60 bg-[#f7f9fc] px-4 py-5 lg:min-h-screen lg:w-[280px] lg:border-b-0 lg:border-r lg:px-6 lg:py-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white shadow-panel">
          E
        </div>
        <div>
          <p className="text-base font-bold tracking-tight text-slate-950">ExperimentFlow</p>
          <p className="text-sm text-slate-500">Flags and experiments</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-slate-950 px-5 py-5 text-white shadow-panel">
        <p className="text-sm font-medium text-white/70">Current focus</p>
        <p className="mt-3 text-lg font-semibold">Ship confident product changes</p>
        <p className="mt-2 text-sm leading-6 text-white/75">
          Track every experiment, measure outcomes, and align teams around what is working.
        </p>
      </div>

      <nav aria-label="Dashboard sections" className="mt-8 flex flex-wrap gap-3 lg:flex-col">
        {navItems.map(({ label, icon: Icon, href }, index) => (
          <a
            key={label}
            href={href}
            className={`inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
              index === 0
                ? 'bg-white text-slate-950 shadow-panel'
                : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
