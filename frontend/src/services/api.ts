import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cricket';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createMatch = (matchData: { team1: string; team2: string }) => {
  return api.post('/match', matchData);
};

export const createPlayer = (playerData: { name: string; team: string }) => {
  return api.post('/player', playerData);
};
