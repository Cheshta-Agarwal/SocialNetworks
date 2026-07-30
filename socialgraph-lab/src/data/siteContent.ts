import {
  BookOpen,
  GitBranch,
  Home,
  Layers3,
  Network,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  Users,
  Waypoints,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const routePaths = {
  home: '/',
  vision: '/vision',
  architecture: '/architecture',
  requirements: '/requirements',
  roadmap: '/roadmap',
  graphBuilder: '/graph-builder',
  bfs: '/bfs',
  dfs: '/dfs',
  connectedComponents: '/connected-components',
  cycleDetection: '/cycle-detection',
  bipartite: '/bipartite',
  shortestPath: '/shortest-path',
  dijkstra: '/dijkstra',
} as const

export type NavigationItem = {
  label: string
  to: string
  icon: LucideIcon
}

export type NavigationSection = {
  heading: string
  items: NavigationItem[]
}

export type AlgorithmCard = {
  title: string
  summary: string
  useCase: string
  to: string
  icon: LucideIcon
}

export type DocSection = {
  heading: string
  body: string
}

export type PageDefinition = {
  title: string
  eyebrow: string
  summary: string
  sections: DocSection[]
}

export const navigationSections: NavigationSection[] = [
  {
    heading: 'Documentation',
    items: [
      { label: 'Vision', to: routePaths.vision, icon: BookOpen },
      { label: 'Architecture', to: routePaths.architecture, icon: GitBranch },
      { label: 'Requirements', to: routePaths.requirements, icon: ShieldCheck },
      { label: 'Roadmap', to: routePaths.roadmap, icon: RouteIcon },
    ],
  },
  {
    heading: 'Graph',
    items: [{ label: 'Graph Builder', to: routePaths.graphBuilder, icon: Network }],
  },
  {
    heading: 'Traversal Algorithms',
    items: [
      { label: 'BFS', to: routePaths.bfs, icon: Layers3 },
      { label: 'DFS', to: routePaths.dfs, icon: GitBranch },
    ],
  },
  {
    heading: 'Connectivity',
    items: [
      { label: 'Connected Components', to: routePaths.connectedComponents, icon: Users },
      { label: 'Cycle Detection', to: routePaths.cycleDetection, icon: RouteIcon },
      { label: 'Bipartite Check', to: routePaths.bipartite, icon: ShieldCheck },
    ],
  },
  {
    heading: 'Shortest Paths',
    items: [
      { label: 'Shortest Path', to: routePaths.shortestPath, icon: Waypoints },
      { label: 'Dijkstra', to: routePaths.dijkstra, icon: Sparkles },
    ],
  },
]

export const navigationItems: NavigationItem[] = [
  { label: 'Home', to: routePaths.home, icon: Home },
  ...navigationSections.flatMap((section) => section.items),
]

export const algorithmCards: AlgorithmCard[] = [
  {
    title: 'Graph Builder',
    summary: 'Create the social network by adding people and friendships.',
    useCase: 'Build a class, club, or friend graph before running analysis.',
    to: routePaths.graphBuilder,
    icon: Network,
  },
  {
    title: 'BFS',
    summary: 'Find friends level by level from any starting person.',
    useCase: 'Model friend discovery and shortest hop distance in an unweighted network.',
    to: routePaths.bfs,
    icon: Layers3,
  },
  {
    title: 'DFS',
    summary: 'Explore the network deeply before backtracking.',
    useCase: 'Reveal communities, nested relationships, and traversal order.',
    to: routePaths.dfs,
    icon: GitBranch,
  },
  {
    title: 'Connected Components',
    summary: 'Detect isolated friend groups in the graph.',
    useCase: 'Spot separate communities, classes, or disconnected social circles.',
    to: routePaths.connectedComponents,
    icon: Users,
  },
  {
    title: 'Cycle Detection',
    summary: 'Detect circular friendship chains.',
    useCase: 'Check whether a social network has closed loops or redundant links.',
    to: routePaths.cycleDetection,
    icon: RouteIcon,
  },
  {
    title: 'Bipartite Check',
    summary: 'Verify whether the network can be split into two groups.',
    useCase: 'Model two-team assignments or relationship constraints.',
    to: routePaths.bipartite,
    icon: ShieldCheck,
  },
  {
    title: 'Shortest Path',
    summary: 'Find the minimum-hop route between two people.',
    useCase: 'Explain six degrees of separation in a social graph.',
    to: routePaths.shortestPath,
    icon: Waypoints,
  },
  {
    title: 'Dijkstra',
    summary: 'Find the weighted shortest route through the network.',
    useCase: 'Extend the same graph model toward weighted social or influence paths.',
    to: routePaths.dijkstra,
    icon: Sparkles,
  },
]

export const docPages: Record<'vision' | 'architecture' | 'requirements' | 'roadmap', PageDefinition> = {
  vision: {
    title: 'Project Vision',
    eyebrow: 'Source of truth',
    summary:
      'SocialGraph Lab turns classical graph algorithms into social-network stories so learners understand both the mechanics and the motivation behind each technique.',
    sections: [
      {
        heading: 'What the project is',
        body:
          'An educational web application for building, exploring, and analyzing social graphs with algorithm-backed scenarios such as friend discovery, community detection, and viral spread.',
      },
      {
        heading: 'Who it serves',
        body:
          'The initial audience is undergraduate CS students, faculty, interview candidates, and independent learners who want a practical graph-theory reference.',
      },
      {
        heading: 'How the UI should behave',
        body:
          'Every screen should connect a real social-network problem to the algorithm that solves it instead of presenting the algorithm in isolation.',
      },
    ],
  },
  architecture: {
    title: 'System Architecture',
    eyebrow: 'Version 1 design',
    summary:
      'The first version is frontend-only. UI, algorithm modules, and visualization concerns stay separated so the pure TypeScript algorithms remain reusable.',
    sections: [
      {
        heading: 'Responsibility split',
        body:
          'Components render UI, pages define screens, algorithms stay in pure modules, and visualizations animate algorithm results without containing business rules.',
      },
      {
        heading: 'Why this matters',
        body:
          'This structure keeps the project maintainable while making it easy to add BFS, DFS, shortest path, and influence analysis without rewriting the interface layer.',
      },
      {
        heading: 'Future dependency',
        body:
          'Later algorithm pages and graph visualizations will consume the same graph model and shared types exposed from this foundation.',
      },
    ],
  },
  requirements: {
    title: 'Functional Requirements',
    eyebrow: 'Version 1 scope',
    summary:
      'The must-have release includes graph creation, graph visualization, BFS, DFS, friend suggestions, connected components, and a learning panel for every algorithm page.',
    sections: [
      {
        heading: 'Core product needs',
        body:
          'Users must be able to add and remove people and friendships, inspect the graph interactively, and understand traversal order, complexity, and real-world application.',
      },
      {
        heading: 'Educational requirement',
        body:
          'Each algorithm page needs a description, time and space complexity, real-world use, and pseudocode so the lesson stays attached to the implementation.',
      },
      {
        heading: 'Non-functional guardrails',
        body:
          'The app should stay beginner-friendly, quick on educational datasets, and maintainable through strict separation of concerns.',
      },
    ],
  },
  roadmap: {
    title: 'Development Roadmap',
    eyebrow: 'Implementation order',
    summary:
      'Milestone 1 establishes the shell. Later milestones add the graph builder, visualization, BFS, DFS, friend suggestions, community detection, shortest path, influencer analysis, learning panels, polish, and tests.',
    sections: [
      {
        heading: 'Build order',
        body:
          'The roadmap intentionally starts with the project scaffold, then adds the graph model, then algorithm-backed experiences so every step remains runnable.',
      },
      {
        heading: 'Current dependency',
        body:
          'This routed shell is the base that later modules will plug into.',
      },
      {
        heading: 'What comes next',
        body:
          'After the shell, the next concrete dependency is a reusable graph model and the first algorithm modules.',
      },
    ],
  },
}