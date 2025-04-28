import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Trophy, BarChart, Mic, Menu } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-indigo-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold tracking-wide flex items-center">
              <Trophy className="w-8 h-8 mr-2" />
              Cricket Management
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${
                  location.pathname === '/'
                    ? 'bg-indigo-800 text-white'
                    : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link
                to="/matches"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${
                  location.pathname === '/matches'
                    ? 'bg-indigo-800 text-white'
                    : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Matches
              </Link>
              <Link
                to="/players"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${
                  location.pathname === '/players'
                    ? 'bg-indigo-800 text-white'
                    : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Players
              </Link>
              <Link
                to="/teams"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${
                  location.pathname === '/teams'
                    ? 'bg-indigo-800 text-white'
                    : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Teams
              </Link>
              <Link
                to="/scoring"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${
                  location.pathname === '/scoring'
                    ? 'bg-indigo-800 text-white'
                    : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <BarChart className="w-4 h-4 mr-2" />
                Scoring
              </Link>
              <Link
                to="/commentary"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${
                  location.pathname === '/commentary'
                    ? 'bg-indigo-800 text-white'
                    : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <Mic className="w-4 h-4 mr-2" />
                Commentary
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-white hover:text-gray-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
