import { useMemo, useState } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import { GraphStoreProvider, useGraphStore } from '../store/graphStore'
import { runDFS } from '../algorithms'
import type { TraversalResult } from '../types/algorithm'

const emptyTraversalResult: TraversalResult = {
  visitedNodes: [],
  visitedEdges: [],
}

function DFSPage() {
  return (
    <GraphStoreProvider>
      <DFSWorkspace />
    </GraphStoreProvider>
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
          DFS Visualization
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Run depth first search from a selected person.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
          This page reuses the shared graph viewer and stores the traversal result locally for the
          current run.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Run DFS</h2>
              <p className="text-sm text-slate-300">Choose a starting node and execute the traversal.</p>
            </div>

            <div className="mt-5 space-y-3">
              <label className="block text-sm font-medium text-slate-200" htmlFor="dfs-start-node">
                Start node
              </label>
              <select
                id="dfs-start-node"
                value={selectedNodeId}
                onChange={(event) => setSelectedNodeId(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20 disabled:text-slate-500"
                disabled={graph.nodes.length === 0}
              >
                <option value="">Select a person</option>
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
                Run DFS
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Traversal Summary</h2>
              <p className="text-sm text-slate-300">Results from the latest DFS execution.</p>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <dt className="text-sm text-slate-400">Visit Order</dt>
                <dd className="mt-2 text-sm font-medium text-white">
                  {traversalResult.visitedNodes.length > 0
                    ? traversalResult.visitedNodes.join(' → ')
                    : 'No traversal run yet'}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <dt className="text-sm text-slate-400">Visited Nodes</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">
                  {traversalResult.visitedNodes.length}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <dt className="text-sm text-slate-400">Traversed Edges</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">
                  {traversalResult.visitedEdges.length}
                </dd>
              </div>
            </dl>
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