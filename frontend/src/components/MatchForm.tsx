// Full working MatchForm.tsx with team fetching and selection

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Card } from 'react-bootstrap';

const MatchForm: React.FC = () => {
  const [teams, setTeams] = useState<{ _id: string, name: string }[]>([]);
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [matchType, setMatchType] = useState('T20');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cricket/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (team1 === team2) {
      alert('Please select two different teams');
      return;
    }

    const match = {
      team1,
      team2,
      matchType,
      startDate,
      status: 'Scheduled',
    };

    try {
      await axios.post('http://localhost:5000/api/cricket/match', match);
      alert('Match created successfully!');
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Error creating match');
    }
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Create Match</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="team1">
            <Form.Label>Select Team 1</Form.Label>
            <Form.Control
              as="select"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              required
            >
              <option value="">-- Select Team 1 --</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>{team.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="team2">
            <Form.Label>Select Team 2</Form.Label>
            <Form.Control
              as="select"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              required
            >
              <option value="">-- Select Team 2 --</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>{team.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="matchType">
            <Form.Label>Match Type</Form.Label>
            <Form.Control
              as="select"
              value={matchType}
              onChange={(e) => setMatchType(e.target.value)}
              required
            >
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="Test">Test</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Create Match
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MatchForm;