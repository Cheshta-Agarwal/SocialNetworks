import { createContext, createElement, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Friendship, Graph, Person } from '../types/graph'

type GraphStoreValue = {
  graph: Graph
  addNode: (node: Person) => void
  removeNode: (nodeId: Person['id']) => void
  addEdge: (edge: Friendship) => void
  removeEdge: (edge: Friendship) => void
}

type GraphStoreProviderProps = {
  children: ReactNode
  initialGraph?: Graph
}

const emptyGraph: Graph = {
  nodes: [],
  edges: [],
}

const GraphStoreContext = createContext<GraphStoreValue | undefined>(undefined)

function areSameEdge(left: Friendship, right: Friendship) {
  return (
    (left.sourceId === right.sourceId && left.targetId === right.targetId) ||
    (left.sourceId === right.targetId && left.targetId === right.sourceId)
  )
}

export function GraphStoreProvider({ children, initialGraph = emptyGraph }: GraphStoreProviderProps) {
  const [graph, setGraph] = useState<Graph>(initialGraph)

  const value = useMemo<GraphStoreValue>(
    () => ({
      graph,
      addNode: (node) => {
        setGraph((currentGraph) => {
          if (currentGraph.nodes.some((existingNode) => existingNode.id === node.id)) {
            return currentGraph
          }

          return {
            ...currentGraph,
            nodes: [...currentGraph.nodes, node],
          }
        })
      },
      removeNode: (nodeId) => {
        setGraph((currentGraph) => {
          const nextNodes = currentGraph.nodes.filter((node) => node.id !== nodeId)
          const nextEdges = currentGraph.edges.filter(
            (edge) => edge.sourceId !== nodeId && edge.targetId !== nodeId,
          )

          if (nextNodes.length === currentGraph.nodes.length && nextEdges.length === currentGraph.edges.length) {
            return currentGraph
          }

          return {
            nodes: nextNodes,
            edges: nextEdges,
          }
        })
      },
      addEdge: (edge) => {
        if (edge.sourceId === edge.targetId) {
          return
        }

        setGraph((currentGraph) => {
          const sourceExists = currentGraph.nodes.some((node) => node.id === edge.sourceId)
          const targetExists = currentGraph.nodes.some((node) => node.id === edge.targetId)

          if (!sourceExists || !targetExists) {
            return currentGraph
          }

          const edgeAlreadyExists = currentGraph.edges.some((existingEdge) => areSameEdge(existingEdge, edge))

          if (edgeAlreadyExists) {
            return currentGraph
          }

          return {
            ...currentGraph,
            edges: [...currentGraph.edges, edge],
          }
        })
      },
      removeEdge: (edge) => {
        setGraph((currentGraph) => {
          const nextEdges = currentGraph.edges.filter((existingEdge) => !areSameEdge(existingEdge, edge))

          if (nextEdges.length === currentGraph.edges.length) {
            return currentGraph
          }

          return {
            ...currentGraph,
            edges: nextEdges,
          }
        })
      },
    }),
    [graph],
  )

  return createElement(GraphStoreContext.Provider, { value }, children)
}

export function useGraphStore() {
  const context = useContext(GraphStoreContext)

  if (context === undefined) {
    throw new Error('useGraphStore must be used within a GraphStoreProvider.')
  }

  return context
}