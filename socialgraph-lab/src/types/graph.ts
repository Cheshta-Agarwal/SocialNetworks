/**
 * Represents a person in the social graph.
 * This is the minimal node shape used by the algorithm layer.
 */
export interface Person {
  id: string
  displayName: string
}

/**
 * Represents a relationship between two people in the social graph.
 * The edge is stored by node identifiers to keep the model UI-independent.
 */
export interface Friendship {
  sourceId: string
  targetId: string
}

/**
 * Represents the full social network graph.
 * Algorithms consume this shape as the single source of truth.
 */
export interface Graph {
  nodes: Person[]
  edges: Friendship[]
}