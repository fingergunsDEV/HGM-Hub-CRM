// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
// Import other pages like DashboardPage, ContentCalendarPage etc.

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Dashboard (Home)</Link></li>
            <li><Link to="/clients">Clients</Link></li>
            {/* Add other navigation links */}
          </ul>
        </nav>
        <hr />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/" element={<div><h1>Welcome to Holistic Content Hub CRM</h1><p>Select an option from the menu.</p></div>} />
            {/* Define other routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
