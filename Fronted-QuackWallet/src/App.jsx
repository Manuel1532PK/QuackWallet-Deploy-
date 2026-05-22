import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider'
import { NotificationProvider } from './context/NotificationContext'
import Login from './component/auth-page/login'
import Register from './component/auth-page/register';
import Home from './component/home';
import Profile from './component/auth-page/profile'
import Verification from './component/auth-page/verification';
import Cards from './component/cards';
import AlertHistory from './component/AlertHistory';
import ComingSoon from './component/ComingSoon';
import Reports from './component/Reports';

import './App.css'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/configuracion" element={<ComingSoon />} />
          <Route path="/security" element={<ComingSoon />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/news" element={<ComingSoon />} />
          <Route path="/connections" element={<ComingSoon />} />
          <Route path="/alerts" element={<AlertHistory />} />
        </Routes>
      </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
