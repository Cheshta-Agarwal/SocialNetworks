import { useEffect, useMemo, useRef } from 'react'
import { Background, Controls, MiniMap, ReactFlow, type ReactFlowInstance } from '@xyflow/react'
import { useGraphStore } from '../../store/graphStore'
import { graphMapper } from '../../utils/graphMapper'

function GraphViewer() {
  const { graph } = useGraphStore()
  const flowInstanceRef = useRef<ReactFlowInstance | null>(null)

  const { nodes, edges } = useMemo(() => graphMapper(graph), [graph])

  useEffect(() => {
    if (!flowInstanceRef.current || nodes.length === 0) {
      return
    }

    flowInstanceRef.current.fitView({ padding: 0.2, duration: 300 })
  }, [nodes, edges])

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 shadow-lg shadow-slate-950/20">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Graph Viewer</h2>
        <p className="text-sm text-slate-200">Read-only React Flow preview of the current graph.</p>
      </div>

      <div className="mt-5 h-[520px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/85">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onInit={(instance) => {
            flowInstanceRef.current = instance
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          panOnDrag
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick={false}
          deleteKeyCode={null}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={18} size={1} color="rgba(148, 163, 184, 0.10)" />
          <Controls showInteractive={false} className="!bg-slate-900/90 !border-slate-700 !text-slate-100" />
          <MiniMap zoomable pannable className="!bg-slate-900/95 !border-slate-700" />
        </ReactFlow>
      </div>
    </section>
  )
}

export default GraphViewer