import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { Background, Controls, MarkerType, MiniMap, ReactFlow, type ReactFlowInstance } from '@xyflow/react'
import { useGraphStore } from '../../store/graphStore'
import { graphMapper } from '../../utils/graphMapper'

type HighlightedEdge = {
  sourceId: string
  targetId: string
}

type GraphViewerProps = {
  highlightedNodes?: string[]
  highlightedEdges?: HighlightedEdge[]
  pathNodes?: string[]
  pathEdges?: HighlightedEdge[]
  nodeStyles?: Record<string, CSSProperties>
}

function getEdgeKey(sourceId: string, targetId: string) {
  return [sourceId, targetId].sort().join('__')
}

function GraphViewer({ highlightedNodes, highlightedEdges, pathNodes, pathEdges, nodeStyles }: GraphViewerProps) {
  const { graph } = useGraphStore()
  const flowInstanceRef = useRef<ReactFlowInstance | null>(null)

  const { nodes, edges } = useMemo(() => graphMapper(graph), [graph])

  const highlightedNodeSet = useMemo(
    () => new Set(highlightedNodes ?? []),
    [highlightedNodes],
  )

  const highlightedEdgeSet = useMemo(() => {
    const edgeKeys = new Set<string>()

    for (const edge of highlightedEdges ?? []) {
      edgeKeys.add(getEdgeKey(edge.sourceId, edge.targetId))
    }

    return edgeKeys
  }, [highlightedEdges])

  const pathNodeSet = useMemo(() => new Set(pathNodes ?? []), [pathNodes])

  const pathEdgeSet = useMemo(() => {
    const edgeKeys = new Set<string>()

    for (const edge of pathEdges ?? []) {
      edgeKeys.add(getEdgeKey(edge.sourceId, edge.targetId))
    }

    return edgeKeys
  }, [pathEdges])

  const renderedNodes = useMemo(() => {
    if (highlightedNodeSet.size === 0 && pathNodeSet.size === 0 && nodeStyles === undefined) {
      return nodes
    }

    return nodes.map((node) => {
      const isHighlighted = highlightedNodeSet.has(node.id)
      const isPathNode = pathNodeSet.has(node.id)
      const customStyle = nodeStyles?.[node.id]

      if (!isHighlighted && !isPathNode && customStyle === undefined) {
        return node
      }

      return {
        ...node,
        style: {
          ...node.style,
          ...(isHighlighted
            ? {
                backgroundColor: '#172554',
                border: '1.5px solid #38bdf8',
                color: '#ffffff',
                boxShadow: '0 0 0 1px rgba(56, 189, 248, 0.35), 0 14px 30px rgba(2, 6, 23, 0.5)',
              }
            : undefined),
          ...(isPathNode
            ? {
                backgroundColor: '#78350f',
                border: '2px solid #f59e0b',
                color: '#ffffff',
                boxShadow: '0 0 0 1px rgba(245, 158, 11, 0.35), 0 16px 32px rgba(69, 26, 3, 0.5)',
              }
            : undefined),
          ...customStyle,
        },
      }
    })
  }, [highlightedNodeSet, nodeStyles, nodes, pathNodeSet])

  const renderedEdges = useMemo(() => {
    if (highlightedEdgeSet.size === 0 && pathEdgeSet.size === 0) {
      return edges
    }

    return edges.map((edge) => {
      const edgeKey = getEdgeKey(edge.source, edge.target)
      const isHighlighted = highlightedEdgeSet.has(edgeKey)
      const isPathEdge = pathEdgeSet.has(edgeKey)

      if (!isHighlighted && !isPathEdge) {
        return edge
      }

      return {
        ...edge,
        style: {
          ...edge.style,
          ...(isHighlighted
            ? {
                stroke: '#f8fafc',
                strokeWidth: 4,
              }
            : undefined),
          ...(isPathEdge
            ? {
                stroke: '#f59e0b',
                strokeWidth: 5,
              }
            : undefined),
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isPathEdge ? '#f59e0b' : '#f8fafc',
        },
      }
    })
  }, [edges, highlightedEdgeSet, pathEdgeSet])

  useEffect(() => {
    if (!flowInstanceRef.current || renderedNodes.length === 0) {
      return
    }

    flowInstanceRef.current.fitView({ padding: 0.35, duration: 400 })
  }, [renderedNodes, renderedEdges])

  return (
    <section className="rounded-2xl bg-slate-950/40 p-4 shadow-lg shadow-slate-950/20">
      {/* <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Graph Viewer</h2>
        <p className="text-sm text-slate-200">Read-only React Flow preview of the current graph.</p>
      </div> */}

      <div className="mt-5 h-[620px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/85">
        <ReactFlow
          nodes={renderedNodes}
          edges={renderedEdges}
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
          <Background gap={24} size={1.2} color="rgba(148, 163, 184, 0.10)" />
          <Controls position="top-right" showInteractive={false} className="!bg-slate-900/90 !border-slate-700 !text-slate-100" />
          <MiniMap zoomable pannable position="bottom-right" nodeStrokeWidth={3} />
        </ReactFlow>
      </div>
    </section>
  )
}

export default GraphViewer