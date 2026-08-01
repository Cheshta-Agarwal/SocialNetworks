import { useMemo, useState, type FormEvent } from 'react'
import { useGraphStore } from '../../store/graphStore'

function AddFriendshipForm() {
  const { graph, addEdge } = useGraphStore()
  const [sourceId, setSourceId] = useState('')
  const [targetId, setTargetId] = useState('')

  const hasEnoughPeople = graph.nodes.length >= 2

  const sourceOptions = useMemo(
    () => graph.nodes.filter((node) => node.id !== targetId),
    [graph.nodes, targetId],
  )

  const targetOptions = useMemo(
    () => graph.nodes.filter((node) => node.id !== sourceId),
    [graph.nodes, sourceId],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!sourceId || !targetId || sourceId === targetId) {
      return
    }

    addEdge({ sourceId, targetId })
    setSourceId('')
    setTargetId('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Add Connection</h2>
      </div>

      <div className="mt-auto grid gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-200" htmlFor="source-person">
            From
          </label>
          <select
            id="source-person"
            value={sourceId}
            onChange={(event) => setSourceId(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20 disabled:text-slate-500"
            disabled={!hasEnoughPeople}
          >
            <option value="">User A</option>
            {sourceOptions.map((node) => (
              <option key={node.id} value={node.id}>
                {node.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200" htmlFor="target-person">
            To
          </label>
          <select
            id="target-person"
            value={targetId}
            onChange={(event) => setTargetId(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20 disabled:text-slate-500"
            disabled={!hasEnoughPeople}
          >
            <option value="">User B</option>
            {targetOptions.map((node) => (
              <option key={node.id} value={node.id}>
                {node.displayName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!sourceId || !targetId || sourceId === targetId}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create Connection
      </button>
    </form>
  )
}

export default AddFriendshipForm