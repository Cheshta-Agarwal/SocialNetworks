import { useMemo, useState } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import MetricCard from '../components/ui/MetricCard'
import { runCycleDetection, runDFS } from '../algorithms'
import type { TraversalResult } from '../types/algorithm'
import { useGraphStore } from '../store/graphStore'

const emptyTraversalResult: TraversalResult = {
  visitedNodes: [],
  visitedEdges: [],
}

function CycleDetectionPage() {
  return (
    <CycleDetectionWorkspace />
  )
}

function CycleDetectionWorkspace() {
  const { graph } = useGraphStore()
  const [selectedNodeId, setSelectedNodeId] = useState('')
  const [cycleDetected, setCycleDetected] = useState<boolean | null>(null)
  const [cycleEdges, setCycleEdges] = useState<TraversalResult['visitedEdges']>([])
  const [traversalResult, setTraversalResult] = useState<TraversalResult>(emptyTraversalResult)

  const selectedNodeExists = useMemo(
    () => graph.nodes.some((node) => node.id === selectedNodeId),
    [graph.nodes, selectedNodeId],
  )

  const canRunCheck = selectedNodeExists && graph.nodes.length > 0

  function handleCheckCycle() {
    if (!selectedNodeExists) {
      return
    }

    const result = runCycleDetection(graph)
    setCycleDetected(result.hasCycle)
    setCycleEdges(result.cycleEdges ?? [])
    setTraversalResult(runDFS(graph, selectedNodeId))
  }

  const cycleNodes = useMemo(
    () => Array.from(new Set(cycleEdges.flatMap((edge) => [edge.sourceId, edge.targetId]))),
    [cycleEdges],
  )

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/50 to-emerald-400/10 p-6 shadow-2xl shadow-slate-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          NETWORK INTEGRITY CHECK
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Detect suspicious referral loops in the placement network.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
          When a cycle exists, the loop is highlighted directly on the graph so administrators can
          inspect the suspicious chain.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Run Integrity Check</h2>
              <p className="text-sm text-slate-300">
                Select a profile for traversal context and then inspect the referral loop status.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <label className="block text-sm font-medium text-slate-200" htmlFor="cycle-start-node">
                Start profile
              </label>
              <select
                id="cycle-start-node"
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
                onClick={handleCheckCycle}
                disabled={!canRunCheck}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check Network
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Network Insights</h2>
              <p className="text-sm text-slate-300">Referral loop result for the current graph.</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <MetricCard
                label="Status"
                value={cycleDetected === null ? 'Not checked' : cycleDetected ? 'Warning' : 'Healthy'}
                helperText={cycleDetected ? 'A cycle exists in the referral chain.' : 'No suspicious loop detected.'}
              />
              <MetricCard
                label="Highlighted Loop Edges"
                value={cycleEdges.length}
                helperText="Edges that form the detected cycle."
              />
              <MetricCard
                label="Traversal Context"
                value={traversalResult.visitedEdges.length}
                helperText="DFS edges used for the selected start profile."
              />
            </div>
          </section>
        </div>

        <GraphViewer
          highlightedEdges={traversalResult.visitedEdges}
          pathNodes={cycleNodes}
          pathEdges={cycleEdges}
        />
      </section>
    </div>
  )
}

export default CycleDetectionPage