---
Project: SocialGraph Lab
Version: 1.0
Document: System Architecture
Author: Cheshta Agarwal
Status: Approved
Last Updated: July 2026
---

# System Architecture

---

# Purpose

This document describes the overall architecture of SocialGraph Lab and explains how different modules interact.

The objective is to create an educational platform that demonstrates how Data Structures and Algorithms power modern social networking systems.

---

# Architecture Philosophy

The architecture follows five guiding principles:

- Modular
- Educational
- Interactive
- Extensible
- Simple enough to understand

Every algorithm should exist as an independent module that can later be reused in multiple features.

---

# High-Level Architecture

```
                    User
                      │
                      ▼
             React Frontend
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   UI Components   Algorithm Engine Visualization
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
               Graph Data Model
```

---

# Version 1 Architecture

This project intentionally follows a frontend-only architecture.

Reasons:

- Faster development
- Easier deployment
- No authentication required
- No database required
- Algorithms execute instantly inside the browser

Future versions may introduce a backend for handling large datasets and collaborative simulations.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite

Reason:

Fast development, modular components, excellent ecosystem.

---

## Styling

Tailwind CSS

Reason:

Rapid UI development while maintaining consistency.

---

## Graph Visualization

React Flow

Reason:

Provides interactive nodes and edges with zooming, dragging, and customization.

---

## State Management

React Context API

Reason:

Sufficient for Version 1 without introducing unnecessary complexity.

---

## Icons

Lucide React

---

# Project Structure

```
src/
│
├── components/
│
├── pages/
│
├── algorithms/
│
├── visualizations/
│
├── hooks/
│
├── utils/
│
├── data/
│
├── assets/
│
└── types/
```

---

# Module Responsibilities

## components/

Reusable UI components.

Example:

- Navbar
- Sidebar
- Cards
- Buttons

---

## pages/

Application screens.

Example:

Dashboard

Graph Builder

Friend Suggestions

Communities

Influencer Analysis

Viral Simulation

---

## algorithms/

Pure algorithm implementations.

Example:

```
bfs.ts

dfs.ts

dijkstra.ts

unionFind.ts

heap.ts

trie.ts
```

Algorithms must not depend on React.

This allows them to remain reusable.

---

## visualizations/

Responsible for animation.

Algorithms return results.

Visualization modules display those results.

---

## hooks/

Reusable custom React hooks.

---

## utils/

Helper functions.

---

## data/

Sample datasets.

---

## types/

Shared TypeScript interfaces.

---

# Data Flow

```
User Action

↓

Graph Created

↓

Algorithm Executes

↓

Result Returned

↓

Visualization Updates

↓

Learning Panel Explains
```

---

# Core Data Model

Version 1 uses a graph.

Each user is represented as a node.

Each friendship is represented as an edge.

```
Person

↓

Node

Friendship

↓

Edge
```

---

# Separation of Concerns

The project separates:

UI

↓

Business Logic

↓

Visualization

This keeps the code maintainable and easier to extend.

---

# Scalability

Future versions should support:

- Weighted graphs
- Directed graphs
- Real social datasets
- Backend APIs
- Database integration
- Authentication
- Live collaboration

---

# Implementation Decisions

| Decision | Choice |
|-----------|--------|
| Frontend | React + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Graph Library | React Flow |
| State Management | Context API |
| Backend | Not required for v1 |
| Database | None |
| Deployment | Vercel (future) |
| Algorithms | Pure TypeScript modules |
| Visualization | React Components |

---

# Conclusion

This architecture prioritizes learning, modularity, and maintainability.

Every new feature should reuse existing algorithms rather than embedding logic directly inside UI components.