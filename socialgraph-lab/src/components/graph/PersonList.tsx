import { Users } from 'lucide-react'
import { useGraphStore } from '../../store/graphStore'

function PersonList() {
  const { graph } = useGraphStore()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <Users className="h-4 w-4 text-cyan-300" />
        <h2 className="text-sm font-semibold text-white">
          Students & Professionals ({graph.nodes.length})
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {graph.nodes.length === 0 ? (
          <p className="px-4 py-4 text-sm text-slate-400">
            No students or professionals added yet.
          </p>
        ) : (
          <ul>
            {graph.nodes.map((node) => (
              <li
                key={node.id}
                className="border-b border-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{node.displayName}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300">
                    {node.role ?? 'Student'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PersonList