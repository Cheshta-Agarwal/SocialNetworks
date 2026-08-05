import { buildAdjacencyList } from '../utils/adjacency'
import type {
  TraversalAlgorithm,
  TraversalResult,
} from '../types/algorithm'

const emptyTraversalResult: TraversalResult = {
  visitedNodes: [],
  visitedEdges: [],
}

export const runBFS: TraversalAlgorithm = (
  graph,
  startNodeId,
) => {
  const adjacency = buildAdjacencyList(graph)

  if (!adjacency.has(startNodeId)) {
    return emptyTraversalResult
  }

  const visited = new Set<string>()
  const visitOrder: string[] = []
  const visitedEdges: TraversalResult['visitedEdges'] = []

  const distance = new Map<string, number>()

  const queue: string[] = [startNodeId]

  visited.add(startNodeId)
  distance.set(startNodeId, 0)

  while (queue.length > 0) {
    const current = queue.shift()!

    visitOrder.push(current)

    const neighbors = adjacency.get(current) ?? []

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) continue

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

  const startFriends = new Set(
    adjacency.get(startNodeId) ?? [],
  )

  for (const [nodeId, level] of distance.entries()) {
    if (level !== 2) continue

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

  const rolePriority: Record<string, number> = {
    Recruiter: 4,
    Alumni: 3,
    Faculty: 2,
    Student: 1,
  }

  suggestions.sort((a, b) => {
    if (b.mutualFriends !== a.mutualFriends) {
      return b.mutualFriends - a.mutualFriends
    }

    const personA = graph.nodes.find(
      (node) => node.id === a.id,
    )

    const personB = graph.nodes.find(
      (node) => node.id === b.id,
    )

    return (
      (rolePriority[personB?.role ?? 'Student'] ?? 1) -
      (rolePriority[personA?.role ?? 'Student'] ?? 1)
    )
  })

  const maxDistance =
    distance.size > 0
      ? Math.max(...distance.values())
      : 0

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