import {
  BookOpen,
  BriefcaseBusiness,
  Home,
  Layers3,
  ShieldAlert,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const routePaths = {
  home: '/',
  documentation: '/documentation',
  bfs: '/bfs',
  dfs: '/dfs',
  connectedComponents: '/connected-components',
  cycleDetection: '/cycle-detection',
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
    heading: 'Tools',
    items: [],
  },
  {
    heading: 'Algorithms',
    items: [
      {
        label: 'Discover Alumni',
        to: routePaths.bfs,
        icon: Layers3,
      },
      {
        label: 'Professional Community Explorer',
        to: routePaths.dfs,
        icon: BriefcaseBusiness,
      },
      {
        label: 'Community Analytics',
        to: routePaths.connectedComponents,
        icon: Users,
      },
      {
        label: 'Network Integrity Check',
        to: routePaths.cycleDetection,
        icon: ShieldAlert,
      },
    ],
  },
]

export const navigationItems: NavigationItem[] = [
  { label: 'Home', to: routePaths.home, icon: Home },
  { label: 'Documentation', to: routePaths.documentation, icon: BookOpen },
]

export const algorithmCards: AlgorithmCard[] = [
  {
    title: 'Discover Alumni',
    summary: 'Find alumni and professionals level by level from any student.',
    useCase: 'Model nearby alumni recommendations and professional reach.',
    to: routePaths.bfs,
    icon: Layers3,
  },
  {
    title: 'Professional Community Explorer',
    summary: 'Explore a connected professional community depth-first.',
    useCase: 'Reveal referral chains, community structure, and traversal order.',
    to: routePaths.dfs,
    icon: BriefcaseBusiness,
  },
  {
    title: 'Community Analytics',
    summary: 'Detect disconnected placement communities in the graph.',
    useCase: 'Spot isolated departments, clubs, and weakly connected student groups.',
    to: routePaths.connectedComponents,
    icon: Users,
  },
  {
    title: 'Network Integrity Check',
    summary: 'Detect suspicious referral loops and circular chains.',
    useCase: 'Check whether a placement network has closed loops or redundant referrals.',
    to: routePaths.cycleDetection,
    icon: ShieldAlert,
  },
]

export const docPages: Record<'vision' | 'architecture' | 'requirements' | 'roadmap', PageDefinition> = {
  vision: {
    title: 'Project Vision',
    eyebrow: 'Source of truth',
    summary:
      'PlacementConnect turns graph analytics into a campus placement and alumni networking platform so users can understand both the workflow and the value of each algorithm.',
    sections: [
      {
        heading: 'What the project is',
        body:
          'A professional networking interface for students, alumni, recruiters, placement cells, and faculty mentors, with graph-backed tools for discovery, community analysis, and integrity checks.',
      },
      {
        heading: 'Who it serves',
        body:
          'The primary users are students and alumni, with placement administrators and recruiters using the same network to understand reach, clusters, and referral health.',
      },
      {
        heading: 'How the UI should behave',
        body:
          'Every screen should read like a placement product first and only reveal the underlying graph algorithm through the interaction pattern and analytics.',
      },
    ],
  },
  architecture: {
    title: 'System Architecture',
    eyebrow: 'Version 1 design',
    summary:
      'PlacementConnect keeps a frontend-only architecture. UI, algorithm modules, and visualization concerns stay separated so the pure TypeScript algorithms remain reusable.',
    sections: [
      {
        heading: 'Responsibility split',
        body:
          'Components render the placement portal UI, pages define the user journeys, algorithms stay in pure modules, and visualizations animate graph results without containing business rules.',
      },
      {
        heading: 'Why this matters',
        body:
          'This structure keeps the project maintainable while making it easy to evolve BFS, DFS, community analytics, and integrity checks without rewriting the interface layer.',
      },
      {
        heading: 'Future dependency',
        body:
          'Future placement dashboards can continue consuming the same graph model and shared types exposed from this foundation.',
      },
    ],
  },
  requirements: {
    title: 'Functional Requirements',
    eyebrow: 'Version 1 scope',
    summary:
      'The must-have release includes network creation, visualization, BFS recommendations, DFS community exploration, connected components, and cycle integrity checks.',
    sections: [
      {
        heading: 'Core product needs',
        body:
          'Users must be able to add and remove students, inspect the professional network interactively, and understand reach, community structure, and referral health.',
      },
      {
        heading: 'Presentation requirement',
        body:
          'Each algorithm page needs placement-oriented wording, consistent statistics cards, and a real-world explanation tied to the interaction.',
      },
      {
        heading: 'Non-functional guardrails',
        body:
          'The app should stay polished, responsive, fast on placement-sized datasets, and maintainable through strict separation of concerns.',
      },
    ],
  },
  roadmap: {
    title: 'Development Roadmap',
    eyebrow: 'Implementation order',
    summary:
      'Milestone 1 establishes the shell. Later milestones add the network builder, visualization, BFS discovery, DFS exploration, community analytics, integrity checks, polish, and tests.',
    sections: [
      {
        heading: 'Build order',
        body:
          'The roadmap intentionally starts with the project scaffold, then adds the graph model, then algorithm-backed placement experiences so every step remains runnable.',
      },
      {
        heading: 'Current dependency',
        body:
          'This routed shell is the base that later placement modules will plug into.',
      },
      {
        heading: 'What comes next',
        body:
          'After the shell, the next concrete dependency is the reusable graph model and the four active analytics modules.',
      },
    ],
  },
}