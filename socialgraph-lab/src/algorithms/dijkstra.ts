import type { DijkstraResult } from '../types/algorithm'
import type { Graph } from '../types/graph'
import { buildAdjacencyList } from '../utils/adjacency'
import { pathToTraversalEdges, reconstructPath } from './pathUtils'

const emptyDijkstraResult: DijkstraResult = {
  shortestPath: [],
  totalDistance: -1,
  visitedNodes: [],
  visitedEdges: [],
}

type DistanceEntry = {
  nodeId: string
  distance: number
}

function popClosestNode(queue: DistanceEntry[]): DistanceEntry | undefined {
  let closestIndex = 0

  for (let index = 1; index < queue.length; index += 1) {
    if (queue[index].distance < queue[closestIndex].distance) {
      closestIndex = index
    }
  }

  const [closestEntry] = queue.splice(closestIndex, 1)
  return closestEntry
}

export function runDijkstra(
  graph: Graph,
  startNodeId: string,
  endNodeId: string,
): DijkstraResult {
  const adjacency = buildAdjacencyList(graph)

  if (!adjacency.has(startNodeId) || !adjacency.has(endNodeId)) {
    return emptyDijkstraResult
  }

  if (startNodeId === endNodeId) {
    return {
      shortestPath: [startNodeId],
      totalDistance: 0,

      visitedNodes: [startNodeId],
      visitedEdges: [],

      stats: {
        connectionLength: 0,
        exploredUsers: 1,
        routeExists: true,
      },
    }
  }

  const distances = new Map<string, number>()
  const previousNodes = new Map<string, string | null>()
  const visited = new Set<string>()
  const visitedNodes: string[] = []
  const visitedEdges: DijkstraResult['visitedEdges'] = []
  const queue: DistanceEntry[] = [{ nodeId: startNodeId, distance: 0 }]

  distances.set(startNodeId, 0)
  previousNodes.set(startNodeId, null)

  while (queue.length > 0) {
    const currentEntry = popClosestNode(queue)

    if (currentEntry === undefined) {
      break
    }

    const { nodeId: currentNodeId, distance: currentDistance } = currentEntry

    if (visited.has(currentNodeId)) {
      continue
    }

    visited.add(currentNodeId)
    visitedNodes.push(currentNodeId)

    if (currentNodeId === endNodeId) {
      const shortestPath = reconstructPath(previousNodes, startNodeId, endNodeId)

      return {
        shortestPath,

        totalDistance: currentDistance,

        visitedNodes,

        visitedEdges,

        stats: {
          connectionLength: shortestPath.length - 1,
          exploredUsers: visitedNodes.length,
          routeExists: true,
        },
      }
    }

    const neighbors = adjacency.get(currentNodeId) ?? []

    for (const neighborId of neighbors) {
      const tentativeDistance = currentDistance + 1
      const knownDistance = distances.get(neighborId)

      if (knownDistance !== undefined && knownDistance <= tentativeDistance) {
        continue
      }

      distances.set(neighborId, tentativeDistance)
      previousNodes.set(neighborId, currentNodeId)
      queue.push({ nodeId: neighborId, distance: tentativeDistance })
      visitedEdges.push({
        sourceId: currentNodeId,
        targetId: neighborId,
      })
    }
  }

    return {
      shortestPath: [],
      totalDistance: -1,
      visitedNodes,
      visitedEdges,
      stats: {
        connectionLength: 0,
        exploredUsers: visitedNodes.length,
        routeExists: false,
      },
    }
}

export function buildDijkstraPathEdges(path: string[]) {
  return pathToTraversalEdges(path)
}