import type { TraversalAlgorithm, TraversalResult } from '../types/algorithm'

const emptyTraversalResult: TraversalResult = {
  visitedNodes: [],
  visitedEdges: [],
}

export const runBFS: TraversalAlgorithm = (_graph, _startNodeId) => {
  return emptyTraversalResult
}