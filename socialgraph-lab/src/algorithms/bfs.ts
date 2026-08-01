import { buildAdjacencyList } from '../utils/adjacency'
import type { TraversalAlgorithm, TraversalResult } from '../types/algorithm'

const emptyTraversalResult: TraversalResult = {
  visitedNodes: [],
  visitedEdges: [],
}

export const runBFS: TraversalAlgorithm = (graph, startNodeId) => {
  const adjacency = buildAdjacencyList(graph)

  if (!adjacency.has(startNodeId)) {
    return emptyTraversalResult
  }

  const visited = new Set<string>()
  const visitedEdges: TraversalResult['visitedEdges'] = []
  const visitOrder: string[] = []

  const distance = new Map<string, number>()

  const queue: string[] = [startNodeId]

  visited.add(startNodeId)
  distance.set(startNodeId, 0)

  while (queue.length > 0) {
    const current = queue.shift()!

    visitOrder.push(current)

    const neighbors = adjacency.get(current) ?? []

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        continue
      }

      visited.add(neighbor)

      distance.set(
        neighbor,
        (distance.get(current) ?? 0) + 1,
      )

      queue.push(neighbor)

      visitedEdges.push({
        sourceId: current,
        targetId: neighbor,
      })
    }
  }

  const directFriends =
    adjacency.get(startNodeId)?.length ?? 0

  const reachableUsers = visitOrder.length

  let friendsOfFriends = 0

  const suggestions: {
    id: string
    mutualFriends: number
  }[] = []

  const startFriends = new Set(adjacency.get(startNodeId) ?? [])

  for (const [nodeId, level] of distance.entries()) {

    if (level !== 2) {
      continue
    }

    friendsOfFriends++

    const neighbors = adjacency.get(nodeId) ?? []

    let mutualFriends = 0

    for (const neighbor of neighbors) {
      if (startFriends.has(neighbor)) {
        mutualFriends++
      }
    }

    suggestions.push({
      id: nodeId,
      mutualFriends,
    })
  }

  suggestions.sort(
    (a, b) => b.mutualFriends - a.mutualFriends,
  )

  const maxDistance =
    Math.max(...distance.values())

  return {
    visitedNodes: visitOrder,

    visitedEdges,

    stats: {
      directFriends,
      reachableUsers,
      friendsOfFriends,
      maxDistance,
    },

    suggestions,
  }
}