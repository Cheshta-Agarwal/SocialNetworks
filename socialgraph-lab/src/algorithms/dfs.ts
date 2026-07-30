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
  const stack: string[] = [startNodeId]

  while (stack.length > 0) {
    const currentNodeId = stack.pop()

    if (currentNodeId === undefined || visitedNodes.has(currentNodeId)) {
      continue
    }

    visitedNodes.add(currentNodeId)
    visitOrder.push(currentNodeId)

    const neighbors = adjacency.get(currentNodeId) ?? []

    for (let index = neighbors.length - 1; index >= 0; index -= 1) {
      const neighborId = neighbors[index]

      if (visitedNodes.has(neighborId)) {
        continue
      }

      stack.push(neighborId)
      visitedEdges.push({
        sourceId: currentNodeId,
        targetId: neighborId,
      })
    }
  }

  return {
    visitedNodes: visitOrder,
    visitedEdges,
  }
}