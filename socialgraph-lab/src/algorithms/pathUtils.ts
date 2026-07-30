import type { TraversalEdge } from '../types/algorithm'

export function reconstructPath(
  previousNodes: Map<string, string | null>,
  startNodeId: string,
  endNodeId: string,
): string[] {
  if (!previousNodes.has(endNodeId)) {
    return []
  }

  const path: string[] = []
  let currentNodeId: string | null | undefined = endNodeId

  while (currentNodeId !== null && currentNodeId !== undefined) {
    path.push(currentNodeId)

    if (currentNodeId === startNodeId) {
      break
    }

    currentNodeId = previousNodes.get(currentNodeId)
  }

  if (path[path.length - 1] !== startNodeId) {
    return []
  }

  return path.reverse()
}

export function pathToTraversalEdges(path: string[]): TraversalEdge[] {
  const edges: TraversalEdge[] = []

  for (let index = 0; index < path.length - 1; index += 1) {
    edges.push({
      sourceId: path[index],
      targetId: path[index + 1],
    })
  }

  return edges
}