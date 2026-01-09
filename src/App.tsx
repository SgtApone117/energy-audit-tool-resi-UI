import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import AuditIntake from './pages/AuditIntake'
import MeasuresInput from './pages/MeasuresInput'
import SavingsSummary from './pages/SavingsSummary'
import RecommendationPackages from './pages/RecommendationPackages'
import AuditReport from './pages/AuditReport'
import './App.css'

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Intake' },
    { path: '/measures', label: 'Measures' },
    { path: '/summary', label: 'Summary' },
    { path: '/packages', label: 'Packages' },
    { path: '/report', label: 'Report' },
  ]

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">CT Energy Audit Tool</h1>
          <div className="demo-badge">DEMO MOCKUP</div>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-content">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <p>Connecticut Energy Audit Tool - Professional Mockup for Contractors</p>
        <p className="disclaimer">All data shown is sample/dummy data for demonstration purposes only</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AuditIntake />} />
          <Route path="/measures" element={<MeasuresInput />} />
          <Route path="/summary" element={<SavingsSummary />} />
          <Route path="/packages" element={<RecommendationPackages />} />
          <Route path="/report" element={<AuditReport />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
