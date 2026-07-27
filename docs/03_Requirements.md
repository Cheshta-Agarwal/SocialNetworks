---
Project: SocialGraph Lab
Version: 1.0
Document: Software Requirements Specification (SRS)
Author: Cheshta Agarwal
Status: Approved
Last Updated: July 2026
---

# Software Requirements Specification

---

# Purpose

This document defines the functional and non-functional requirements for Version 1 of SocialGraph Lab.

It serves as the implementation checklist for development.

Every feature implemented should correspond to at least one requirement defined here.

---

# Project Objective

Develop an interactive web application that demonstrates how Data Structures and Algorithms are used to model and analyze real-world social networks.

The application should provide both educational explanations and interactive visualizations.

---

# Stakeholders

Primary Stakeholders

- Students
- Faculty
- Developers

Secondary Stakeholders

- Interview candidates
- Self-learners

---

# Functional Requirements

## FR-01 Graph Creation

The system shall allow users to create a social network graph.

Capabilities:

- Add person
- Remove person
- Add friendship
- Remove friendship

Priority:

⭐⭐⭐⭐⭐

---

## FR-02 Graph Visualization

The system shall display the current graph interactively.

Users should be able to:

- Drag nodes
- Zoom
- Pan
- Observe connections

Priority:

⭐⭐⭐⭐⭐

---

## FR-03 BFS Traversal

The system shall execute Breadth First Search.

The visualization should display:

- Traversal order
- Current node
- Visited nodes

Educational panel should explain:

- Queue usage
- Time Complexity
- Real-world application

Priority:

⭐⭐⭐⭐⭐

---

## FR-04 DFS Traversal

The system shall execute Depth First Search.

Visualization should include:

- Recursive exploration
- Backtracking
- Traversal order

Educational panel should explain:

- Stack / Recursion
- Time Complexity
- Community detection

Priority:

⭐⭐⭐⭐⭐

---

## FR-05 Friend Suggestions

The system shall recommend potential friends based on graph connectivity.

Version 1 may use:

- Mutual friends
- BFS traversal

Priority:

⭐⭐⭐⭐

---

## FR-06 Community Detection

The application shall detect connected components.

Educational connection:

Homophily

Priority:

⭐⭐⭐⭐

---

## FR-07 Shortest Connection

Users shall discover the shortest path between two users.

Version 1

Algorithm:

BFS

Future

Dijkstra

Priority:

⭐⭐⭐⭐

---

## FR-08 Influencer Analysis

The application shall identify influential users.

Version 1

Metric:

Degree Centrality

Future:

PageRank

Priority:

⭐⭐⭐

---

## FR-09 Viral Spread Simulation

The application shall simulate information propagation through the network.

Educational topic:

Cascade Behaviour

Priority:

⭐⭐⭐

---

## FR-10 Educational Learning Panel

Every algorithm page shall display:

- Description
- Real-world use
- Time Complexity
- Space Complexity
- Pseudocode

Priority:

⭐⭐⭐⭐⭐

---

# Non-Functional Requirements

## Performance

Algorithms should execute instantly for educational datasets.

---

## Usability

The application should remain beginner-friendly.

---

## Maintainability

Algorithms must remain independent from UI components.

---

## Scalability

Future versions should support backend integration.

---

## Portability

Application should be deployable using modern web hosting platforms.

---

# User Stories

### Student

As a student,

I want to create a social network,

so that I can understand graph algorithms.

---

### Faculty

As a faculty member,

I want to observe algorithm execution,

so that I can evaluate implementation quality.

---

### Learner

As a learner,

I want explanations beside every visualization,

so that I understand the purpose of every algorithm.

---

# Version 1 Deliverables

Must Have

- Graph Builder
- BFS
- DFS
- Friend Suggestions
- Connected Components
- Learning Panel

Should Have

- Shortest Path
- Influencer Ranking

Nice to Have

- Viral Simulation
- Epidemic Simulation

---

# Acceptance Criteria

Version 1 is complete when:

✓ User can build a graph.

✓ Graph renders correctly.

✓ BFS executes correctly.

✓ DFS executes correctly.

✓ Friend suggestions work.

✓ Connected components are identified.

✓ Every algorithm includes explanations.

✓ Application runs locally.

---

# Traceability Matrix

| Requirement | Feature |
|-------------|----------|
| FR-01 | Graph Builder |
| FR-02 | Graph Viewer |
| FR-03 | BFS Module |
| FR-04 | DFS Module |
| FR-05 | Friend Suggestions |
| FR-06 | Communities |
| FR-07 | Shortest Path |
| FR-08 | Influencer Analysis |
| FR-09 | Viral Simulation |
| FR-10 | Learning Panel |

---

# Conclusion

This document defines the minimum scope for Version 1.

Future enhancements should extend the project without modifying these core requirements.