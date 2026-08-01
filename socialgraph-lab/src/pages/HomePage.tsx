import { Users, Network } from 'lucide-react'
import { useGraphStore } from '../store/graphStore'
import AddFriendshipForm from '../components/graph/AddFriendshipForm'
import AddPersonForm from '../components/graph/AddPersonForm'
import FriendshipList from '../components/graph/FriendshipList'
import GraphViewer from '../components/graph/GraphViewer'
import PersonList from '../components/graph/PersonList'
import GraphToolbar from '../components/graph/GraphToolbar'

function HomePage() {
  return (
    <HomeWorkspace />
  )
}

function HomeWorkspace() {
  const { graph } = useGraphStore()

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-300">Active Users</p>
            <Users className="h-5 w-5 text-cyan-300" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-white">
            {graph.nodes.length}
          </p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-300">Active Connections</p>
            <Network className="h-5 w-5 text-cyan-300" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-white">
            {graph.edges.length}
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <AddPersonForm />
          <AddFriendshipForm />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <GraphViewer />
          <div className="flex h-[620px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="flex-1 overflow-hidden border-b border-white/10">
              <PersonList />
            </div>
            <div className="flex-1 overflow-hidden">
              <FriendshipList />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage