import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import DramaFilter from './pages/DramaFilter/DramaFilter';
import Complaints from './pages/Complaints/Complaints';
import VoiceToTicket from './pages/VoiceToTicket/VoiceToTicket';
import BylawBot from './pages/BylawBot/BylawBot';
import Accounts from './pages/Accounts/Accounts';
import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import BottomNav, { Sidebar, getNavItems } from './components/BottomNav';

const AppInner = () => {
  const { user } = useAuth();
  const location = useLocation();
  const validPaths = getNavItems(user).map(n => n.path);
  const showNav = user && validPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Desktop Sidebar */}
      {showNav && <Sidebar />}

      {/* Main content — offset by sidebar on desktop */}
      <div className={showNav ? 'lg:ml-[260px]' : ''}>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/drama-filter" element={user ? <DramaFilter /> : <Navigate to="/login" replace />} />
          <Route path="/complaints" element={user ? <Complaints /> : <Navigate to="/login" replace />} />
          <Route path="/voice-to-ticket" element={user ? <VoiceToTicket /> : <Navigate to="/login" replace />} />
          <Route path="/bylaw-bot" element={user ? <BylawBot /> : <Navigate to="/login" replace />} />
          <Route path="/accounts" element={user && user.role === 'admin' ? <Accounts /> : <Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Mobile Bottom Nav */}
      {showNav && <BottomNav />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
    </AuthProvider>
  );
}

export default App;
