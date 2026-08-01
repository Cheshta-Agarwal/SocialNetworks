import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react'
import { navigationItems, navigationSections } from '../../data/siteContent'
import GraphToolbar from '../graph/GraphToolbar'

type AppShellProps = {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  const [expanded, setExpanded] = useState<string[]>(['Tools', 'Algorithms'])
  const linkBaseClass =
    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition'

  function toggle(section: string) {
    setExpanded((previous) =>
      previous.includes(section)
        ? previous.filter((item) => item !== section)
        : [...previous, section],
    )
  }
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.9))]" />
      <div className="relative mx-auto flex min-h-screen max-w-[1680px] gap-6 px-4 py-4">
        <aside className="hidden w-80 shrink-0 rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl backdrop-blur lg:block">
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                PlacementConnect
              </p>

              <p className="text-sm text-slate-300">Graph-powered campus placement and alumni networking platform</p>
            </div>
          </div>

          <nav className="space-y-3">
            {navigationItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  [
                    linkBaseClass,
                    isActive
                      ? 'bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/20'
                      : 'text-slate-300 hover:bg-white/5',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 space-y-3">
            {navigationSections.map((section) => {
              const isOpen = expanded.includes(section.heading)

              return (
                <div key={section.heading} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <button
                    type="button"
                    onClick={() => toggle(section.heading)}
                    className="flex w-full items-center justify-between rounded-xl px-1 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 transition hover:text-white"
                  >
                    <span>{section.heading}</span>
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>

                  {isOpen ? (
                    <div className="mt-3 space-y-2">
                      {section.heading === 'Tools' ? <GraphToolbar /> : null}

                      {section.items.map(({ label, to, icon: Icon }) => (
                        <NavLink
                          key={to}
                          to={to}
                          className={({ isActive }) =>
                            [
                              linkBaseClass,
                              'w-full justify-start',
                              isActive
                                ? 'bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/20'
                                : 'text-slate-300 hover:bg-white/5',
                            ].join(' ')
                          }
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-4">

          <section className="flex-1 rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur">
            {children}
          </section>
        </main>
      </div>
    </div>
  )
}

export default AppShell