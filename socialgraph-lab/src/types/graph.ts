/**
 * Represents a student or professional profile in the placement network.
 */
export interface Person {
  id: string
  displayName: string
  role?: string
}

/**
 * Represents a professional connection between two profiles in the network.
 */
export interface Friendship {
  sourceId: string
  targetId: string
}

/**
 * Represents the full placement network graph.
 */
export interface Graph {
  nodes: Person[]
  edges: Friendship[]
}