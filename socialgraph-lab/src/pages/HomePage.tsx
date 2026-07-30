import { ArrowRight, Activity, BarChart3, Network, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { algorithmCards, routePaths } from '../data/siteContent'
import { runConnectedComponents } from '../algorithms'
import { useGraphStore } from '../store/graphStore'
import { useMemo } from 'react'

function HomePage() {
  const { graph } = useGraphStore()

  const graphStats = useMemo(() => {
    if (graph.nodes.length === 0) {
      return null
    }

    const componentResult = runConnectedComponents(graph)
    const averageDegree = (graph.edges.length * 2) / graph.nodes.length

    return {
      people: graph.nodes.length,
      friendships: graph.edges.length,
      averageDegree,
      connectedComponents: componentResult.componentCount,
    }
  }, [graph])

  const statCards = graphStats
    ? [
        { label: 'People', value: graphStats.people.toString(), icon: Users },
        { label: 'Friendships', value: graphStats.friendships.toString(), icon: Network },
        { label: 'Average degree', value: graphStats.averageDegree.toFixed(1), icon: Activity },
        { label: 'Connected components', value: graphStats.connectedComponents.toString(), icon: BarChart3 },
      ]
    : []

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/15 via-slate-900/50 to-indigo-400/10 p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/80">
            SocialGraph Lab dashboard
          </div>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Every algorithm is one click away from a real social-network story.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            Build a graph, explore it, and switch between traversals, connectivity checks, and
            shortest-path tools without losing the learning context. The dashboard keeps the full
            lab discoverable instead of hiding the algorithms behind separate pages.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={routePaths.graphBuilder}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Open Graph Builder
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={routePaths.shortestPath}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
            >
              Try Shortest Path
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur">
          {graphStats ? (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                  Live statistics
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Current graph snapshot</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  These numbers update with the graph builder and help learners understand what the
                  algorithms are operating on.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {statCards.map((stat) => {
                  const Icon = stat.icon

                  return (
                    <article key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3 text-slate-300">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/15">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-medium">{stat.label}</p>
                      </div>
                      <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{stat.value}</p>
                    </article>
                  )
                })}
              </div>

              <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-7 text-amber-50/90">
                Connected components is computed live from the same graph model used by the analysis pages.
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                  No graph yet
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Start with the graph builder</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Add a few people and friendships to unlock the statistics panel, traversal demos,
                  and shortest-path visualizations.
                </p>
              </div>

              <Link
                to={routePaths.graphBuilder}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-white/10"
              >
                Open Graph Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
              Algorithm dashboard
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Open any lab from the same dashboard
            </h3>
          </div>
          <p className="hidden max-w-xl text-sm leading-7 text-slate-300 md:block">
            Each card combines the algorithm name, the social-network lesson, and a direct route into
            the lab.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {algorithmCards.map((card) => {
            const Icon = card.icon

            return (
              <article key={card.title} className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.07]">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/15 transition group-hover:bg-cyan-400/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Link
                    to={card.to}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition group-hover:border-cyan-300/20 group-hover:text-white"
                  >
                    Open Lab
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <h4 className="mt-5 text-xl font-semibold text-white">{card.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.summary}</p>

                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                    Social network use case
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{card.useCase}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default HomePage