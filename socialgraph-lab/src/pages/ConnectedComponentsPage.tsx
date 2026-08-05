import { useMemo } from 'react'
import { Users } from 'lucide-react'

import GraphViewer from '../components/graph/GraphViewer'
import MetricCard from '../components/ui/MetricCard'
import { runConnectedComponents } from '../algorithms'
import { useGraphStore } from '../store/graphStore'

function ConnectedComponentsPage() {
  const { graph } = useGraphStore()

  const result = useMemo(() => runConnectedComponents(graph), [graph])

  const largestCommunity = result.components.reduce(
    (largest, current) =>
      current.length > largest.length ? current : largest,
    [],
  )

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Department Connectivity
        </h1>

        <p className="mt-2 text-slate-400">
          Analyze how placement members are grouped into independent professional communities.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">

        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">

          <MetricCard
            label="Communities"
            value={result.componentCount}
          />

          <MetricCard
            label="Largest Group"
            value={largestCommunity.length}
          />

          <MetricCard
            label="Members"
            value={graph.nodes.length}
          />

          <MetricCard
            label="Connections"
            value={graph.edges.length}
          />

        </div>

      </div>

      <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">

        <div className="space-y-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">

            <h2 className="text-lg font-semibold text-white">
              Placement Communities
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Independent placement ecosystems detected in the current network.
            </p>

            <div className="mt-4 max-h-[620px] overflow-y-auto space-y-3 pr-2">

              {result.components.map((component, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition-all duration-200 hover:border-cyan-400/40 hover:bg-slate-900/60"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-semibold text-white">
                        Community {index + 1}
                      </h3>

                      <p className="text-xs text-slate-400">
                        {component.length} Members
                      </p>

                    </div>

                    <Users className="h-5 w-5 text-cyan-300" />

                  </div>

                  <div className="mt-4 space-y-2">

                    {component.map((id) => {

                      const person = graph.nodes.find(
                        (node) => node.id === id,
                      )

                      if (!person) return null

                      return (

                        <div
                          key={id}
                          className="rounded-xl border border-white/10 bg-slate-900/40 px-3 py-3"
                        >

                          <p className="font-semibold text-white">
                            {person.displayName}
                          </p>

                          <p className="text-xs text-cyan-300">
                            {person.role}
                          </p>

                          <p className="text-xs text-slate-400">
                            {person.department} • {person.batch}
                          </p>

                          {person.company && (
                            <p className="text-xs text-emerald-300">
                              {person.company}
                            </p>
                          )}

                        </div>

                      )

                    })}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        <GraphViewer />

      </section>

    </div>
  )
}

export default ConnectedComponentsPage