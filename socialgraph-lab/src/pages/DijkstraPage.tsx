import { useMemo, useState } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import { runDijkstra } from '../algorithms'
import type { DijkstraResult } from '../types/algorithm'
import { useGraphStore } from '../store/graphStore'

const emptyDijkstraResult: DijkstraResult = {
  shortestPath: [],
  totalDistance: -1,
  visitedNodes: [],
  visitedEdges: [],
}

function DijkstraPage() {
  return (
    <DijkstraWorkspace />
  )
}

function DijkstraWorkspace() {
  const { graph } = useGraphStore()
  const [sourceNodeId, setSourceNodeId] = useState('')
  const [destinationNodeId, setDestinationNodeId] = useState('')
  const [result, setResult] = useState<DijkstraResult>(emptyDijkstraResult)

  const sourceExists = useMemo(
    () => graph.nodes.some((node) => node.id === sourceNodeId),
    [graph.nodes, sourceNodeId],
  )

  const destinationExists = useMemo(
    () => graph.nodes.some((node) => node.id === destinationNodeId),
    [graph.nodes, destinationNodeId],
  )

    const canRun = sourceExists && destinationExists

  function handleRunDijkstra() {
    if (!canRun) {
      return
    }

    setResult(runDijkstra(graph, sourceNodeId, destinationNodeId))
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/50 to-emerald-400/10 p-6 shadow-2xl shadow-slate-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          Strongest Route
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Discover the strongest connection route between two people across the social network.
        </h1>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Find Route</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200" htmlFor="dijkstra-source">
                  From
                </label>
                <select
                  id="dijkstra-source"
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
                <label className="block text-sm font-medium text-slate-200" htmlFor="dijkstra-destination">
                  To
                </label>
                <select
                  id="dijkstra-destination"
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
                onClick={handleRunDijkstra}
                disabled={!canRun}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Run Algorithm
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Route Summary</h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 sm:col-span-2">
                <p className="text-sm text-slate-400">Connection Route</p>
                <p className="mt-2 text-sm font-medium text-white">
                  {result.shortestPath.length > 0 ? result.shortestPath.join(' → ') : 'No path computed yet'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-slate-400">Total Distance</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {result.totalDistance >= 0 ? result.totalDistance : 'N/A'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-slate-400">People Explored</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result.visitedNodes.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 sm:col-span-2">
                <p className="text-sm text-slate-400">Connections Checked</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result.visitedEdges.length}</p>
              </div>
            </div>
          </section>
        </div>

        <GraphViewer
          highlightedNodes={result.visitedNodes}
          highlightedEdges={result.visitedEdges}
          pathNodes={result.shortestPath}
          pathEdges={result.shortestPath.length > 1 ? result.shortestPath.slice(0, -1).map((sourceId, index) => ({ sourceId, targetId: result.shortestPath[index + 1] })) : []}
        />
      </section>
    </div>
  )
}

export default DijkstraPage