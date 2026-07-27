---
Project: SocialGraph Lab
Version: 1.0
Document: Development Roadmap
Author: Cheshta Agarwal
Status: Approved
Last Updated: July 2026
---

# Development Roadmap

---

# Purpose

This document converts the Software Requirements into an implementation plan.

Instead of randomly developing features, the project will be built incrementally.

Each milestone depends on previously completed milestones.

---

# Development Philosophy

The project follows the principle:

> Build the foundation first, then add intelligence.

Each completed module should leave the application in a runnable state.

---

# Milestone Overview

| Milestone | Description | Status |
|------------|-------------|--------|
| M1 | Project Initialization | Pending |
| M2 | Graph Builder | Pending |
| M3 | Graph Visualization | Pending |
| M4 | BFS Module | Pending |
| M5 | DFS Module | Pending |
| M6 | Friend Suggestions | Pending |
| M7 | Community Detection | Pending |
| M8 | Shortest Path | Pending |
| M9 | Influencer Analysis | Pending |
| M10 | Learning Panel | Pending |
| M11 | UI Polish | Pending |
| M12 | Testing | Pending |

---

# Milestone 1

## Project Initialization

Deliverables

- React + Vite project
- Tailwind CSS
- Folder structure
- Routing
- Navbar
- Sidebar
- Home Page

Reason

Everything depends on a working project structure.

---

# Milestone 2

## Graph Builder

Deliverables

- Add Person
- Remove Person
- Add Friendship
- Remove Friendship

DSA

- Graph
- HashMap

NPTEL Mapping

Handling Real-world Network Datasets

Dependency

Milestone 1

---

# Milestone 3

## Graph Visualization

Deliverables

- Render nodes
- Render edges
- Drag nodes
- Zoom
- Pan

Library

React Flow

Dependency

Milestone 2

---

# Milestone 4

## BFS

Deliverables

- BFS traversal
- Queue animation
- Traversal order
- Learning explanation

DSA

Breadth First Search

NPTEL Mapping

Friend Discovery

Dependency

Milestone 3

---

# Milestone 5

## DFS

Deliverables

- DFS traversal
- Stack visualization
- Recursive exploration

DSA

Depth First Search

NPTEL Mapping

Community Discovery

Dependency

Milestone 3

---

# Milestone 6

## Friend Suggestions

Deliverables

- Suggest friends
- Mutual connections

DSA

Graph Traversal

NPTEL Mapping

Strength of Weak Ties

Dependency

BFS

---

# Milestone 7

## Community Detection

Deliverables

Detect connected components.

DSA

DFS

NPTEL Mapping

Homophily

Dependency

DFS

---

# Milestone 8

## Shortest Path

Deliverables

Find shortest connection.

Version 1

BFS

Future

Dijkstra

NPTEL Mapping

Small World Phenomenon

Dependency

BFS

---

# Milestone 9

## Influencer Analysis

Deliverables

Degree Centrality

Future

PageRank

NPTEL Mapping

Link Analysis

Dependency

Graph Builder

---

# Milestone 10

## Learning Panel

Every feature displays

- Description
- Complexity
- Real-world use
- Pseudocode

Dependency

All algorithms

---

# Milestone 11

## UI Polish

Deliverables

- Responsive layout
- Better animations
- Icons
- Theme consistency

---

# Milestone 12

## Testing

Checklist

- Graph creation
- BFS
- DFS
- Friend suggestions
- Community detection
- Learning panel

---

# Day-wise Plan

## Day 1

- Initialize project
- Graph Builder
- Graph Visualization
- BFS
- DFS

Goal

A fully working graph playground.

---

## Day 2

- Friend Suggestions
- Communities
- Shortest Path
- Influencer Analysis
- Learning Panel
- UI Polish

Goal

Presentation-ready application.

---

# Why This Order?

Graph algorithms cannot exist without a graph.

Friend Suggestions require BFS.

Community Detection requires DFS.

Shortest Path builds upon BFS.

Influencer Analysis requires an existing network.

Learning Panel is added after algorithms exist.

This dependency-driven approach minimizes rework and keeps the application functional after every milestone.

---

# Version 1 Completion Criteria

The project is considered complete when:

- Users can create a social network.
- Algorithms execute correctly.
- Visualizations are interactive.
- Educational explanations are available.
- The application is ready for deployment.