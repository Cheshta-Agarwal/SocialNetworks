import type { CycleDetectionResult } from '../types/algorithm'
import type { Graph } from '../types/graph'
import { buildAdjacencyList } from '../utils/adjacency'

function hasCycleFromNode(
  nodeId: string,
  parentId: string | null,
  adjacency: Map<string, string[]>,
  visited: Set<string>,
): boolean {
  visited.add(nodeId)

  const neighbors = adjacency.get(nodeId) ?? []

  for (const neighborId of neighbors) {
    if (!visited.has(neighborId)) {
      if (hasCycleFromNode(neighborId, nodeId, adjacency, visited)) {
        return true
      }

      continue
    }

    if (neighborId !== parentId) {
      return true
    }
  }

  return false
}

export function runCycleDetection(graph: Graph): CycleDetectionResult {
  const adjacency = buildAdjacencyList(graph)
  const visited = new Set<string>()

  for (const node of graph.nodes) {
    if (visited.has(node.id)) {
      continue
    }

    if (hasCycleFromNode(node.id, null, adjacency, visited)) {
      return { hasCycle: true }
    }
  }

  return { hasCycle: false }
}