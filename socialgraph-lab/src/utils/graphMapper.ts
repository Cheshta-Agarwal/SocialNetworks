import { createElement } from 'react'
import { MarkerType, type Edge, type Node } from '@xyflow/react'
import type { Graph } from '../types/graph'

const NODE_WIDTH = 220
const NODE_HEIGHT = 84
const GRID_COLUMNS = 3
const COLUMN_GAP = 48
const ROW_GAP = 36

/**
 * Converts the domain graph into React Flow nodes and edges without mutating the source model.
 */
export function graphMapper(graph: Graph): { nodes: Node[]; edges: Edge[] } {
  const nodes = graph.nodes.map((person, index) => {
    const column = index % GRID_COLUMNS
    const row = Math.floor(index / GRID_COLUMNS)
    const roleLabel = person.role ?? 'Student'

    return {
      id: person.id,
      type: 'default',
      style: {
        backgroundColor: '#0f172a',
        border: '1.5px solid #1f2937',
        borderRadius: '16px',
        color: '#f8fafc',
        fontSize: '14px',
        fontWeight: 600,
        padding: '10px 14px',
        boxShadow: '0 10px 24px rgba(2, 6, 23, 0.35)',
        width: NODE_WIDTH,
      },
      position: {
        x: column * (NODE_WIDTH + COLUMN_GAP),
        y: row * (NODE_HEIGHT + ROW_GAP),
      },
      data: {
        label: createElement(
          'div',
          {
            className: 'flex h-full flex-col items-start justify-center gap-1 text-left',
          },
          createElement(
            'span',
            { className: 'text-sm font-semibold text-slate-50' },
            person.displayName,
          ),
          createElement(
            'span',
            {
              className:
                'rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-100',
            },
            roleLabel,
          ),
        ),
      },
    }
  })

  const edges = graph.edges.map((friendship, index) => ({
    id: `${friendship.sourceId}-${friendship.targetId}-${index}`,
    source: friendship.sourceId,
    target: friendship.targetId,
    type: 'straight',
    selectable: false,
    deletable: false,
    animated: false,
    style: {
      stroke: '#93c5fd',
      strokeWidth: 2.5,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#93c5fd',
    },
  }))

  return { nodes, edges }
}