import type { Graph } from './graph'

export interface TraversalEdge {
  sourceId: string
  targetId: string
}

export interface TraversalStats {
  // BFS
  directFriends?: number
  reachableUsers?: number
  friendsOfFriends?: number
  maxDistance?: number
  // DFS
  communitySize?: number
  explorationDepth?: number
  exploredUsers?: number
}

export interface TraversalResult {
  visitedNodes: string[]
  visitedEdges: TraversalEdge[]

  stats?: TraversalStats

  suggestions?: {
    id: string
    mutualFriends: number
  }[]
}

export type TraversalAlgorithm = (graph: Graph, startNodeId: string) => TraversalResult

export interface ConnectedComponentsResult {
  components: string[][]
  componentCount: number
}

export interface CycleDetectionResult {
  hasCycle: boolean
  cycleNodes: string[]
  cycleEdges?: TraversalEdge[]
}