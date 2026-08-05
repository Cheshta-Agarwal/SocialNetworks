/**
 * Represents a member in the campus placement network.
 */

export interface Person {
  id: string

  displayName: string

  role: 'Student' | 'Alumni' | 'Recruiter' | 'Faculty'

  department: string

  batch: string

  company?: string
}

/**
 * Professional relationship between two members.
 */

export interface Friendship {
  sourceId: string
  targetId: string
}

export interface Graph {
  nodes: Person[]
  edges: Friendship[]
}