import type { PropsWithChildren } from 'react';
import { BellIcon, ChevronDownIcon, SearchIcon } from './Icons';
import { Sidebar } from './Sidebar';

interface AppLayoutProps extends PropsWithChildren {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function AppLayout({ children, searchValue, onSearchChange }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/60 bg-slate-100/95 px-4 py-4 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600">
                  Experiment intelligence
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                  Product experimentation dashboard
                </h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label
                  htmlFor="dashboard-search"
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-panel"
                >
                  <span className="sr-only">Search dashboard content</span>
                  <SearchIcon className="h-4 w-4 text-slate-500" />
                  <input
                    id="dashboard-search"
                    type="search"
                    placeholder="Search flags, experiments, insights..."
                    value={searchValue}
                    onChange={(event) => onSearchChange(event.target.value)}
                    enterKeyHint="search"
                    className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500 sm:w-72"
                  />
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-panel transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                    aria-label="Notifications"
                  >
                    <BellIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="ExperimentFlow workspace menu"
                    className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-sm font-bold text-white">
                      EF
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900">ExperimentFlow</p>
                      <p className="text-xs text-slate-500">Engineering Team</p>
                    </div>
                    <ChevronDownIcon className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          </header>
          <main id="main-content" className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
