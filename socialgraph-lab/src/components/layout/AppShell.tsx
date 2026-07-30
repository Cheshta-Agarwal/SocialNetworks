import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { navigationItems, navigationSections } from '../../data/siteContent'

type AppShellProps = {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  const linkBaseClass = 'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition'

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.9))]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1680px] gap-6 px-4 py-4 md:px-6 lg:px-8">
        <aside className="hidden w-80 shrink-0 flex-col rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur lg:flex lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
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

          <nav className="space-y-6 overflow-y-auto pr-1">
            <div className="space-y-2">
              {navigationItems.slice(0, 1).map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    [
                      linkBaseClass,
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
            </div>

            {navigationSections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <p className="px-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  {section.heading}
                </p>
                <div className="space-y-2">
                  {section.items.map(({ label, to, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) =>
                        [
                          linkBaseClass,
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
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto rounded-3xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-50/90">
            Version 1 stays frontend-only. The algorithm engine remains in pure TypeScript modules.
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="rounded-[2rem] border border-white/10 bg-slate-950/55 px-5 py-4 shadow-2xl shadow-slate-950/20 backdrop-blur md:px-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
                    Educational graph analytics
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    SocialGraph Lab
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
                    Browse the lab, jump between algorithms, and keep the graph builder, traversal tools,
                    and shortest-path visualizations in one coherent learning flow.
                  </p>
                </div>
              </div>

              <nav aria-label="Primary" className="overflow-x-auto pb-1">
                <div className="flex min-w-max flex-wrap gap-2">
                  {navigationItems.map(({ label, to, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        [
                          'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
                          isActive
                            ? 'border-cyan-300/40 bg-cyan-400/15 text-cyan-50'
                            : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10 hover:text-white',
                        ].join(' ')
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </NavLink>
                  ))}
                </div>
              </nav>
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