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

    if (level !== 2) continue

    friendsOfFriends++

    const person = graph.nodes.find(node => node.id === nodeId)

    if (!person) continue

    // Recommend only professionals
    if (
      person.role !== 'Alumni' &&
      person.role !== 'Recruiter' &&
      person.role !== 'Faculty'
    ) {
      continue
    }

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

  suggestions.sort((a, b) => {
    if (b.mutualFriends !== a.mutualFriends) {
      return b.mutualFriends - a.mutualFriends
    }

    const rolePriority = {
      Recruiter: 3,
      Alumni: 2,
      Faculty: 1,
      Student: 0,
    }

    const personA = graph.nodes.find(node => node.id === a.id)
    const personB = graph.nodes.find(node => node.id === b.id)

    return (
      (rolePriority[personB?.role ?? 'Student']) -
      (rolePriority[personA?.role ?? 'Student'])
    )
  })

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