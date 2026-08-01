import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import GraphViewer from '../components/graph/GraphViewer'
import { runBipartiteCheck } from '../algorithms'
import { useGraphStore } from '../store/graphStore'

const LEFT_PARTITION_STYLE: CSSProperties = {
  backgroundColor: '#1d4ed8',
  border: '1.5px solid #1e3a8a',
  color: '#ffffff',
  boxShadow: '0 12px 24px rgba(29, 78, 216, 0.35)',
}

const RIGHT_PARTITION_STYLE: CSSProperties = {
  backgroundColor: '#15803d',
  border: '1.5px solid #166534',
  color: '#ffffff',
  boxShadow: '0 12px 24px rgba(21, 128, 61, 0.35)',
}

function BipartitePage() {
  return (
    <BipartiteWorkspace />
  )
}

function BipartiteWorkspace() {
  const { graph } = useGraphStore()

  const result = useMemo(() => runBipartiteCheck(graph), [graph])

  const nodeStyles = useMemo<Record<string, CSSProperties> | undefined>(() => {
    if (!result.isBipartite || result.partitions === undefined) {
      return undefined
    }

    const styles: Record<string, CSSProperties> = {}

    for (const nodeId of result.partitions.left) {
      styles[nodeId] = LEFT_PARTITION_STYLE
    }

    for (const nodeId of result.partitions.right) {
      styles[nodeId] = RIGHT_PARTITION_STYLE
    }

    return styles
  }, [result])

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/50 to-emerald-400/10 p-6 shadow-2xl shadow-slate-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          Bipartite Graph Check
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Verify whether the social graph can be split into two partitions.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
          Left partition nodes are shown in blue and right partition nodes are shown in green when
          the graph is bipartite.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">Algorithm Output</h2>
              <p className="text-sm text-slate-300">Bipartite check result for the current graph.</p>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-sm text-slate-400">Is Bipartite</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {result.isBipartite ? 'Yes' : 'No'}
              </p>
            </div>

            {result.isBipartite && result.partitions !== undefined ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-sm text-slate-400">Left Partition</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {result.partitions.left.length > 0 ? result.partitions.left.join(' → ') : 'Empty'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-sm text-slate-400">Right Partition</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {result.partitions.right.length > 0 ? result.partitions.right.join(' → ') : 'Empty'}
                  </p>
                </div>
              </div>
            ) : null}
          </section>
        </div>

        <GraphViewer nodeStyles={nodeStyles} />
      </section>
    </div>
  )
}

export default BipartitePage