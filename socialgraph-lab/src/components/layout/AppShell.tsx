import { useState, useRef, type ChangeEvent, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
  Home,
  Search,
  ShieldCheck,
  Upload,
  Users,
  Trash2,
  Building2,
} from 'lucide-react'

import { useGraphStore } from '../../store/graphStore'
import type { Graph } from '../../types/graph'
import {
  navigationItems,
  navigationSections,
} from '../../data/siteContent'

type AppShellProps = {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  const {
    graph,
    setGraph,
  } = useGraphStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const [expanded, setExpanded] = useState<string[]>([
    'Tools',
    'Student Features',
    'Placement Analytics',
  ])

  const linkBaseClass =
    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition'

  function toggle(section: string) {
    setExpanded((previous) =>
      previous.includes(section)
        ? previous.filter((item) => item !== section)
        : [...previous, section],
    )
  }

  function handleExport() {
    const json = JSON.stringify(graph, null, 2)

    const blob = new Blob([json], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url
    link.download = 'placement-network.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  function handleImport(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      try {
        setGraph(
          JSON.parse(reader.result as string) as Graph,
        )
      } catch {
        alert('Invalid placement network.')
      }
    }

    reader.readAsText(file)

    event.target.value = ''
  }

  async function handleLoadSample() {
    try {
      const response = await fetch(
        '/db1.json',
      )

      const sample =
        (await response.json()) as Graph

      setGraph(sample)
    } catch {
      alert('Unable to load sample network.')
    }
  }

  function handleClear() {
    if (!confirm('Clear current placement network?'))
      return

    setGraph({
      nodes: [],
      edges: [],
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.9))]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1700px] gap-6 px-4 py-4">

        <aside className="hidden w-80 shrink-0 rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl backdrop-blur lg:block">

          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">

            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15">

              <Building2 className="h-6 w-6 text-cyan-300" />

            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">

                PlacementConnect

              </p>

              <p className="text-sm text-slate-300">

                Campus Placement Intelligence Platform

              </p>

            </div>

          </div>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [
                linkBaseClass,
                isActive
                  ? 'bg-cyan-400/15 text-cyan-100'
                  : 'text-slate-300 hover:bg-white/5',
              ].join(' ')
            }
          >
            <Home className="h-4 w-4" />

            Home

          </NavLink>

          <input
            hidden
            ref={inputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
          />

            <div className="mt-6 space-y-3">

            {navigationSections.map((section) => {

              const isOpen = expanded.includes(section.heading)

              return (

                <div key={section.heading}>

                  <button
                    onClick={() => toggle(section.heading)}
                    className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 transition hover:text-white"
                  >
                    <span>{section.heading}</span>

                    {isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {isOpen && (

                    <div className="ml-2 mt-2 space-y-2">

                      {section.heading === 'Tools' && (

                        <>

                          <button
                            onClick={handleLoadSample}
                            className={linkBaseClass + ' w-full justify-start'}
                          >
                            <Upload className="h-4 w-4" />
                            Load Sample Placement Network
                          </button>

                          <button
                            onClick={() => inputRef.current?.click()}
                            className={linkBaseClass + ' w-full justify-start'}
                          >
                            <Upload className="h-4 w-4" />
                            Import Network
                          </button>

                          <button
                            onClick={handleExport}
                            className={linkBaseClass + ' w-full justify-start'}
                          >
                            <Download className="h-4 w-4" />
                            Export Network
                          </button>

                          <button
                            onClick={handleClear}
                            className={
                              linkBaseClass +
                              ' w-full justify-start text-red-300 hover:text-red-200'
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                            Clear Network
                          </button>

                        </>

                      )}

                      {section.items.map(({ label, to, icon: Icon }) => (

                        <NavLink
                          key={to}
                          to={to}
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

                    </div>

                  )}

                </div>

              )

            })}

          </div>

        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-4">
          <section className="flex-1 rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-2xl backdrop-blur">

            {children}

          </section>

        </main>

      </div>

    </div>

  )

}

export default AppShell