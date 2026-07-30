import type { ConnectedComponentsResult } from '../types/algorithm'
import type { Graph } from '../types/graph'
import { buildAdjacencyList } from '../utils/adjacency'

export function runConnectedComponents(graph: Graph): ConnectedComponentsResult {
  const adjacency = buildAdjacencyList(graph)
  const visited = new Set<string>()
  const components: string[][] = []

  for (const node of graph.nodes) {
    if (visited.has(node.id)) {
      continue
    }

    const component: string[] = []
    const stack: string[] = [node.id]
    visited.add(node.id)

    while (stack.length > 0) {
      const currentNodeId = stack.pop()

      if (currentNodeId === undefined) {
        continue
      }

      component.push(currentNodeId)

      const neighbors = adjacency.get(currentNodeId) ?? []

      for (let index = neighbors.length - 1; index >= 0; index -= 1) {
        const neighborId = neighbors[index]

        if (visited.has(neighborId)) {
          continue
        }

        visited.add(neighborId)
        stack.push(neighborId)
      }
    }

    components.push(component)
  }

  return {
    components,
    componentCount: components.length,
  }
}