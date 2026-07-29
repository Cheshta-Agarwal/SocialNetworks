import { GitBranch, Home, Network, Route as RouteIcon, ShieldCheck } from 'lucide-react'

export type NavigationItem = {
  label: string
  to: string
  icon: typeof Home
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

export const navigationItems: NavigationItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Vision', to: '/vision', icon: Network },
  { label: 'Architecture', to: '/architecture', icon: GitBranch },
  { label: 'Requirements', to: '/requirements', icon: ShieldCheck },
  { label: 'Roadmap', to: '/roadmap', icon: RouteIcon },
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