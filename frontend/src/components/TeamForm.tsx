import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

const TeamForm: React.FC = () => {
  // form state
  const [teamName, setTeamName] = useState<string>('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);  // store selected player IDs
  const [players, setPlayers] = useState<{ _id: string, name: string }[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);  // to disable button if not exactly 3 players are selected

  // Fetch unselected players
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cricket/getAllUnselectedPlayer');
        setPlayers(response.data);  // Set player data with name and _id
      } catch (error) {
        console.error('Error fetching unselected players', error);
      }
    };

    fetchPlayers();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setSelectedPlayers((prevSelectedPlayers) => {
      if (checked) {
        // Add player ID to selected players
        return [...prevSelectedPlayers, value];
      } else {
        // Remove player ID from selected players
        return prevSelectedPlayers.filter((playerId) => playerId !== value);
      }
    });
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const teamData = {
      name: teamName,
      players: selectedPlayers,  // Send only player IDs
    };

    try {
      await axios.post('http://localhost:5000/api/cricket/team', teamData);
      alert('Team created successfully!');
    } catch (error) {
      console.error('Error creating team', error);
      alert('Error creating team');
    }
  };

  useEffect(() => {
    // Enable button only when exactly 3 players are selected
    setIsButtonDisabled(selectedPlayers.length !== 11);
  }, [selectedPlayers]);

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Create Team</Card.Title>
        <Form onSubmit={handleSubmit}>
          {/* Team Name */}
          <Form.Group controlId="teamName">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </Form.Group>

          {/* Player Selection with Checkboxes */}
          <Form.Group controlId="players">
            <Form.Label>Select Players (Exactly 11)</Form.Label>
            <div>
              {players.map((player) => (
                <Form.Check
                  key={player._id}
                  type="checkbox"
                  label={player.name}
                  value={player._id}
                  checked={selectedPlayers.includes(player._id)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" disabled={isButtonDisabled}>
            Create Team
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TeamForm;
