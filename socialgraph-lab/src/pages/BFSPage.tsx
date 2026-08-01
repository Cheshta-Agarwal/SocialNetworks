import { useMemo, useState } from 'react'
import { runBFS } from '../algorithms/bfs'
import GraphViewer from '../components/graph/GraphViewer'
import MetricCard from '../components/ui/MetricCard'
import { useGraphStore } from '../store/graphStore'

function BFSPage() {
  const { graph } = useGraphStore()
  const [startNodeId, setStartNodeId] = useState('')
  const bfsResult = useMemo(() => {
    if (!startNodeId) return null
    return runBFS(graph, startNodeId)
  }, [graph, startNodeId])

  const directFriends = bfsResult?.stats?.directFriends ?? 0
  const maxDistance = bfsResult?.stats?.maxDistance ?? 0
  const friendSuggestions = bfsResult?.suggestions ?? []
  const reachableProfessionals = Math.max((bfsResult?.stats?.reachableUsers ?? 0) - 1, 0)

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/40 to-indigo-400/10 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          DISCOVER ALUMNI
        </p>

        <h1 className="mt-3 text-4xl font-semibold text-white">
          Recommend alumni and professionals near a selected student.
        </h1>

        <p className="mt-5 max-w-3xl text-slate-300 leading-7">
          Explore how the campus network expands from a selected profile and uncover reachable
          professionals ordered by mutual connections.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">
              Choose Student
            </h2>

            <select
              value={startNodeId}
              onChange={(e) => setStartNodeId(e.target.value)}
              className="mt-5 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
            >
              <option value="">
                Select a student or professional
              </option>

              {graph.nodes.map((node) => (
                <option
                  key={node.id}
                  value={node.id}
                >
                  {node.displayName}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Community Insights</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Direct Connections"
                value={directFriends}
                helperText="Immediate alumni or professional links from the selected student."
              />
              <MetricCard
                label="Reachable Professionals"
                value={reachableProfessionals}
                helperText="People the network can reach within the current placement graph."
              />
              <MetricCard
                label="Network Radius"
                value={maxDistance}
                helperText="Maximum networking distance from the selected profile."
              />
              <MetricCard
                label="Suggestions"
                value={friendSuggestions.length}
                helperText="Suggested alumni ordered by mutual connections."
              />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold text-white">Suggested Connections</h2>

            <div className="mt-4 max-h-[320px] space-y-2 overflow-y-auto pr-2">
              {friendSuggestions.length === 0 && (
                <p className="text-slate-400">
                  Select a student to discover alumni and professionals nearby.
                </p>
              )}

              {friendSuggestions.map((suggestion) => {
                const person = graph.nodes.find(
                  (node) => node.id === suggestion.id,
                )

                return (
                  <div key={suggestion.id} className="rounded-xl bg-slate-900/50 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">
                          {person?.displayName}
                        </p>

                        <p className="text-xs text-slate-400">
                          {suggestion.mutualFriends} mutual connection{suggestion.mutualFriends !== 1 ? 's' : ''}
                        </p>
                      </div>

                      <div className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                        Professional Reach
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <GraphViewer
          highlightedNodes={bfsResult?.visitedNodes}
          highlightedEdges={bfsResult?.visitedEdges}
        />
      </section>
    </div>
  )
}

export default BFSPage