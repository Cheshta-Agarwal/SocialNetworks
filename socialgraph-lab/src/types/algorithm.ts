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

export interface ConnectedComponentsResult {
  components: string[][]
  componentCount: number
}

export interface CycleDetectionResult {
  hasCycle: boolean
}

export interface BipartitePartitions {
  left: string[]
  right: string[]
}

export interface BipartiteResult {
  isBipartite: boolean
  partitions?: BipartitePartitions
}

export interface ShortestPathResult {
  path: string[]
  visitedNodes: string[]
  visitedEdges: TraversalEdge[]
  distance: number
}

export interface DijkstraResult {
  shortestPath: string[]
  totalDistance: number
  visitedNodes: string[]
  visitedEdges: TraversalEdge[]
}