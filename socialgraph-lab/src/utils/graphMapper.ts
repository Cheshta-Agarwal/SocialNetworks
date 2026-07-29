import { MarkerType, type Edge, type Node } from '@xyflow/react'
import type { Graph } from '../types/graph'

const NODE_WIDTH = 180
const NODE_HEIGHT = 64
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
        label: person.displayName,
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