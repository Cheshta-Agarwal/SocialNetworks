import {
  BookOpen,
  Home,
  Search,
  Users,
  ShieldCheck,
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
    heading: 'Student Features',
    items: [
      {
        label: 'Discover Alumni',
        to: routePaths.bfs,
        icon: Search,
      },
      {
        label: 'Professional Network',
        to: routePaths.dfs,
        icon: Users,
      },
    ],
  },
  {
    heading: 'Placement Analytics',
    items: [
      {
        label: 'Department Connectivity',
        to: routePaths.connectedComponents,
        icon: Users,
      },
      {
        label: 'Referral Integrity',
        to: routePaths.cycleDetection,
        icon: ShieldCheck,
      },
    ],
  },
  {
    heading: 'Documentation',
    items: [
      {
        label: 'Documentation',
        to: routePaths.documentation,
        icon: BookOpen,
      },
    ],
  },
]

export const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    to: routePaths.home,
    icon: Home,
  },
]

export const algorithmCards: AlgorithmCard[] = [
  {
    title: 'Discover Alumni',
    summary:
      'Find alumni and professionals connected to a selected student.',
    useCase:
      'Recommend mentors, alumni and networking opportunities.',
    to: routePaths.bfs,
    icon: Search,
  },
  {
    title: 'Professional Network',
    summary:
      'Explore an entire professional community starting from one student.',
    useCase:
      'Understand mentorship chains and professional reach.',
    to: routePaths.dfs,
    icon: Users,
  },
  {
    title: 'Department Connectivity',
    summary:
      'Identify isolated departments and disconnected student groups.',
    useCase:
      'Help the Placement Cell improve networking initiatives.',
    to: routePaths.connectedComponents,
    icon: Users,
  },
  {
    title: 'Referral Integrity',
    summary:
      'Detect suspicious referral loops inside the placement network.',
    useCase:
      'Prevent fake recommendation chains.',
    to: routePaths.cycleDetection,
    icon: ShieldCheck,
  },
]

export const docPages = {  vision: {
    title: 'Project Vision',
    eyebrow: 'Placement Intelligence',
    summary:
      'PlacementConnect is a graph-powered analytics platform that helps universities strengthen student, alumni, recruiter and mentor networks through interactive visualization and graph algorithms.',

    sections: [
      {
        heading: 'Problem Statement',
        body:
          'Placement opportunities often depend on professional relationships rather than resumes alone. Universities usually maintain alumni databases but lack tools to analyze how students, mentors, alumni and recruiters are connected.',
      },
      {
        heading: 'Our Solution',
        body:
          'PlacementConnect transforms placement data into an interactive relationship graph, allowing students to discover mentors while enabling placement officers to monitor network health and engagement.',
      },
      {
        heading: 'Target Users',
        body:
          'Students, Alumni, Recruiters, Faculty Mentors and Placement Cell Administrators.',
      },
    ],
  },
  architecture: {
    title: 'System Architecture',
    eyebrow: 'Frontend Architecture',
    summary:
      'The application follows a modular React architecture where visualization, graph algorithms and state management remain completely independent.',

    sections: [
      {
        heading: 'Presentation Layer',
        body:
          'React pages and reusable components provide the dashboard interface while React Flow renders the graph visualization.',
      },
      {
        heading: 'Business Layer',
        body:
          'Pure TypeScript implementations perform BFS, DFS, Connected Components and Cycle Detection without depending on React.',
      },
      {
        heading: 'State Management',
        body:
          'Zustand stores a single shared graph model which is consumed by every algorithm page.',
      },
    ],
  },
  requirements: {
    title: 'Functional Requirements',
    eyebrow: 'Core Modules',
    summary:
      'The system allows creation of placement networks, interactive visualization, alumni discovery, community analytics and referral integrity monitoring.',
    sections: [
      {
        heading: 'Student Module',
        body:
          'Students can build their professional network, discover alumni and explore mentorship communities.',
      },
      {
        heading: 'Placement Cell',
        body:
          'Administrators can identify isolated departments and monitor overall placement connectivity.',
      },
      {
        heading: 'Security',
        body:
          'Referral Integrity Monitor detects suspicious cyclic recommendation patterns that may indicate fake referral chains.',
      },
    ],
  },
  roadmap: {
    title: 'Development Roadmap',
    eyebrow: 'Future Scope',
    summary:
      'Future versions will integrate authentication, recruiter dashboards, company recommendations, skill matching and AI-powered career guidance.',
    sections: [
      {
        heading: 'Version 2',
        body:
          'Authentication, user profiles and persistent database integration.',
      },
      {
        heading: 'Version 3',

        body:
          'Company recommendation engine and recruiter management.',
      },
      {
        heading: 'Version 4',

        body:
          'Machine learning based career recommendations and placement prediction.',
      },
    ],
  },
} as const