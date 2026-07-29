import { useMemo } from 'react'
import { useGraphStore } from '../../store/graphStore'

function FriendshipList() {
  const { graph, removeEdge } = useGraphStore()

  const friendships = useMemo(
    () =>
      graph.edges.map((edge) => ({
        ...edge,
        sourceName: graph.nodes.find((node) => node.id === edge.sourceId)?.displayName ?? edge.sourceId,
        targetName: graph.nodes.find((node) => node.id === edge.targetId)?.displayName ?? edge.targetId,
      })),
    [graph.edges, graph.nodes],
  )

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Friendships</h2>
        <p className="text-sm text-slate-300">Current connections between people.</p>
      </div>

      <div className="mt-5 space-y-3">
        {friendships.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
            No friendships have been created yet.
          </p>
        ) : (
          friendships.map((edge) => (
            <div
              key={`${edge.sourceId}-${edge.targetId}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3"
            >
              <p className="text-sm font-medium text-white">
                {edge.sourceName} ↔ {edge.targetName}
              </p>
              <button
                type="button"
                onClick={() => removeEdge({ sourceId: edge.sourceId, targetId: edge.targetId })}
                className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-400/20"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default FriendshipList