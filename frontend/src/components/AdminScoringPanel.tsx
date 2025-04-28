import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const outcomes = [
  'legbye with overthrow',
  'noball',
  'noball with overthrow',
  'noball with bye',
  'noball with bye and overthrow',
  'noball with legbye',
  'noball with legbye and overthrow',
  'wide',
  'wide with overthrow',
  'wide with bye',
  'wide with bye and overthrow',
  'wide with legbye',
  'wide with legbye and overthrow',
  'wicket',
];

const AdminScoringPanel: React.FC = () => {
  const [selectedOutcome, setSelectedOutcome] = useState('');
  const [runs, setRuns] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      outcome: selectedOutcome,
      runs: runs === '' ? 0 : runs,
    };

    // Replace this with your API call
    console.log('Sending payload to API:', payload);
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow">
      <h4 className="mb-4">Admin Scoring Panel</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Outcome</label>
          <select
            className="form-select"
            value={selectedOutcome}
            onChange={(e) => setSelectedOutcome(e.target.value)}
            required
          >
            <option value="">-- Select an Outcome --</option>
            {outcomes.map((outcome) => (
              <option key={outcome} value={outcome}>
                {outcome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Runs Scored</label>
          <input
            type="number"
            className="form-control"
            value={runs}
            onChange={(e) => setRuns(Number(e.target.value))}
            min={0}
            max={6}
            placeholder="e.g. 2"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Score
        </button>
      </form>
    </div>
  );
};

export default AdminScoringPanel;
