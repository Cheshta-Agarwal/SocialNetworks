import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import DocumentPage from './pages/DocumentPage'
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
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</AppShell>
	)
}

export default App
