import { useMemo, useState } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import MetricCard from '../components/ui/MetricCard'
import { runDFS } from '../algorithms'
import { useGraphStore } from '../store/graphStore'
import type { TraversalResult } from '../types/algorithm'

const emptyTraversalResult: TraversalResult = {
  visitedNodes: [],
  visitedEdges: [],
}

function DFSPage() {
  const { graph } = useGraphStore()

  const [selectedNodeId, setSelectedNodeId] = useState('')

  const result = useMemo(() => {
    if (!selectedNodeId) return emptyTraversalResult
    return runDFS(graph, selectedNodeId)
  }, [graph, selectedNodeId])

  const exploredUsers = result.stats?.exploredUsers ?? 0
  const communitySize = result.stats?.communitySize ?? 0
  const explorationDepth = result.stats?.explorationDepth ?? 0

  const exploredPeople = result.visitedNodes
    .map((id) => graph.nodes.find((node) => node.id === id))
    .filter(Boolean)

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Professional Network
        </h1>

        <p className="mt-2 text-slate-400">
          Explore the complete professional community connected to any placement member.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">

        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">

          <MetricCard
            label="Community Size"
            value={communitySize}
          />

          <MetricCard
            label="Profiles Explored"
            value={exploredUsers}
          />

          <MetricCard
            label="Depth"
            value={explorationDepth}
          />

          <MetricCard
            label="Connections"
            value={result.visitedEdges.length}
          />

        </div>

      </div>

      <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">

        <div className="space-y-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">

            <h2 className="text-lg font-semibold text-white">
              Select Member
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Choose a member to explore their professional network.
            </p>

            <select
              value={selectedNodeId}
              onChange={(e) => setSelectedNodeId(e.target.value)}
              className="mt-5 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
            >
              <option value="">
                Select a member
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

            <h2 className="text-xl font-semibold text-white">
              Community Members
            </h2>

            <div className="mt-4 max-h-[560px] overflow-y-auto space-y-3 pr-2">

              {exploredPeople.length === 0 && (
                <p className="text-slate-400">
                  Select a member to explore their professional community.
                </p>
              )}

              {exploredPeople.map((person) => (
                <div
                  key={person!.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition-all duration-200 hover:border-cyan-400/40 hover:bg-slate-900/60"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-semibold text-white">
                        {person!.displayName}
                      </p>

                      <p className="text-xs text-cyan-300">
                        {person!.role}
                      </p>

                      <p className="text-xs text-slate-400">
                        {person!.department} • {person!.batch}
                      </p>

                      {person!.company && (
                        <p className="text-xs text-emerald-300">
                          {person!.company}
                        </p>
                      )}

                    </div>

                    <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Connected
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        <GraphViewer
          highlightedNodes={result.visitedNodes}
          highlightedEdges={result.visitedEdges}
        />

      </section>

    </div>
  )
}

export default DFSPage