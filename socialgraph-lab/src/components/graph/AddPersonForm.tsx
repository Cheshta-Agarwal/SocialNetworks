import { useState, type FormEvent } from 'react'
import { useGraphStore } from '../../store/graphStore'

function AddPersonForm() {
  const { addNode } = useGraphStore()
  const [displayName, setDisplayName] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = displayName.trim()

    if (!trimmedName) {
      return
    }

    addNode({
      id: crypto.randomUUID(),
      displayName: trimmedName,
    })

    setDisplayName('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Username</h2>
      </div>
      <div className="space-y-2">
        <input
          id="person-name"
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Enter a valid username"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20"
        />
      </div>

      <button
        type="submit"
        disabled={!displayName.trim()}
        className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add user
      </button>
    </form>
  )
}

export default AddPersonForm