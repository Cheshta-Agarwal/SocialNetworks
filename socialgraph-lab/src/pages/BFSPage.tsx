import { useMemo, useState } from 'react'

import GraphViewer from '../components/graph/GraphViewer'
import { runBFS } from '../algorithms/bfs'
import { useGraphStore } from '../store/graphStore'

function BFSPage() {
  const { graph } = useGraphStore()
  const [startNodeId, setStartNodeId] = useState('')
  const bfsResult = useMemo(() => {
    if (!startNodeId) return null
    return runBFS(graph, startNodeId)
  }, [graph, startNodeId])

  const reachableUsers = bfsResult?.stats?.reachableUsers ?? 0
  const directFriends = bfsResult?.stats?.directFriends ?? 0
  const maxDistance = bfsResult?.stats?.maxDistance ?? 0
  const friendSuggestions = bfsResult?.suggestions ?? []

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/40 to-indigo-400/10 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          FRIEND DISCOVERY
        </p>

        <h1 className="mt-3 text-4xl font-semibold text-white">
          Discover people beyond your immediate friend circle.
        </h1>

        <p className="mt-5 max-w-3xl text-slate-300 leading-7">
          Explore how your network expands from a selected user and
          discover new people that are reachable through existing
          friendships.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">
              Choose User
            </h2>

            <select
              value={startNodeId}
              onChange={(e) => setStartNodeId(e.target.value)}
              className="mt-5 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
            >
              <option value="">
                Select a person
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
            <h2 className="text-xl font-semibold text-white">
              Network Insights
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <StatCard
                title="Direct Friends"
                value={directFriends}
              />

              <StatCard
                title="Reachable Users"
                value={reachableUsers}
              />

              <StatCard
                title="Maximum Distance"
                value={maxDistance}
              />

              <StatCard
                title="Suggestions"
                value={friendSuggestions.length}
              />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold text-white">
              People You May Know
            </h2>

            <div className="mt-4 space-y-2">
              {friendSuggestions.length === 0 && (
                <p className="text-slate-400">
                  Select a user to discover new people.
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
                          {suggestion.mutualFriends} mutual friend{suggestion.mutualFriends !== 1 ? 's' : ''}
                        </p>
                      </div>

                      <div className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                        Suggested
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

type StatCardProps = {
  title: string
  value: string | number
}

function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-slate-950/50 p-4">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">
        {value}
      </p>
    </div>
  )
}

export default BFSPage