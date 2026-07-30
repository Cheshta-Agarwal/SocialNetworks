import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import DijkstraPage from './pages/DijkstraPage'
import BipartitePage from './pages/BipartitePage'
import ConnectedComponentsPage from './pages/ConnectedComponentsPage'
import CycleDetectionPage from './pages/CycleDetectionPage'
import DFSPage from './pages/DFSPage'
import DocumentPage from './pages/DocumentPage'
import BFSPage from './pages/BFSPage'
import ShortestPathPage from './pages/ShortestPathPage'
import GraphBuilderPage from './pages/GraphBuilderPage'
import HomePage from './pages/HomePage'
import { docPages } from './data/siteContent'

function App() {
	return (
		<AppShell>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/vision" element={<DocumentPage page={docPages.vision} />} />
				<Route path="/architecture" element={<DocumentPage page={docPages.architecture} />} />
				<Route path="/requirements" element={<DocumentPage page={docPages.requirements} />} />
				<Route path="/roadmap" element={<DocumentPage page={docPages.roadmap} />} />
				<Route path="/graph-builder" element={<GraphBuilderPage />} />
				<Route path="/bfs" element={<BFSPage />} />
				<Route path="/dfs" element={<DFSPage />} />
				<Route path="/shortest-path" element={<ShortestPathPage />} />
				<Route path="/dijkstra" element={<DijkstraPage />} />
				<Route path="/connected-components" element={<ConnectedComponentsPage />} />
				<Route path="/cycle-detection" element={<CycleDetectionPage />} />
				<Route path="/bipartite" element={<BipartitePage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</AppShell>
	)
}

export default App
