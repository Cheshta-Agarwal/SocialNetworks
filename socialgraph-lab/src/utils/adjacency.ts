import type { Graph } from '../types/graph'

/**
 * Builds an undirected adjacency list for the provided graph without mutating it.
 */
export function buildAdjacencyList(graph: Graph): Map<string, string[]> {
  const adjacencyList = new Map<string, string[]>()

  for (const node of graph.nodes) {
    adjacencyList.set(node.id, [])
  }

  for (const edge of graph.edges) {
    const sourceNeighbors = adjacencyList.get(edge.sourceId)
    const targetNeighbors = adjacencyList.get(edge.targetId)

    if (sourceNeighbors) {
      sourceNeighbors.push(edge.targetId)
    }

    if (targetNeighbors) {
      targetNeighbors.push(edge.sourceId)
    }
  }

  return adjacencyList
}