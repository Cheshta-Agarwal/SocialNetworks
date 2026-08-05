import { useMemo, useState } from 'react'
import { runBFS } from '../algorithms/bfs'
import GraphViewer from '../components/graph/GraphViewer'
import MetricCard from '../components/ui/MetricCard'
import { useGraphStore } from '../store/graphStore'

function BFSPage() {
  alert("BFS Page Loaded")
  const { graph } = useGraphStore()
  const [startNodeId, setStartNodeId] = useState('')
  const bfsResult = useMemo(() => {
    if (!startNodeId) return null
    return runBFS(graph, startNodeId)
  }, [graph, startNodeId])
console.log(startNodeId)
console.log(bfsResult)
  const directFriends = bfsResult?.stats?.directFriends ?? 0
  const maxDistance = bfsResult?.stats?.maxDistance ?? 0
  const friendSuggestions = bfsResult?.suggestions ?? []
  const reachableProfessionals = Math.max((bfsResult?.stats?.reachableUsers ?? 0) - 1, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Discover Alumni
        </h1>

        <p className="mt-2 text-slate-400">
          Find alumni, recruiters and professionals through your placement network.
        </p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          <MetricCard
            label="Direct Links"
            value={directFriends}
            // helperText="Immediate alumni or professional links from the selected student."
          />
          <MetricCard
            label="Network Radius"
            value={maxDistance}
            // helperText="Maximum networking distance from the selected profile."
          />
          <MetricCard
            label="Recommendations"
            value={friendSuggestions.length}
            // helperText="Suggested alumni ordered by mutual connections."
          />
          <MetricCard
            label="Reachable"
            value={reachableProfessionals}
            // helperText="People the network can reach within the current placement graph."
          />
        </div>
      </div>
      <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg font-semibold text-white">
                Select Student
            </h2>

            <p className="mt-1 text-sm text-slate-400">
                Choose a profile to discover alumni recommendations.
            </p>

            <select
              value={startNodeId}
              onChange={(e) => {
                console.log("Selected:", e.target.value)
                setStartNodeId(e.target.value)
              }}
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-xl font-semibold text-white">Suggested Connections</h2>
            <div className="mt-4 max-h-[560px] overflow-y-auto space-y-3 pr-2">
              {friendSuggestions.length === 0 && (
                <p className="text-slate-400">
                  Click a student above to explore recommended alumni and recruiters.
                </p>
              )}

              {friendSuggestions.map((suggestion) => {
                const person = graph.nodes.find(
                  (node) => node.id === suggestion.id,
                )

                return (
                  <div key={suggestion.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition-all duration-200 hover:border-cyan-400/40 hover:bg-slate-900/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">
                          {person?.displayName}
                        </p>

                        <p className="text-xs text-cyan-300">
                          {person?.role}
                        </p>

                        <p className="text-xs text-slate-400">
                          {person?.department} • {person?.batch}
                        </p>

                        {person?.company && (
                          <p className="text-xs text-emerald-300">
                            {person.company}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-slate-400">
                          {suggestion.mutualFriends} mutual connection{suggestion.mutualFriends !== 1 ? 's' : ''}
                        </p>
                      </div>

                      <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                        {person?.role}
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