import type { BipartiteResult } from '../types/algorithm'
import type { Graph } from '../types/graph'
import { buildAdjacencyList } from '../utils/adjacency'

type PartitionColor = 0 | 1

export function runBipartiteCheck(graph: Graph): BipartiteResult {
  const adjacency = buildAdjacencyList(graph)
  const colors = new Map<string, PartitionColor>()
  const queue: string[] = []

  for (const node of graph.nodes) {
    if (colors.has(node.id)) {
      continue
    }

    colors.set(node.id, 0)
    queue.push(node.id)

    for (let queueIndex = 0; queueIndex < queue.length; queueIndex += 1) {
      const currentNodeId = queue[queueIndex]
      const currentColor = colors.get(currentNodeId)

      if (currentColor === undefined) {
        continue
      }

      const neighbors = adjacency.get(currentNodeId) ?? []

      for (const neighborId of neighbors) {
        const neighborColor = colors.get(neighborId)

        if (neighborColor === undefined) {
          colors.set(neighborId, currentColor === 0 ? 1 : 0)
          queue.push(neighborId)
          continue
        }

        if (neighborColor === currentColor) {
          return { isBipartite: false }
        }
      }
    }

    queue.length = 0
  }

  const partitions = {
    left: [] as string[],
    right: [] as string[],
  }

  for (const [nodeId, color] of colors) {
    if (color === 0) {
      partitions.left.push(nodeId)
      continue
    }

    partitions.right.push(nodeId)
  }

  return {
    isBipartite: true,
    partitions,
  }
}