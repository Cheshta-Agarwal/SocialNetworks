import { useGraphStore } from '../store/graphStore'
import AddFriendshipForm from '../components/graph/AddFriendshipForm'
import AddPersonForm from '../components/graph/AddPersonForm'
import FriendshipList from '../components/graph/FriendshipList'
import GraphViewer from '../components/graph/GraphViewer'
import PersonList from '../components/graph/PersonList'
import MetricCard from '../components/ui/MetricCard'

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
        <MetricCard
          label="Students & Professionals"
          value={graph.nodes.length}
          helperText="Profiles currently represented in the placement network."
        />
        <MetricCard
          label="Professional Connections"
          value={graph.edges.length}
          helperText="Referral and networking links already mapped."
        />
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