import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { navigationItems } from '../../data/siteContent'

type AppShellProps = {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 px-4 py-4 md:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur md:flex md:flex-col">
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                SocialGraph Lab
              </p>
              <p className="text-sm text-slate-300">Algorithms in social context</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-3xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-50/90">
            Version 1 is frontend-only. The algorithm engine will stay in pure TypeScript modules.
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="rounded-[2rem] border border-white/10 bg-slate-950/55 px-5 py-4 shadow-2xl shadow-slate-950/20 backdrop-blur md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
                  Educational graph analytics
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  SocialGraph Lab
                </h1>
              </div>

              <div className="flex flex-wrap gap-2">
                {navigationItems.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      [
                        'rounded-full px-4 py-2 text-sm font-medium transition',
                        isActive
                          ? 'bg-white text-slate-950'
                          : 'bg-white/5 text-slate-200 hover:bg-white/10',
                      ].join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </header>

          <section className="min-h-0 flex-1 rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur md:p-6">
            {children}
          </section>
        </main>
      </div>
    </div>
  )
}

export default AppShell