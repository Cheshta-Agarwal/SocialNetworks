import { useMemo, useState } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import { runShortestPath } from '../algorithms'
import type { ShortestPathResult } from '../types/algorithm'
import { useGraphStore } from '../store/graphStore'

const emptyShortestPathResult: ShortestPathResult = {
  path: [],
  visitedNodes: [],
  visitedEdges: [],
  distance: -1,
}

function ShortestPathPage() {
  return (
    <ShortestPathWorkspace />
  )
}

function ShortestPathWorkspace() {
  const { graph } = useGraphStore()
  const [sourceNodeId, setSourceNodeId] = useState('')
  const [destinationNodeId, setDestinationNodeId] = useState('')
  const [result, setResult] = useState<ShortestPathResult>(emptyShortestPathResult)

  const sourceExists = useMemo(
    () => graph.nodes.some((node) => node.id === sourceNodeId),
    [graph.nodes, sourceNodeId],
  )

  const destinationExists = useMemo(
    () => graph.nodes.some((node) => node.id === destinationNodeId),
    [graph.nodes, destinationNodeId],
  )

    const canRun = sourceExists && destinationExists

  function handleRunShortestPath() {
    if (!canRun) {
      return
    }

    setResult(runShortestPath(graph, sourceNodeId, destinationNodeId))
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/50 to-emerald-400/10 p-6 shadow-2xl shadow-slate-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          Shortest Path
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Find the shortest connection between two people.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
          The visited search frontier is shown in blue while the final shortest path is highlighted
          in gold.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Run Algorithm</h2>
              <p className="text-sm text-slate-300">Select a source and destination node.</p>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200" htmlFor="shortest-path-source">
                  Source node
                </label>
                <select
                  id="shortest-path-source"
                  value={sourceNodeId}
                  onChange={(event) => setSourceNodeId(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20 disabled:text-slate-500"
                  disabled={graph.nodes.length === 0}
                >
                  <option value="">Select a source</option>
                  {graph.nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200" htmlFor="shortest-path-destination">
                  Destination node
                </label>
                <select
                  id="shortest-path-destination"
                  value={destinationNodeId}
                  onChange={(event) => setDestinationNodeId(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20 disabled:text-slate-500"
                  disabled={graph.nodes.length === 0}
                >
                  <option value="">Select a destination</option>
                  {graph.nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleRunShortestPath}
                disabled={!canRun}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Run Algorithm
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Execution Summary</h2>
              <p className="text-sm text-slate-300">Current shortest path result.</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 sm:col-span-2">
                <p className="text-sm text-slate-400">Path</p>
                <p className="mt-2 text-sm font-medium text-white">
                  {result.path.length > 0 ? result.path.join(' → ') : 'No path computed yet'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-slate-400">Distance</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {result.distance >= 0 ? result.distance : 'N/A'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-slate-400">Visited Nodes</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result.visitedNodes.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 sm:col-span-2">
                <p className="text-sm text-slate-400">Visited Edges</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result.visitedEdges.length}</p>
              </div>
            </div>
          </section>
        </div>

        <GraphViewer
          highlightedNodes={result.visitedNodes}
          highlightedEdges={result.visitedEdges}
          pathNodes={result.path}
          pathEdges={result.path.length > 1 ? result.path.slice(0, -1).map((sourceId, index) => ({ sourceId, targetId: result.path[index + 1] })) : []}
        />
      </section>
    </div>
  )
}

export default ShortestPathPage