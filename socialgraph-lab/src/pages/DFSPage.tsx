import { useMemo, useState } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import MetricCard from '../components/ui/MetricCard'
import { useGraphStore } from '../store/graphStore'
import { runDFS } from '../algorithms'
import type { TraversalResult } from '../types/algorithm'

const emptyTraversalResult: TraversalResult = {
  visitedNodes: [],
  visitedEdges: [],
}

function DFSPage() {
  return (
    <DFSWorkspace />
  )
}

function DFSWorkspace() {
  const { graph } = useGraphStore()
  const [selectedNodeId, setSelectedNodeId] = useState('')
  const [traversalResult, setTraversalResult] = useState<TraversalResult>(emptyTraversalResult)

  const selectedNodeExists = useMemo(
    () => graph.nodes.some((node) => node.id === selectedNodeId),
    [graph.nodes, selectedNodeId],
  )

  const canRunDFS = selectedNodeExists && graph.nodes.length > 0

  function handleRunDFS() {
    if (!selectedNodeExists) {
      return
    }

    setTraversalResult(runDFS(graph, selectedNodeId))
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/50 to-emerald-400/10 p-6 shadow-2xl shadow-slate-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          PROFESSIONAL COMMUNITY EXPLORER
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Explore everyone connected through one professional community.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
          Select a starting profile and reveal the connected referral community without changing the
          traversal visualization.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Run DFS</h2>
              <p className="text-sm text-slate-300">Choose a starting profile and explore the connected community.</p>
            </div>

            <div className="mt-5 space-y-3">
              <label className="block text-sm font-medium text-slate-200" htmlFor="dfs-start-node">
                Start profile
              </label>
              <select
                id="dfs-start-node"
                value={selectedNodeId}
                onChange={(event) => setSelectedNodeId(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20 disabled:text-slate-500"
                disabled={graph.nodes.length === 0}
              >
                <option value="">Select a student or professional</option>
                {graph.nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.displayName}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleRunDFS}
                disabled={!canRunDFS}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Explore Community
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Traversal Summary</h2>
              <p className="text-sm text-slate-300">Community insights from the latest exploration.</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <MetricCard
                label="Community Size"
                value={traversalResult.stats?.communitySize ?? 0}
                helperText="Total profiles reached through this community."
              />
              <MetricCard
                label="People Explored"
                value={traversalResult.stats?.exploredUsers ?? 0}
                helperText="Profiles visited during the depth-first exploration."
              />
              <MetricCard
                label="Exploration Depth"
                value={traversalResult.stats?.explorationDepth ?? 0}
                helperText="Maximum distance reached from the starting profile."
              />
            </div>
          </section>
        </div>

        <GraphViewer
          highlightedNodes={traversalResult.visitedNodes}
          highlightedEdges={traversalResult.visitedEdges}
        />
      </section>
    </div>
  )
}

export default DFSPage