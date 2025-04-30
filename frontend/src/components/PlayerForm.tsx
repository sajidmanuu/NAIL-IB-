import React, { useState } from 'react';
import axios from 'axios';

const PlayerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Batsman');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const player = { name, role };

    try {
      await axios.post('http://localhost:5000/api/cricket/player', player);
      alert('Player created successfully');
      setName('');
      setRole('Batsman');
    } catch (error) {
      console.error('Error creating player', error);
      alert('Error creating player');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Player</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Player Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter player name"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Player Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-rounder">All-rounder</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Player
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;
