import { useGraphStore } from '../../store/graphStore'

function PersonList() {
  const { graph, removeNode } = useGraphStore()

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">People</h2>
        <p className="text-sm text-slate-300">All people currently in the graph.</p>
      </div>

      <div className="mt-5 space-y-3">
        {graph.nodes.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
            No people have been added yet.
          </p>
        ) : (
          graph.nodes.map((node) => (
            <div
              key={node.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3"
            >
              <div>
                <p className="font-medium text-white">{node.displayName}</p>
                <p className="text-xs text-slate-400">Node ID: {node.id}</p>
              </div>
              <button
                type="button"
                onClick={() => removeNode(node.id)}
                className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-400/20"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default PersonList