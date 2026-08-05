import { Users, BriefcaseBusiness } from 'lucide-react'
import { useGraphStore } from '../store/graphStore'

import AddPersonForm from '../components/graph/AddPersonForm'
import AddFriendshipForm from '../components/graph/AddFriendshipForm'

import PersonList from '../components/graph/PersonList'
import FriendshipList from '../components/graph/FriendshipList'
import GraphViewer from '../components/graph/GraphViewer'

function HomePage() {
  return <PlacementDashboard />
}

function PlacementDashboard() {
  const { graph } = useGraphStore()

  return (
    <div className="space-y-6">
      {/* ================= TOP STATS ================= */}

      <section className="grid gap-5 md:grid-cols-2">

        <div className="rounded-3xl bg-white/5 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">

                Registered Members

              </p>

              <p className="mt-2 text-3xl font-bold text-white">

                {graph.nodes.length}

              </p>

            </div>

            <Users className="h-8 w-8 text-cyan-300" />

          </div>

        </div>

        <div className="rounded-3xl bg-white/5 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">

                Professional Connections

              </p>

              <p className="mt-2 text-3xl font-bold text-white">

                {graph.edges.length}

              </p>

            </div>

            <BriefcaseBusiness className="h-8 w-8 text-emerald-300" />

          </div>

        </div>

      </section>

      {/* ================= FORMS ================= */}

      <section className="grid gap-4 lg:grid-cols-2">

        <AddPersonForm />

        <AddFriendshipForm />

      </section>

      {/* ================= VISUALIZATION ================= */}

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">

        <GraphViewer />

        <div className="grid h-[620px] grid-rows-2 gap-6">

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">

            <PersonList />

          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">

            <FriendshipList />

          </div>

        </div>

      </section>

    </div>
  )
}

export default HomePage