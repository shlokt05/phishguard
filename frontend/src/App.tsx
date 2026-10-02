import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { FakeWebsiteTraining } from './pages/FakeWebsiteTraining';
import { ThreatLabPage } from './pages/ThreatLabPage';
import { Detect } from './pages/Detect';
import { Safety } from './pages/Safety';
import { Quiz } from './pages/Quiz';
import { Posters } from './pages/Posters';
import { Progress } from './pages/Progress';
import { Campaign } from './pages/Campaign';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#0A0E17] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/fake-website-training" element={<FakeWebsiteTraining />} />
              <Route path="/threat-lab" element={<ThreatLabPage />} />
              <Route path="/detect" element={<Detect />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/posters" element={<Posters />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
