import { GraphStoreProvider, useGraphStore } from '../store/graphStore'
import AddFriendshipForm from '../components/graph/AddFriendshipForm'
import AddPersonForm from '../components/graph/AddPersonForm'
import FriendshipList from '../components/graph/FriendshipList'
import PersonList from '../components/graph/PersonList'

function GraphBuilderPage() {
  return (
    <GraphStoreProvider>
      <GraphBuilderWorkspace />
    </GraphStoreProvider>
  )
}

function GraphBuilderWorkspace() {
  const { graph } = useGraphStore()

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/50 to-emerald-400/10 p-6 shadow-2xl shadow-slate-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          Graph Builder
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Build the social network before running any algorithm.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
          This workspace edits the shared graph model directly. Later BFS, DFS, and influence screens
          will read from the same structure without duplicating state or logic.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-300">People</p>
          <p className="mt-2 text-2xl font-semibold text-white">{graph.nodes.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-300">Friendships</p>
          <p className="mt-2 text-2xl font-semibold text-white">{graph.edges.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-300">Model status</p>
          <p className="mt-2 text-2xl font-semibold text-white">Ready</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <AddPersonForm />
          <AddFriendshipForm />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PersonList />
          <FriendshipList />
        </div>
      </section>
    </div>
  )
}

export default GraphBuilderPage