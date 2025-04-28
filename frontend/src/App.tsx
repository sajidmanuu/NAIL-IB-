import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MatchForm from './components/MatchForm';
import PlayerForm from './components/PlayerForm';
import TeamForm from './components/TeamForm';
import NavBar from './components/Navbar';
import AdminScoringPanel from './components/AdminScoringPanel';
import CommentoryScoringPannel from './components/CommentoryScoringPannel';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<MatchForm />} />
            <Route path="/players" element={<PlayerForm />} />
            <Route path="/teams" element={<TeamForm />} />
            <Route path="/scoring" element={<AdminScoringPanel />} />
            <Route path="/commentary" element={<CommentoryScoringPannel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
