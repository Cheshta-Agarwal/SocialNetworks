import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import { runConnectedComponents } from '../algorithms'
import { GraphStoreProvider, useGraphStore } from '../store/graphStore'

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
    <GraphStoreProvider>
      <ConnectedComponentsWorkspace />
    </GraphStoreProvider>
  )
}

function ConnectedComponentsWorkspace() {
  const { graph } = useGraphStore()

  const result = useMemo(() => runConnectedComponents(graph), [graph])

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
          Connected Components
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Group the social network into disconnected communities.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
          Each connected component is rendered with its own color so the community structure is easy
          to read.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Component Summary</h2>
              <p className="text-sm text-slate-300">Current connected components in the graph.</p>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-slate-400">Component Count</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result.componentCount}</p>
              </div>

              {result.components.map((component, index) => (
                <div
                  key={`${index}-${component.join('-')}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/45 p-4"
                >
                  <p className="text-sm text-slate-400">Component {index + 1}</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {component.length > 0 ? component.join(' → ') : 'Empty component'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <GraphViewer nodeStyles={nodeStyles} />
      </section>
    </div>
  )
}

export default ConnectedComponentsPage