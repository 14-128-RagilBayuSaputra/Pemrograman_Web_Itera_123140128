import {Routes, Route, Link} from 'react-router-dom';
import HomePage from './pages/Home/Home.jsx';
import './App.css';

function StatsPage() {
  return <h2>Halaman Statistik (Segera Hadir)</h2>
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/stats">Statistik</Link>
      </nav>

      <h1>Aplikasi Manajemen Buku</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </div>
  )
}

export default App