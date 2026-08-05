import { useMemo } from 'react'
import { ShieldAlert } from 'lucide-react'
import GraphViewer from '../components/graph/GraphViewer'
import MetricCard from '../components/ui/MetricCard'
import { runCycleDetection } from '../algorithms'
import { useGraphStore } from '../store/graphStore'

function CycleDetectionPage() {
  const { graph } = useGraphStore()

  const result = useMemo(() => runCycleDetection(graph), [graph])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Referral Integrity
        </h1>

        <p className="mt-2 text-slate-400">
          Detect suspicious referral loops and maintain a trustworthy placement network.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          <MetricCard
            label="Status"
            value={result.hasCycle ? 'Warning' : 'Healthy'}
          />
          <MetricCard
            label="Members"
            value={graph.nodes.length}
          />
          <MetricCard
            label="Connections"
            value={graph.edges.length}
          />
          <MetricCard
            label="Risk Level"
            value={result.hasCycle ? 'High' : 'Low'}
          />
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <ShieldAlert
                className={`h-8 w-8 ${
                  result.hasCycle
                    ? 'text-red-400'
                    : 'text-emerald-400'
                }`}
              />

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Security Assessment
                </h2>

                <p className="text-sm text-slate-400">
                  Automated referral integrity analysis
                </p>
              </div>
            </div>

            <div
              className={`mt-5 rounded-2xl border p-4 ${
                result.hasCycle
                  ? 'border-red-400/20 bg-red-500/10'
                  : 'border-emerald-400/20 bg-emerald-500/10'
              }`}
            >

              <p
                className={`font-semibold ${
                  result.hasCycle
                    ? 'text-red-300'
                    : 'text-emerald-300'
                }`}
              >

                {result.hasCycle
                  ? 'Suspicious referral loop detected.'
                  : 'Network integrity verified.'}

              </p>

              <p className="mt-3 text-sm leading-7 text-slate-300">

                {result.hasCycle
                  ? 'Circular recommendation chains were found in the placement network. These relationships should be reviewed before approving referrals.'
                  : 'No referral loops were detected. The current placement network appears healthy and follows expected referral patterns.'}
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
            {result.hasCycle && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/5 p-4">
                <h3 className="font-semibold text-red-300">
                  Referral Loop
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {result.cycleNodes.map((id, index) => {
                    const person = graph.nodes.find((node) => node.id === id)

                    return (
                      <div
                        key={`${id}-${index}`}
                        className="flex items-center gap-2"
                      >
                        <span className="rounded-lg bg-slate-900/60 px-3 py-2 text-sm text-white">
                          {person?.displayName}
                        </span>

                        {index < result.cycleNodes.length - 1 && (
                          <span className="text-red-300 font-bold">
                            →
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

              <h3 className="font-semibold text-cyan-300">
                Why monitor referral integrity?
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Prevent fake referral groups</li>
                <li>• Detect recommendation abuse</li>
                <li>• Increase recruiter confidence</li>
                <li>• Maintain transparent placements</li>
              </ul>
            </div>
          </div>
        </div>

        <GraphViewer
          highlightedNodes={result.cycleNodes}
          highlightedEdges={result.cycleEdges}
        />
      </section>
    </div>
  )
}

export default CycleDetectionPage