import type { TraversalAlgorithm, TraversalResult } from '../types/algorithm'
import { buildAdjacencyList } from '../utils/adjacency'

const emptyTraversalResult: TraversalResult = {
  visitedNodes: [],
  visitedEdges: [],
}

export const runDFS: TraversalAlgorithm = (graph, startNodeId) => {
  const adjacency = buildAdjacencyList(graph)
  if (!adjacency.has(startNodeId)) {
    return emptyTraversalResult
  }

  const visitedNodes = new Set<string>()
  const visitedEdges: TraversalResult['visitedEdges'] = []
  const visitOrder: string[] = []
  const stack: {
    nodeId: string
    depth: number
  }[] = [
    {
      nodeId: startNodeId,
      depth: 0,
    },
  ]
  let maxDepth = 0

  while (stack.length > 0) {
    const current = stack.pop()
    if (!current) continue
    const { nodeId, depth } = current
    if (visitedNodes.has(nodeId)) {
      continue
    }

    visitedNodes.add(nodeId)
    visitOrder.push(nodeId)
    maxDepth = Math.max(maxDepth, depth)
    const neighbors = adjacency.get(nodeId) ?? []

    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighborId = neighbors[i]
      if (visitedNodes.has(neighborId)) {
        continue
      }
      visitedEdges.push({
        sourceId: nodeId,
        targetId: neighborId,
      })
      stack.push({
        nodeId: neighborId,
        depth: depth + 1,
      })
    }
  }

  return {
    visitedNodes: visitOrder,
    visitedEdges,
    stats: {
      communitySize: visitOrder.length,
      exploredUsers: visitOrder.length,
      explorationDepth: maxDepth,
    },
  }
}