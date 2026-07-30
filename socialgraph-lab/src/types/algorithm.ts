import type { Graph } from './graph'

export interface TraversalEdge {
  sourceId: string
  targetId: string
}

export interface TraversalResult {
  visitedNodes: string[]
  visitedEdges: TraversalEdge[]
}

export type TraversalAlgorithm = (graph: Graph, startNodeId: string) => TraversalResult