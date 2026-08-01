import type { CycleDetectionResult } from '../types/algorithm'
import type { Graph } from '../types/graph'
import { buildAdjacencyList } from '../utils/adjacency'

function hasCycleFromNode(
  nodeId: string,
  parentId: string | null,
  adjacency: Map<string, string[]>,
  visited: Set<string>,
  parentMap: Map<string, string | null>,
): string[] | null {
  visited.add(nodeId)
  parentMap.set(nodeId, parentId)

  const neighbors = adjacency.get(nodeId) ?? []

  for (const neighborId of neighbors) {
    if (!visited.has(neighborId)) {
      const cycleNodes = hasCycleFromNode(neighborId, nodeId, adjacency, visited, parentMap)

      if (cycleNodes !== null) {
        return cycleNodes
      }

      continue
    }

    if (neighborId !== parentId) {
      const cycleNodes = [neighborId]
      let cursor: string | null = nodeId

      while (cursor !== null && cursor !== neighborId) {
        cycleNodes.push(cursor)
        cursor = parentMap.get(cursor) ?? null
      }

      if (cursor === neighborId) {
        cycleNodes.push(neighborId)
        return cycleNodes.reverse()
      }
    }
  }

  return null
}

export function runCycleDetection(graph: Graph): CycleDetectionResult {
  const adjacency = buildAdjacencyList(graph)
  const visited = new Set<string>()
  const parentMap = new Map<string, string | null>()

  for (const node of graph.nodes) {
    if (visited.has(node.id)) {
      continue
    }

    const cycleNodes = hasCycleFromNode(node.id, null, adjacency, visited, parentMap)

    if (cycleNodes !== null) {
      return {
        hasCycle: true,
        cycleEdges: cycleNodes.slice(0, -1).map((sourceId, index) => ({
          sourceId,
          targetId: cycleNodes[index + 1],
        })),
      }
    }
  }

  return { hasCycle: false, cycleEdges: [] }
}