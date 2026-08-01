import { Network } from 'lucide-react'
import { useGraphStore } from '../../store/graphStore'

function FriendshipList() {
  const { graph } = useGraphStore()

  const getPersonName = (id: string) =>
    graph.nodes.find((node) => node.id === id)?.displayName ?? id

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <Network className="h-4 w-4 text-emerald-300" />
        <h2 className="text-sm font-semibold text-white">
          Professional Connections ({graph.edges.length})
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {graph.edges.length === 0 ? (
          <p className="px-4 py-4 text-sm text-slate-400">
            No professional connections created yet.
          </p>
        ) : (
          <ul>
            {graph.edges.map((edge) => (
              <li
                key={`${edge.sourceId}-${edge.targetId}`}
                className="border-b border-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
              >
                {getPersonName(edge.sourceId)}
                <span className="mx-2 text-slate-500">↔</span>
                {getPersonName(edge.targetId)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default FriendshipList