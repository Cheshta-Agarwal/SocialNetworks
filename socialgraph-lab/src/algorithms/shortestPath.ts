import type { ShortestPathResult } from '../types/algorithm'
import type { Graph } from '../types/graph'
import { buildAdjacencyList } from '../utils/adjacency'
import { pathToTraversalEdges, reconstructPath } from './pathUtils'

const emptyShortestPathResult: ShortestPathResult = {
  path: [],
  visitedNodes: [],
  visitedEdges: [],
  distance: -1,
}

export function runShortestPath(graph: Graph, startNodeId: string, endNodeId: string): ShortestPathResult {
  const adjacency = buildAdjacencyList(graph)

  if (!adjacency.has(startNodeId) || !adjacency.has(endNodeId)) {
    return emptyShortestPathResult
  }

  if (startNodeId === endNodeId) {
    return {
      path: [startNodeId],
      visitedNodes: [startNodeId],
      visitedEdges: [],
      distance: 0,
    }
  }

  const visited = new Set<string>([startNodeId])
  const previousNodes = new Map<string, string | null>([[startNodeId, null]])
  const visitedNodes: string[] = []
  const visitedEdges: ShortestPathResult['visitedEdges'] = []
  const queue: string[] = [startNodeId]

  for (let queueIndex = 0; queueIndex < queue.length; queueIndex += 1) {
    const currentNodeId = queue[queueIndex]
    visitedNodes.push(currentNodeId)

    if (currentNodeId === endNodeId) {
      const path = reconstructPath(previousNodes, startNodeId, endNodeId)

      return {
        path,
        visitedNodes,
        visitedEdges,
        distance: path.length > 0 ? path.length - 1 : -1,
      }
    }

    const neighbors = adjacency.get(currentNodeId) ?? []

    for (const neighborId of neighbors) {
      if (visited.has(neighborId)) {
        continue
      }

      visited.add(neighborId)
      previousNodes.set(neighborId, currentNodeId)
      queue.push(neighborId)
      visitedEdges.push({
        sourceId: currentNodeId,
        targetId: neighborId,
      })
    }
  }

    return {
      path: [],
      visitedNodes,
      visitedEdges,
      distance: -1,
    }
}

export function buildShortestPathEdges(path: string[]) {
  return pathToTraversalEdges(path)
}