function HomePage() {
  const cards = [
    {
      title: 'Graph Builder',
      body: 'Create people and friendships before any algorithm runs. Every analysis screen depends on this shared graph model.',
      status: 'Milestone 2',
    },
    {
      title: 'Traversal Labs',
      body: 'BFS and DFS will explain friend discovery and community detection using reusable TypeScript algorithm modules.',
      status: 'Milestones 4-5',
    },
    {
      title: 'Network Insights',
      body: 'Friend suggestions, connected components, shortest connection, and influencer analysis all grow from the same data model.',
      status: 'Milestones 6-9',
    },
  ]

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/15 via-slate-900/40 to-indigo-400/10 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/70">
            Learn DSA through social networks
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Every algorithm should answer a real social-network question.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            This is not a generic visualizer. The app is structured so BFS means friend discovery,
            DFS means community detection, shortest path means six degrees of separation, and graph
            metrics explain influence.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Stack</p>
            <p className="mt-2 text-lg font-semibold text-white">React, TypeScript, Vite</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">UI direction</p>
            <p className="mt-2 text-lg font-semibold text-white">Tailwind, Lucide, React Router</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Architecture</p>
            <p className="mt-2 text-lg font-semibold text-white">Pure algorithms, separate visualizations</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
              {card.status}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{card.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
              Current milestone
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Milestone 1: project foundation</h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            The routed shell gives later modules a stable place to plug in without mixing graph
            logic into React components.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage