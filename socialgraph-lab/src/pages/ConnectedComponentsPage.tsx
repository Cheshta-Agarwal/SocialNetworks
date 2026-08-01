import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import MetricCard from '../components/ui/MetricCard'
import { runConnectedComponents } from '../algorithms'
import { useGraphStore } from '../store/graphStore'

const COMPONENT_PALETTE: CSSProperties[] = [
  { backgroundColor: '#1d4ed8', border: '1.5px solid #1e3a8a', color: '#ffffff' },
  { backgroundColor: '#0f766e', border: '1.5px solid #115e59', color: '#ffffff' },
  { backgroundColor: '#a16207', border: '1.5px solid #854d0e', color: '#ffffff' },
  { backgroundColor: '#7c3aed', border: '1.5px solid #5b21b6', color: '#ffffff' },
  { backgroundColor: '#be123c', border: '1.5px solid #9f1239', color: '#ffffff' },
  { backgroundColor: '#0369a1', border: '1.5px solid #075985', color: '#ffffff' },
]

function ConnectedComponentsPage() {
  return (
    <ConnectedComponentsWorkspace />
  )
}

function ConnectedComponentsWorkspace() {
  const { graph } = useGraphStore()

  const result = useMemo(() => runConnectedComponents(graph), [graph])
  const largestCommunity = result.components.reduce(
    (largest, component) => Math.max(largest, component.length),
    0,
  )
  const smallestCommunity = result.components.reduce(
    (smallest, component) => Math.min(smallest, component.length),
    result.components.length > 0 ? Number.POSITIVE_INFINITY : 0,
  )
  const isolatedStudents = result.components.filter((component) => component.length === 1).length

  const nodeStyles = useMemo<Record<string, CSSProperties>>(() => {
    const styles: Record<string, CSSProperties> = {}

    result.components.forEach((component, componentIndex) => {
      const palette = COMPONENT_PALETTE[componentIndex % COMPONENT_PALETTE.length]

      for (const nodeId of component) {
        styles[nodeId] = {
          ...palette,
          boxShadow: '0 12px 24px rgba(2, 6, 23, 0.35)',
          fontWeight: 700,
        }
      }
    })

    return styles
  }, [result.components])

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/50 to-emerald-400/10 p-6 shadow-2xl shadow-slate-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          COMMUNITY ANALYTICS
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Identify placement communities with weak alumni or recruiter connectivity.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
          Each community receives its own color so placement administrators can spot isolated groups
          at a glance.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Community Summary</h2>
              <p className="text-sm text-slate-300">Current placement communities in the graph.</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Number of Communities"
                value={result.componentCount}
                helperText="Total disconnected placement clusters."
              />
              <MetricCard
                label="Largest Community"
                value={largestCommunity}
                helperText="Size of the largest connected placement cluster."
              />
              <MetricCard
                label="Smallest Community"
                value={smallestCommunity === Number.POSITIVE_INFINITY ? 0 : smallestCommunity}
                helperText="Size of the smallest community in the network."
              />
              <MetricCard
                label="Isolated Students"
                value={isolatedStudents}
                helperText="Clusters that contain only one profile."
              />
            </div>
          </section>
        </div>

        <GraphViewer nodeStyles={nodeStyles} />
      </section>
    </div>
  )
}

export default ConnectedComponentsPage