import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ConnectedComponentsPage from './pages/ConnectedComponentsPage'
import CycleDetectionPage from './pages/CycleDetectionPage'
import DFSPage from './pages/DFSPage'
import DocumentPage from './pages/DocumentPage'
import BFSPage from './pages/BFSPage'
import HomePage from './pages/HomePage'

function App() {
	return (
		<AppShell>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/documentation" element={<DocumentPage />} />
				<Route path="/bfs" element={<BFSPage />} />
				<Route path="/dfs" element={<DFSPage />} />
				<Route path="/connected-components" element={<ConnectedComponentsPage />} />
				<Route path="/cycle-detection" element={<CycleDetectionPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</AppShell>
	)
}

export default App