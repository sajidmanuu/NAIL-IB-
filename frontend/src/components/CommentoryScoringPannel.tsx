
// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import './CommentoryScoringPannel.css';
// // import axios from 'axios';
// // import { Button, Form, Table } from 'react-bootstrap';

// // interface Player {
// //   _id: string;
// //   name: string;
// //   role: string;
// // }

// // interface Team {
// //   _id: string;
// //   name: string;
// // }

// // interface TeamWithPlayers extends Team {
// //   players: Player[];
// // }

// // interface Match {
// //   _id: string;
// //   matchType: 'Test' | 'ODI' | 'T20';
// //   team1: Team;
// //   team2: Team;
// // }

// // const CommentoryScoringPannel: React.FC = () => {
// //   const [matches, setMatches] = useState<Match[]>([]);
// //   const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
// //   const [loadingMatch, setLoadingMatch] = useState(true);
// //   const [battingTeam, setBattingTeam] = useState<TeamWithPlayers | null>(null);
// //   const [bowlingTeam, setBowlingTeam] = useState<TeamWithPlayers | null>(null);
// //   const [strikerId, setStrikerId] = useState<string>('');
// //   const [nonStrikerId, setNonStrikerId] = useState<string>('');
// //   const [bowlerId, setBowlerId] = useState<string>('');
// //   const [selectedRun, setSelectedRun] = useState<number | null>(null);
// //   const [extras, setExtras] = useState({
// //     noBall: false,
// //     wide: false,
// //     bye: false,
// //     legbye: false,
// //     overthrow: false,
// //   });
// //   const [wicket, setWicket] = useState(false);
// //   const runColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
// //   const [strikerStats, setStrikerStats] = useState<any>({});
// //   const [nonStrikerStats, setNonStrikerStats] = useState<any>({});
// //   const [bowlerStats, setBowlerStats] = useState<any>({});
 
// //   const formatOvers = (balls: number) => `${Math.floor(balls / 6)}.${balls % 6}`;
// //   const handleChangeInning = async () => {
// //     if (!matches.length) return;

// //     const matchId = matches[0]._id; // you can allow dynamic selection too
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/cricket/match/changeInning', {
// //         matchId
// //       });
// //       console.log('Inning changed:', res.data);
// //       alert(`Inning changed to ${res.data.currentInning}`);
// //     } catch (err) {
// //       console.error('Error changing inning:', err);
// //     }
// //   };
// //   useEffect(() => {
// //     const fetchMatches = async () => {
// //       try {
// //         const res = await axios.get<Match[]>('http://localhost:5000/api/cricket/match');
// //         setMatches(res.data);
// //         const stored = localStorage.getItem('selectedMatch');
// //         if (stored) {
// //           const parsed: Match = JSON.parse(stored);
// //           const found = res.data.find((m) => m._id === parsed._id);
// //           if (found) setSelectedMatch(found);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching matches', err);
// //       } finally {
// //         setLoadingMatch(false);
// //       }
// //     };
// //     fetchMatches();
// //   }, []);

// //   const fetchStats = async () => {
// //     if (strikerId) {
// //       const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
// //         playerId: strikerId, status: 'batting'
// //       });
// //       setStrikerStats(res.data.battingStats);
// //     }
// //     if (nonStrikerId) {
// //       const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
// //         playerId: nonStrikerId, status: 'batting'
// //       });
// //       setNonStrikerStats(res.data.battingStats);
// //     }
// //     if (bowlerId) {
// //       const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
// //         playerId: bowlerId, status: 'bowling'
// //       });
// //       setBowlerStats(res.data.bowlingStats);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStats();
// //   }, [strikerId, nonStrikerId, bowlerId]);

// //   useEffect(() => {
// //     const matchId = selectedMatch?._id;
// //     if (!matchId) return;
// //     const fetchMatchPlayers = async () => {
// //       try {
// //         const response = await axios.post('http://localhost:5000/api/cricket/match/getMatchPlayers', { id: matchId });
// //         setBattingTeam(response.data.battingTeam);
// //         setBowlingTeam(response.data.bowlingTeam);
// //       } catch (error) {
// //         console.error("Error fetching players", error);
// //       }
// //     };
// //     fetchMatchPlayers();
// //   }, [selectedMatch]);

// //   const handleMatchSelect = (matchId: string) => {
// //     const match = matches.find((m) => m._id === matchId) || null;
// //     setSelectedMatch(match);
// //     if (match) localStorage.setItem('selectedMatch', JSON.stringify(match));
// //     else localStorage.removeItem('selectedMatch');
// //   };

// //   const handleRunClick = (run: number) => setSelectedRun(run);
// //   const toggleExtra = (type: keyof typeof extras) => setExtras((prev) => ({ ...prev, [type]: !prev[type] }));

// //   const handleSubmit = async() => {
// //     const payload = {
// //       run: selectedRun ?? 0,
// //       extras,
// //       wicket,
// //       striker: strikerId,
// //       nonStriker: nonStrikerId,
// //       bowler: bowlerId
// //     };
// //     try {
// //         const response = await axios.post('http://localhost:5000/api/cricket/team/updateBallData',payload);
// //         // setBattingTeam(response.data.battingTeam);
// //         // setBowlingTeam(response.data.bowlingTeam);
// //       } catch (error) {
// //         console.error("Error fetching players", error);
// //       }
// //     console.log('Submitted:', payload);
// //     setSelectedRun(null);
// //     setExtras({ noBall: false, wide: false, bye: false, legbye: false, overthrow: false });
// //     setWicket(false);
// //   };

// //   const getPlayerName = (id: string) => {
// //     const allPlayers = [...(battingTeam?.players || []), ...(bowlingTeam?.players || [])];
// //     return allPlayers.find(p => p._id === id)?.name || '';
// //   };
// //   const [matchScore, setMatchScore] = useState<any>(null);

// //   useEffect(() => {
// //     const fetchMatchScore = async () => {
// //       const matchdataString = localStorage.getItem('selectedMatch');
      
// //       if (!matchdataString) return;
  
// //       const matchdata = JSON.parse(matchdataString);
// //       const id = matchdata?._id;
  
// //       try {
// //         const res = await axios.get(`http://localhost:5000/api/cricket/match/${id}`);
// //         console.log("reddd",res.data);
        
// //         setMatchScore(res.data);
// //       } catch (err) {
// //         console.error('Error fetching match details:', err);
// //       }
// //     };
  
// //     fetchMatchScore();
// //   }, []);
  

// //   return (
// //     <div className="container mt-5">
// //       <h4 className="mb-4">Live Cricket Scoring Panel</h4>

// //       <Form.Group controlId="matchSelect" className="mb-4">
// //         <Form.Label>Select Match</Form.Label>
// //         <Form.Control
// //           as="select"
// //           value={selectedMatch?._id || ''}
// //           onChange={(e) => handleMatchSelect(e.target.value)}>
// //           <option value="">-- Choose a match --</option>
// //           {matches.map((m) => (
// //             <option key={m._id} value={m._id}>
// //               {m.team1.name} vs {m.team2.name} ({m.matchType})
// //             </option>
// //           ))}
// //         </Form.Control>
// //       </Form.Group>

// //       {!loadingMatch && selectedMatch && (
// //         <div className="alert alert-secondary">
// //           <strong>Selected Match:</strong> {selectedMatch.team1.name} vs {selectedMatch.team2.name} — {selectedMatch.matchType}
// //         </div>
// //       )}
// //  <Button onClick={handleChangeInning} disabled={ !matches.length}>
// //         Change Inning
// //       </Button>
// //       <div className="row">
// //         <div className="col-md-6">
// //           <div className="mb-4 bg-light p-3 rounded border">
// //             <Form.Group className="mb-2">
// //               <Form.Label>Striker</Form.Label>
// //               <Form.Select value={strikerId} onChange={(e) => setStrikerId(e.target.value)}>
// //                 <option value="">Select Striker</option>
// //                 {battingTeam?.players.filter(p => p._id !== nonStrikerId).map(p => (
// //                   <option key={p._id} value={p._id}>{p.name}</option>
// //                 ))}
// //               </Form.Select>
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Non-Striker</Form.Label>
// //               <Form.Select value={nonStrikerId} onChange={(e) => setNonStrikerId(e.target.value)}>
// //                 <option value="">Select Non-Striker</option>
// //                 {battingTeam?.players.filter(p => p._id !== strikerId).map(p => (
// //                   <option key={p._id} value={p._id}>{p.name}</option>
// //                 ))}
// //               </Form.Select>
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Bowler</Form.Label>
// //               <Form.Select value={bowlerId} onChange={(e) => setBowlerId(e.target.value)}>
// //                 <option value="">Select Bowler</option>
// //                 {bowlingTeam?.players.map(p => (
// //                   <option key={p._id} value={p._id}>{p.name}</option>
// //                 ))}
// //               </Form.Select>
// //             </Form.Group>
// //           </div>

// //           <div className="mb-4">
// //             <div className="d-flex flex-wrap gap-3 justify-content-center">
// //               {[0, 1, 2, 3, 4, 5, 6].map((run, i) => (
// //                 <button
// //                   key={run}
// //                   className={`btn run-btn btn-${runColors[i]} ${selectedRun === run ? 'active' : ''}`}
// //                   onClick={() => handleRunClick(run)}>
// //                   {run}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="mb-4 d-flex flex-wrap gap-2">
// //             <Button variant={extras.noBall ? 'warning' : 'outline-warning'} onClick={() => toggleExtra('noBall')}>No Ball</Button>
// //             <Button variant={extras.wide ? 'warning' : 'outline-warning'} onClick={() => toggleExtra('wide')}>Wide</Button>
// //             <Button variant={extras.bye ? 'info' : 'outline-info'} onClick={() => toggleExtra('bye')}>Bye</Button>
// //             <Button variant={extras.legbye ? 'info' : 'outline-info'} onClick={() => toggleExtra('legbye')}>Leg Bye</Button>
// //             <Button variant={extras.overthrow ? 'danger' : 'outline-danger'} onClick={() => toggleExtra('overthrow')}>Overthrow</Button>
// //             <Button variant={wicket ? 'dark' : 'outline-dark'} onClick={() => setWicket(!wicket)}>Wicket</Button>
// //           </div>

// //           <Button variant="success" className="w-100" onClick={handleSubmit}>New Ball</Button>
// //         </div>

// //         <div className="col-md-6">
// //           <div className="bg-white p-4 border rounded shadow-sm">
// //             {/* <h6>Selected Players</h6>
// //             <Table size="sm" bordered>
// //               <thead className="table-light">
// //                 <tr><th>Role</th><th>Name</th></tr>
// //               </thead>
// //               <tbody>
// //                 <tr><td>Striker</td><td>{getPlayerName(strikerId)}</td></tr>
// //                 <tr><td>Non-Striker</td><td>{getPlayerName(nonStrikerId)}</td></tr>
// //                 <tr><td>Bowler</td><td>{getPlayerName(bowlerId)}</td></tr>
// //               </tbody>
// //             </Table> */}
// //             <div>
// //             <div className="d-flex justify-content-between mb-2">
// //   <div>
// //     <strong>{matchScore?.team1?.name}</strong>
// //     <div>{matchScore?.team1?.totalRuns} / {matchScore?.team1?.totalWickets}</div>
// //     {/* <small>Over {parseFloat(matchScore?.team1?.overs || 0).toFixed(1)}</small> */}
// //     <small>Over {(((matchScore?.team1?.overs).toFixed(1))/0.6).toFixed(1)}</small>
   
// //   </div>
// //   <span>vs</span>
// //   <div>
// //     <strong>{matchScore?.team2?.name}</strong>
// //     <div>{matchScore?.team2?.totalRuns} / {matchScore?.team2?.totalWickets}</div>
  
// // <small>Over {(((matchScore?.team2?.overs).toFixed(1))/0.6).toFixed(1)}</small>
    


// //   </div>
// // </div>

// //             </div>
            

// //             <h6 className="mt-4">Batsman</h6>
// //             <table className="table table-sm table-bordered mb-3">
            
// //               <thead className="table-light">
                
// //                 {/* <tr><th>Batsman Name</th><th>R</th><th>B</th><th>4s</th><th>6s</th></tr> */}
// //               </thead>
// //               <tbody>
// //                 {/* <tr><td>{getPlayerName(strikerId)}*</td><td>{strikerStats.runs}</td><td>4</td><td>0</td><td>0</td></tr>
// //                 <tr><td>{getPlayerName(nonStrikerId)}</td><td>24</td><td>7</td><td>1</td><td>1</td></tr> */}
// //               <Table striped bordered>
// //             <thead>
// //               <tr><th>Batsman Name</th><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th></tr>
// //             </thead>
// //             <tbody>
// //               <tr>
// //                 <td>{getPlayerName(strikerId)}*</td>
// //                 <td>{strikerStats.runs}</td>
// //                 <td>{strikerStats.balls}</td>
// //                 <td>{strikerStats.total4}</td>
// //                 <td>{strikerStats.total6}</td>
// //               </tr>
// //               <tr>
// //                 <td>{getPlayerName(nonStrikerId)}</td>
// //                 <td>{nonStrikerStats.runs}</td>
// //                 <td>{nonStrikerStats.balls}</td>
// //                 <td>{nonStrikerStats.total4}</td>
// //                 <td>{nonStrikerStats.total6}</td>
// //               </tr>
// //             </tbody>
// //           </Table>
// //               </tbody>
// //             </table>

// //             <h6>Bowler</h6>
// //             <table className="table table-sm table-bordered">
// //               <thead className="table-light">
// //                 {/* <tr><th>Name</th><th>O</th><th>M</th><th>R</th><th>W</th></tr> */}
// //               </thead>
// //               <Table striped bordered>
// //             <thead>
// //               <tr><th>Bowler Name</th><th>Overs</th><th>Runs</th><th>Wickets</th><th>Maidens</th></tr>
// //             </thead>
// //             <tbody>
// //               <tr>
// //                 <td>{getPlayerName(bowlerId)}*</td>
// //                 <td>{bowlerStats.overs}</td>
// //                 <td>{bowlerStats.runsConceded}</td>
// //                 <td>{bowlerStats.wickets}</td>
// //                 <td>{bowlerStats.maidens}</td>
// //               </tr>
// //             </tbody>
// //           </Table>
// //             </table>

// //             <div className="mt-3">
// //               <strong>24 Balls:</strong>
// //               <div className="d-flex flex-wrap gap-2 mt-1">
// //                 {['2','4','4wd','6','0','1','2','1'].map((b,i) => (
// //                   <span key={i} className="px-2 py-1 bg-light border rounded">{b}</span>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="mt-2">
// //               <strong>Extras:</strong> 5 (b 0, lb 0, wd 5, nb 0, p 0)
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
    
// //   );
// // };

// // export default CommentoryScoringPannel;


// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './CommentoryScoringPannel.css';
// import axios from 'axios';
// import { Button, Form, Table } from 'react-bootstrap';
// import { json } from 'stream/consumers';
// import { log } from 'console';

// interface Player {
//   _id: string;
//   name: string;
//   role: string;
// }

// interface Team {
//   _id: string;
//   name: string;
// }

// interface TeamWithPlayers extends Team {
//   players: Player[];
// }

// interface Match {
//   _id: string;
//   matchType: 'Test' | 'ODI' | 'T20';
//   team1: Team;
//   team2: Team;
// }

// const CommentoryScoringPannel: React.FC = () => {
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
//   const [loadingMatch, setLoadingMatch] = useState(true);
//   const [battingTeam, setBattingTeam] = useState<TeamWithPlayers | null>(null);
//   const [bowlingTeam, setBowlingTeam] = useState<TeamWithPlayers | null>(null);
//   const [strikerId, setStrikerId] = useState<string>('');
//   const [nonStrikerId, setNonStrikerId] = useState<string>('');
//   const [bowlerId, setBowlerId] = useState<string>('');
//   const [selectedRun, setSelectedRun] = useState<number | null>(null);
//   const [extras, setExtras] = useState({
//     noBall: false,
//     wide: false,
//     bye: false,
//     legbye: false,
//     overthrow: false,
//   });
//   const [wicket, setWicket] = useState(false);
//   const runColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
//   const [strikerStats, setStrikerStats] = useState<any>({});
//   const [nonStrikerStats, setNonStrikerStats] = useState<any>({});
//   const [bowlerStats, setBowlerStats] = useState<any>({});

//   const formatOvers = (overs: number) => {
//     const wholeOvers = Math.floor(overs);
//     const balls = Math.round((overs - wholeOvers) * 10);
//     return `${wholeOvers}.${balls}`;
//   };

//   const handleChangeInning = async () => {
//     if (!matches.length) return;

//     const matchId = matches[0]._id; // you can allow dynamic selection too
//     try {
//       const res = await axios.post('http://localhost:5000/api/cricket/match/changeInning', {
//         matchId
//       });
//       console.log('Inning changed:', res.data);
//       alert(`Inning changed to ${res.data.currentInning}`);
//     } catch (err) {
//       console.error('Error changing inning:', err);
//     }
//   };
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const res = await axios.get<Match[]>('http://localhost:5000/api/cricket/match');
//         setMatches(res.data);
//         const stored = localStorage.getItem('selectedMatch');
//         if (stored) {
//           const parsed: Match = JSON.parse(stored);
//           const found = res.data.find((m) => m._id === parsed._id);
//           if (found) setSelectedMatch(found);
//         }
//       } catch (err) {
//         console.error('Error fetching matches', err);
//       } finally {
//         setLoadingMatch(false);
//       }
//     };
//     fetchMatches();
//   }, []);

//   const fetchStats = async () => {
//     if (strikerId) {
//       const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
//         playerId: strikerId, status: 'batting'
//       });
//       setStrikerStats(res.data.battingStats);
//     }
//     if (nonStrikerId) {
//       const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
//         playerId: nonStrikerId, status: 'batting'
//       });
//       setNonStrikerStats(res.data.battingStats);
//     }
//     if (bowlerId) {
//       const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
//         playerId: bowlerId, status: 'bowling'
//       });
//       setBowlerStats(res.data.bowlingStats);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, [strikerId, nonStrikerId, bowlerId]);

//   useEffect(() => {
//     const matchId = selectedMatch?._id;
//     if (!matchId) return;
//     const fetchMatchPlayers = async () => {
//       try {
//         const response = await axios.post('http://localhost:5000/api/cricket/match/getMatchPlayers', { id: matchId });
//         setBattingTeam(response.data.battingTeam);
//         setBowlingTeam(response.data.bowlingTeam);
//       } catch (error) {
//         console.error("Error fetching players", error);
//       }
//     };
//     fetchMatchPlayers();
//   }, [selectedMatch]);

//   const handleMatchSelect = (matchId: string) => {
//     const match = matches.find((m) => m._id === matchId) || null;
//     setSelectedMatch(match);
//     if (match) localStorage.setItem('selectedMatch', JSON.stringify(match));
//     else localStorage.removeItem('selectedMatch');
//   };

//   const handleRunClick = (run: number) => setSelectedRun(run);
//   const toggleExtra = (type: keyof typeof extras) => setExtras((prev) => ({ ...prev, [type]: !prev[type] }));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const payload = {
//       run: selectedRun ?? 0,
//       extras,
//       wicket,
//       striker: strikerId,
//       nonStriker: nonStrikerId,
//       bowler: bowlerId
//     };
    
//     try {
//       const response = await axios.post('http://localhost:5000/api/cricket/team/updateBallData', payload);
//       if (payload.wicket === true) {
//         localStorage.removeItem('strikerId');
//       }
//       const { noBall, wide } = extras;

//       if (!noBall && !wide) {
//         let ballCount = parseInt(localStorage.getItem('ball') || "0", 10);
//         ballCount += 1;
//         if (ballCount >= 6) {
//           localStorage.removeItem('ball');
//           localStorage.removeItem('bowlerId');
//         } else {
//           localStorage.setItem('ball', ballCount.toString());
//         }
//       }
//       window.location.reload();
//     } catch (error) {
//       console.error("Error fetching players", error);
//     }
//     console.log('Submitted:', payload);
//     setSelectedRun(null);
//     setExtras({ noBall: false, wide: false, bye: false, legbye: false, overthrow: false });
//     setWicket(false);
//   };

//   const getPlayerName = (id: string) => {
//     const allPlayers = [...(battingTeam?.players || []), ...(bowlingTeam?.players || [])];
//     return allPlayers.find(p => p._id === id)?.name || '';
//   };
//   const [matchScore, setMatchScore] = useState<any>(null);

//   useEffect(() => {
//     const fetchMatchScore = async () => {
//       const matchdataString = localStorage.getItem('selectedMatch');
      
//       if (!matchdataString) return;
  
//       const matchdata = JSON.parse(matchdataString);
//       const id = matchdata?._id;
  
//       try {
//         const res = await axios.get(`http://localhost:5000/api/cricket/match/${id}`);
//         console.log("reddd",res.data);
        
//         setMatchScore(res.data);
//       } catch (err) {
//         console.error('Error fetching match details:', err);
//       }
//     };
  
//     fetchMatchScore();
//   }, []);
//   const [lstrikerId, setLstrikerId] = useState<string | null>(null);  // Explicitly typing it as string or null
//   const [lnonstrikerId, setLnonstrikerId] = useState<string | null>(null); // Explicitly typing it as string or null

//   useEffect(() => {
//     const strikerId = localStorage.getItem('strikerId');
//     if (strikerId) {
//       setStrikerId(strikerId); // Set strikerId from localStorage
//     }

//     const nonStrikerId = localStorage.getItem('nonStrikerId');
//     if (nonStrikerId) {
//       setNonStrikerId(nonStrikerId); // Set nonStrikerId from localStorage
//     }
//     const bowlerId = localStorage.getItem('bowlerId');
//     if (bowlerId) {
//       setBowlerId(bowlerId); // Set nonStrikerId from localStorage
//     }
//   }, []);
//   function ConfirmSelectedBatter(){
//     localStorage.setItem('strikerId',strikerId)
//     localStorage.setItem('nonStrikerId',nonStrikerId)
//   }
//   function ConfirmSelectedBaller(){
//     localStorage.setItem('bowlerId',bowlerId)
//     // localStorage.setItem('nonStrikerId',nonStrikerId)
//   }
//   const selectedStriker = getPlayerName(strikerId);
//   const selectedNonStriker = getPlayerName(nonStrikerId);
//   const selectedBowler = getPlayerName(bowlerId);

//   return (
//     <div className="container mt-5">
//       <h4 className="mb-4">Live Cricket Scoring Panel</h4>

//       <Form.Group controlId="matchSelect" className="mb-4">
//         <Form.Label>Select Match</Form.Label>
//         <Form.Control
//           as="select"
//           value={selectedMatch?._id || ''}
//           onChange={(e) => handleMatchSelect(e.target.value)}>
//           <option value="">-- Choose a match --</option>
//           {matches.map((m) => (
//             <option key={m._id} value={m._id}>
//               {m.team1.name} vs {m.team2.name} ({m.matchType})
//             </option>
//           ))}
//         </Form.Control>
//       </Form.Group>

//       {!loadingMatch && selectedMatch && (
//         <div className="alert alert-secondary">
//           <strong>Selected Match:</strong> {selectedMatch.team1.name} vs {selectedMatch.team2.name} — {selectedMatch.matchType}
//         </div>
//       )}
//       <Button onClick={handleChangeInning} disabled={ !matches.length}>
//         Change Inning
//       </Button>
//       <Button onClick={ConfirmSelectedBatter} disabled={ !matches.length}>
//         Confirm Selected Batter
//       </Button>
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4 bg-light p-3 rounded border">
//             <Form.Group className="mb-2">
//               {/* <Form.Label>Striker</Form.Label> */}
//               {strikerId && selectedStriker ? (
//         <p>Striker: {selectedStriker} *</p>
//       ) : (
//         nonStrikerId && (
//           <Form.Select value={strikerId || ''} onChange={(e) => setStrikerId(e.target.value)}>
//             <option value="">Select Striker</option>
//             {battingTeam?.players
//               .filter(p => p._id !== nonStrikerId) // Exclude non-striker from the list
//               .map(p => (
//                 <option key={p._id} value={p._id}>
//                   {p.name}
//                 </option>
//               ))}
//           </Form.Select>
//         )
//       )}
//             </Form.Group>
//             <Form.Group className="mb-2">
//   {nonStrikerId && selectedNonStriker ? (
//     <p>Non Striker: {selectedNonStriker} </p>
//   ) : (
//     <>
//       <Form.Label>Non-Striker</Form.Label>
//       <Form.Select value={nonStrikerId} onChange={(e) => setNonStrikerId(e.target.value)}>
//         <option value="">Select Non-Striker</option>
//         {battingTeam?.players
//           .filter((p) => p._id !== strikerId)
//           .map((p) => (
//             <option key={p._id} value={p._id}>
//               {p.name}
//             </option>
//         ))}
//       </Form.Select>
//     </>
//   )}
// </Form.Group>

// <Form.Group className="mb-2">
//   {/* <Form.Label>Bowler</Form.Label> */}
 
//   {selectedBowler ? (
//     <p>Bowler: {selectedBowler}</p>
//   ) : (
//     <Form.Select value={bowlerId} onChange={(e) => setBowlerId(e.target.value)}>
//       <option value="">Select Bowler</option>
//       {bowlingTeam?.players.map(p => (
//         <option key={p._id} value={p._id}>{p.name}</option>
//       ))}
//     </Form.Select>
//   )}
// </Form.Group>
// {/* <h3></h3> */}
// <Button 
//   onClick={ConfirmSelectedBaller} 
  
// >
//   Are you sure your bowler is this
// </Button>


//           </div>

//           <div className="mb-4">
//             <div className="d-flex flex-wrap gap-3 justify-content-center">
//               {[0, 1, 2, 3, 4, 5, 6].map((run, i) => (
//                 <button
//                   key={run}
//                   className={`btn run-btn btn-${runColors[i]} ${selectedRun === run ? 'active' : ''}`}
//                   onClick={() => handleRunClick(run)}>
//                   {run}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mb-4 d-flex flex-wrap gap-2">
//             <Button variant={extras.noBall ? 'warning' : 'outline-warning'} onClick={() => toggleExtra('noBall')}>No Ball</Button>
//             <Button variant={extras.wide ? 'warning' : 'outline-warning'} onClick={() => toggleExtra('wide')}>Wide</Button>
//             <Button variant={extras.bye ? 'info' : 'outline-info'} onClick={() => toggleExtra('bye')}>Bye</Button>
//             <Button variant={extras.legbye ? 'info' : 'outline-info'} onClick={() => toggleExtra('legbye')}>Leg Bye</Button>
//             <Button variant={extras.overthrow ? 'danger' : 'outline-danger'} onClick={() => toggleExtra('overthrow')}>Overthrow</Button>
//             <Button variant={wicket ? 'dark' : 'outline-dark'} onClick={() => setWicket(!wicket)}>Wicket</Button>
//           </div>

//           <Button variant="success" className="w-100" onClick={handleSubmit}>New Ball</Button>
//         </div>

//         <div className="col-md-6">
//           <div className="bg-white p-4 border rounded shadow-sm">
            
//             <div>
//             <div className="d-flex justify-content-between mb-2">
//   <div>
//     <strong>{matchScore?.team1?.name}</strong>
//     <div>{matchScore?.team1?.totalRuns} / {matchScore?.team1?.totalWickets}</div>
//     {/* <small>Over {parseFloat(matchScore?.team1?.overs || 0).toFixed(1)}</small> */}
//     {/* <small>Over {(((matchScore?.team1?.overs).toFixed(1))/0.6).toFixed(1)}</small> */}
//     {/* <small>Over {(((matchScore?.team1?.overs).toFixed(1))/0.6).toFixed(1)}</small> */}

//   </div>
//   <span>vs</span>
//   <div>
//     <strong>{matchScore?.team2?.name}</strong>
//     <div>{matchScore?.team2?.totalRuns} / {matchScore?.team2?.totalWickets}</div>
  
//     {/* <small>Over {(((matchScore?.team2?.overs).toFixed(1))/0.6).toFixed(1)}</small> */}

    


//   </div>
// </div>

//             </div>
            

//             <h6 className="mt-4">Batsman</h6>
//             <table className="table table-sm table-bordered mb-3">
            
//               <thead className="table-light">
                
//                 {/* <tr><th>Batsman Name</th><th>R</th><th>B</th><th>4s</th><th>6s</th></tr> */}
//               </thead>
//               <tbody>
//                 {/* <tr><td>{getPlayerName(strikerId)}*</td><td>{strikerStats.runs}</td><td>4</td><td>0</td><td>0</td></tr>
//                 <tr><td>{getPlayerName(nonStrikerId)}</td><td>24</td><td>7</td><td>1</td><td>1</td></tr> */}
//               <Table striped bordered>
//             <thead>
//               <tr><th>Batsman Name</th><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th></tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{getPlayerName(strikerId)}*</td>
//                 <td>{strikerStats.runs}</td>
//                 <td>{strikerStats.balls}</td>
//                 <td>{strikerStats.total4}</td>
//                 <td>{strikerStats.total6}</td>
//               </tr>
//               <tr>
//                 <td>{getPlayerName(nonStrikerId)}</td>
//                 <td>{nonStrikerStats.runs}</td>
//                 <td>{nonStrikerStats.balls}</td>
//                 <td>{nonStrikerStats.total4}</td>
//                 <td>{nonStrikerStats.total6}</td>
//               </tr>
//             </tbody>
//           </Table>
//               </tbody>
//             </table>

//             <h6>Bowler</h6>
//             <table className="table table-sm table-bordered">
//               <thead className="table-light">
//                 {/* <tr><th>Name</th><th>O</th><th>M</th><th>R</th><th>W</th></tr> */}
//               </thead>
//               <Table striped bordered>
//             <thead>
//               <tr><th>Bowler Name</th><th>Overs</th><th>Runs</th><th>Wickets</th><th>Maidens</th></tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{getPlayerName(bowlerId)}*</td>
//                 <td>{bowlerStats.overs}</td>
//                 <td>{bowlerStats.runsConceded}</td>
//                 <td>{bowlerStats.wickets}</td>
//                 <td>{bowlerStats.maidens}</td>
//               </tr>
//             </tbody>
//           </Table>
//             </table>

//             <div className="mt-3">
//               <strong>24 Balls:</strong>
//               <div className="d-flex flex-wrap gap-2 mt-1">
//                 {['2','4','4wd','6','0','1','2','1'].map((b,i) => (
//                   <span key={i} className="px-2 py-1 bg-light border rounded">{b}</span>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-2">
//               <strong>Extras:</strong> 5 (b 0, lb 0, wd 5, nb 0, p 0)
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
    
//   );
// };

// export default CommentoryScoringPannel;




import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Form, Table, Card, Badge, Row, Col, Container } from 'react-bootstrap';

interface Player {
  _id: string;
  name: string;
  role: string;
}

interface Team {
  _id: string;
  name: string;
}

interface TeamWithPlayers extends Team {
  players: Player[];
}

interface Match {
  _id: string;
  matchType: 'Test' | 'ODI' | 'T20';
  team1: Team;
  team2: Team;
}

const CommentoryScoringPanel: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [loadingMatch, setLoadingMatch] = useState(true);
  const [battingTeam, setBattingTeam] = useState<TeamWithPlayers | null>(null);
  const [bowlingTeam, setBowlingTeam] = useState<TeamWithPlayers | null>(null);
  const [strikerId, setStrikerId] = useState<string>('');
  const [nonStrikerId, setNonStrikerId] = useState<string>('');
  const [bowlerId, setBowlerId] = useState<string>('');
  const [selectedRun, setSelectedRun] = useState<number | null>(null);
  const [extras, setExtras] = useState({
    noBall: false,
    wide: false,
    bye: false,
    legbye: false,
    overthrow: false,
  });
  const [wicket, setWicket] = useState(false);
  const [strikerStats, setStrikerStats] = useState<any>({});
  const [nonStrikerStats, setNonStrikerStats] = useState<any>({});
  const [bowlerStats, setBowlerStats] = useState<any>({});
  const [matchScore, setMatchScore] = useState<any>(null);
  const [recentBalls, setRecentBalls] = useState<string[]>(['2', '4', '4wd', '6', '0', '1', '2', '1']);

  const runColors = [
    { bg: '#e9ecef', text: '#495057' }, // 0 runs - light gray
    { bg: '#cfe2ff', text: '#0d6efd' }, // 1 run - light blue
    { bg: '#d1e7dd', text: '#198754' }, // 2 runs - light green
    { bg: '#f8d7da', text: '#dc3545' }, // 3 runs - light red
    { bg: '#fff3cd', text: '#ffc107' }, // 4 runs - light yellow
    { bg: '#e2d9f3', text: '#6f42c1' }, // 5 runs - light purple
    { bg: '#cff4fc', text: '#0dcaf0' }, // 6 runs - light cyan
  ];

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get<Match[]>('http://localhost:5000/api/cricket/match');
        setMatches(res.data);
        const stored = localStorage.getItem('selectedMatch');
        if (stored) {
          const parsed: Match = JSON.parse(stored);
          const found = res.data.find((m) => m._id === parsed._id);
          if (found) setSelectedMatch(found);
        }
      } catch (err) {
        console.error('Error fetching matches', err);
      } finally {
        setLoadingMatch(false);
      }
    };
    fetchMatches();
  }, []);

  const fetchStats = async () => {
    if (strikerId) {
      try {
        const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
          playerId: strikerId, status: 'batting'
        });
        setStrikerStats(res.data.battingStats);
      } catch (err) {
        console.error('Error fetching striker stats', err);
      }
    }
    if (nonStrikerId) {
      try {
        const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
          playerId: nonStrikerId, status: 'batting'
        });
        setNonStrikerStats(res.data.battingStats);
      } catch (err) {
        console.error('Error fetching non-striker stats', err);
      }
    }
    if (bowlerId) {
      try {
        const res = await axios.post('http://localhost:5000/api/cricket/getPlayerPerformance', {
          playerId: bowlerId, status: 'bowling'
        });
        setBowlerStats(res.data.bowlingStats);
      } catch (err) {
        console.error('Error fetching bowler stats', err);
      }
    }
  };

  useEffect(() => {
    fetchStats();
  }, [strikerId, nonStrikerId, bowlerId]);

  useEffect(() => {
    const matchId = selectedMatch?._id;
    if (!matchId) return;
    const fetchMatchPlayers = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/cricket/match/getMatchPlayers', { id: matchId });
        setBattingTeam(response.data.battingTeam);
        setBowlingTeam(response.data.bowlingTeam);
      } catch (error) {
        console.error("Error fetching players", error);
      }
    };
    fetchMatchPlayers();
  }, [selectedMatch]);

  useEffect(() => {
    const fetchMatchScore = async () => {
      const matchdataString = localStorage.getItem('selectedMatch');
      
      if (!matchdataString) return;
  
      const matchdata = JSON.parse(matchdataString);
      const id = matchdata?._id;
  
      try {
        const res = await axios.get(`http://localhost:5000/api/cricket/match/${id}`);
        setMatchScore(res.data);
      } catch (err) {
        console.error('Error fetching match details:', err);
      }
    };
  
    fetchMatchScore();
  }, []);

  useEffect(() => {
    const strikerId = localStorage.getItem('strikerId');
    if (strikerId) {
      setStrikerId(strikerId);
    }

    const nonStrikerId = localStorage.getItem('nonStrikerId');
    if (nonStrikerId) {
      setNonStrikerId(nonStrikerId);
    }
    
    const bowlerId = localStorage.getItem('bowlerId');
    if (bowlerId) {
      setBowlerId(bowlerId);
    }
  }, []);

  const handleMatchSelect = (matchId: string) => {
    const match = matches.find((m) => m._id === matchId) || null;
    setSelectedMatch(match);
    if (match) localStorage.setItem('selectedMatch', JSON.stringify(match));
    else localStorage.removeItem('selectedMatch');
  };

  const handleRunClick = (run: number) => setSelectedRun(run);
  const toggleExtra = (type: keyof typeof extras) => setExtras((prev) => ({ ...prev, [type]: !prev[type] }));

  const handleChangeInning = async () => {
    if (!matches.length) return;

    const matchId = matches[0]._id;
    try {
      const res = await axios.post('http://localhost:5000/api/cricket/match/changeInning', {
        matchId
      });
      console.log('Inning changed:', res.data);
      alert(`Inning changed to ${res.data.currentInning}`);
    } catch (err) {
      console.error('Error changing inning:', err);
    }
  };

  function confirmSelectedBatter() {
    localStorage.setItem('strikerId', strikerId);
    localStorage.setItem('nonStrikerId', nonStrikerId);
  }

  function confirmSelectedBowler() {
    localStorage.setItem('bowlerId', bowlerId);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      run: selectedRun ?? 0,
      extras,
      wicket,
      striker: strikerId,
      nonStriker: nonStrikerId,
      bowler: bowlerId
    };
    
    try {
      const response = await axios.post('http://localhost:5000/api/cricket/team/updateBallData', payload);
      if (payload.wicket === true) {
        localStorage.removeItem('strikerId');
      }
      const { noBall, wide } = extras;

      if (!noBall && !wide) {
        let ballCount = parseInt(localStorage.getItem('ball') || "0", 10);
        ballCount += 1;
        if (ballCount >= 6) {
          localStorage.removeItem('ball');
          localStorage.removeItem('bowlerId');
        } else {
          localStorage.setItem('ball', ballCount.toString());
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error updating ball data", error);
    }
    console.log('Submitted:', payload);
    setSelectedRun(null);
    setExtras({ noBall: false, wide: false, bye: false, legbye: false, overthrow: false });
    setWicket(false);
  };

  const getPlayerName = (id: string) => {
    const allPlayers = [...(battingTeam?.players || []), ...(bowlingTeam?.players || [])];
    return allPlayers.find(p => p._id === id)?.name || '';
  };

  const formatOvers = (overs: number) => {
    if (!overs && overs !== 0) return "0.0";
    const wholeOvers = Math.floor(overs);
    const balls = Math.round((overs - wholeOvers) * 10);
    return `${wholeOvers}.${balls}`;
  };

  const selectedStriker = getPlayerName(strikerId);
  const selectedNonStriker = getPlayerName(nonStrikerId);
  const selectedBowler = getPlayerName(bowlerId);

  const calculateExtras = () => {
    // Placeholder for actual calculation
    return {
      byes: 0,
      legByes: 0,
      wides: 5,
      noBalls: 0,
      penalties: 0,
      total: 5
    };
  };

  const extrasData = calculateExtras();

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-primary text-white py-3">
              <h4 className="mb-0">Live Cricket Scoring Panel</h4>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={8}>
                  <Form.Group controlId="matchSelect">
                    <Form.Label className="fw-bold">Select Match</Form.Label>
                    <Form.Select 
                      value={selectedMatch?._id || ''}
                      onChange={(e) => handleMatchSelect(e.target.value)}
                      className="form-control-lg"
                    >
                      <option value="">-- Choose a match --</option>
                      {matches.map((m) => (
                        <option key={m._id} value={m._id}>
                          {m.team1.name} vs {m.team2.name} ({m.matchType})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button 
                    variant="outline-primary" 
                    onClick={handleChangeInning} 
                    disabled={!matches.length}
                    className="me-2 w-100"
                  >
                    Change Inning
                  </Button>
                </Col>
              </Row>

              {!loadingMatch && selectedMatch && (
                <div className="alert alert-info mb-4">
                  <strong>Selected Match:</strong> {selectedMatch.team1.name} vs {selectedMatch.team2.name} — {selectedMatch.matchType}
                </div>
              )}

              {matchScore && (
                <Card className="mb-4 border-0 shadow-sm">
                  <Card.Header className="bg-dark text-white">
                    <h5 className="mb-0">Match Summary</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Row className="g-0">
                      <Col md={5} className="p-3 text-center border-end">
                        <h6 className="fw-bold">{matchScore?.team1?.name}</h6>
                        <h2 className="mb-0">{matchScore?.team1?.totalRuns} / {matchScore?.team1?.totalWickets}</h2>
                        <small className="text-muted">Overs: {formatOvers(matchScore?.team1?.overs || 0)}</small>
                      </Col>
                      <Col md={2} className="d-flex justify-content-center align-items-center">
                        <Badge bg="secondary" className="px-3 py-2">VS</Badge>
                      </Col>
                      <Col md={5} className="p-3 text-center">
                        <h6 className="fw-bold">{matchScore?.team2?.name}</h6>
                        <h2 className="mb-0">{matchScore?.team2?.totalRuns} / {matchScore?.team2?.totalWickets}</h2>
                        <small className="text-muted">Overs: {formatOvers(matchScore?.team2?.overs || 0)}</small>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}

              <Row>
                <Col md={5}>
                  <Card className="mb-4 border-0 shadow-sm">
                    <Card.Header className="bg-success text-white">
                      <h5 className="mb-0">Player Selection</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          {strikerId && selectedStriker ? (
                            <div className="d-flex align-items-center mb-2">
                              <div className="me-2 bg-success text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <div>
                                <div className="fw-bold">Striker</div>
                                <div>{selectedStriker} <Badge bg="warning" text="dark">On Strike</Badge></div>
                              </div>
                            </div>
                          ) : (
                            nonStrikerId && (
                              <>
                                <Form.Label>Select Striker</Form.Label>
                                <Form.Select value={strikerId || ''} onChange={(e) => setStrikerId(e.target.value)}>
                                  <option value="">Select Striker</option>
                                  {battingTeam?.players
                                    .filter(p => p._id !== nonStrikerId)
                                    .map(p => (
                                      <option key={p._id} value={p._id}>
                                        {p.name}
                                      </option>
                                    ))}
                                </Form.Select>
                              </>
                            )
                          )}
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          {nonStrikerId && selectedNonStriker ? (
                            <div className="d-flex align-items-center mb-2">
                              <div className="me-2 bg-secondary text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <div>
                                <div className="fw-bold">Non-Striker</div>
                                <div>{selectedNonStriker}</div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Form.Label>Select Non-Striker</Form.Label>
                              <Form.Select value={nonStrikerId || ''} onChange={(e) => setNonStrikerId(e.target.value)}>
                                <option value="">Select Non-Striker</option>
                                {battingTeam?.players
                                  .filter((p) => p._id !== strikerId)
                                  .map((p) => (
                                    <option key={p._id} value={p._id}>
                                      {p.name}
                                    </option>
                                  ))}
                              </Form.Select>
                            </>
                          )}
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          {selectedBowler ? (
                            <div className="d-flex align-items-center mb-2">
                              <div className="me-2 bg-info text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <div>
                                <div className="fw-bold">Bowler</div>
                                <div>{selectedBowler}</div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Form.Label>Select Bowler</Form.Label>
                              <Form.Select value={bowlerId || ''} onChange={(e) => setBowlerId(e.target.value)}>
                                <option value="">Select Bowler</option>
                                {bowlingTeam?.players.map(p => (
                                  <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                              </Form.Select>
                            </>
                          )}
                        </Form.Group>

                        <div className="d-grid gap-2">
                          <Button variant="primary" onClick={confirmSelectedBatter} disabled={!strikerId || !nonStrikerId}>
                            Confirm Batters
                          </Button>
                          <Button variant="outline-primary" onClick={confirmSelectedBowler} disabled={!bowlerId}>
                            Confirm Bowler
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={7}>
                  <Card className="mb-4 border-0 shadow-sm">
                    <Card.Header className="bg-primary text-white">
                      <h5 className="mb-0">Run Entry</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                        {[0, 1, 2, 3, 4, 5, 6].map((run, i) => (
                          <Button
                            key={run}
                            style={{ 
                              backgroundColor: selectedRun === run ? runColors[i].bg : 'white',
                              color: runColors[i].text,
                              border: `2px solid ${runColors[i].bg}`,
                              width: '60px',
                              height: '60px',
                              borderRadius: '50%',
                              fontSize: '1.5rem',
                              fontWeight: 'bold'
                            }}
                            onClick={() => handleRunClick(run)}
                            className="d-flex align-items-center justify-content-center shadow-sm"
                          >
                            {run}
                          </Button>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h6 className="text-muted mb-2">Extras</h6>
                        <div className="d-flex flex-wrap gap-2">
                          <Button size="sm" variant={extras.noBall ? 'warning' : 'outline-warning'} onClick={() => toggleExtra('noBall')}>
                            No Ball
                          </Button>
                          <Button size="sm" variant={extras.wide ? 'warning' : 'outline-warning'} onClick={() => toggleExtra('wide')}>
                            Wide
                          </Button>
                          <Button size="sm" variant={extras.bye ? 'info' : 'outline-info'} onClick={() => toggleExtra('bye')}>
                            Bye
                          </Button>
                          <Button size="sm" variant={extras.legbye ? 'info' : 'outline-info'} onClick={() => toggleExtra('legbye')}>
                            Leg Bye
                          </Button>
                          <Button size="sm" variant={extras.overthrow ? 'danger' : 'outline-danger'} onClick={() => toggleExtra('overthrow')}>
                            Overthrow
                          </Button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Button 
                          variant={wicket ? 'danger' : 'outline-danger'} 
                          onClick={() => setWicket(!wicket)}
                          className="w-100 py-2"
                        >
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          {wicket ? 'Wicket Taken' : 'Wicket'}
                        </Button>
                      </div>

                      <div className="d-grid">
                        <Button 
                          variant="success" 
                          size="lg" 
                          className="py-3" 
                          onClick={handleSubmit}
                          disabled={!strikerId || !nonStrikerId || !bowlerId}
                        >
                          <i className="bi bi-arrow-right-circle me-2"></i>
                          Submit Ball
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-info text-white">
                      <h5 className="mb-0">Current Stats</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <h6 className="border-bottom pb-2 mb-3">Batsmen</h6>
                          <Table responsive striped bordered hover size="sm" className="mb-4">
                            <thead className="bg-light">
                              <tr>
                                <th>Batsman</th>
                                <th>R</th>
                                <th>B</th>
                                <th>4s</th>
                                <th>6s</th>
                                <th>SR</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="fw-bold">
                                <td>{getPlayerName(strikerId)}*</td>
                                <td>{strikerStats.runs || 0}</td>
                                <td>{strikerStats.balls || 0}</td>
                                <td>{strikerStats.total4 || 0}</td>
                                <td>{strikerStats.total6 || 0}</td>
                                <td>
                                  {strikerStats.balls ? ((strikerStats.runs / strikerStats.balls) * 100).toFixed(1) : "0.0"}
                                </td>
                              </tr>
                              <tr>
                                <td>{getPlayerName(nonStrikerId)}</td>
                                <td>{nonStrikerStats.runs || 0}</td>
                                <td>{nonStrikerStats.balls || 0}</td>
                                <td>{nonStrikerStats.total4 || 0}</td>
                                <td>{nonStrikerStats.total6 || 0}</td>
                                <td>
                                  {nonStrikerStats.balls ? ((nonStrikerStats.runs / nonStrikerStats.balls) * 100).toFixed(1) : "0.0"}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                        
                        <Col md={6}>
                          <h6 className="border-bottom pb-2 mb-3">Bowler</h6>
                          <Table responsive striped bordered hover size="sm" className="mb-4">
                            <thead className="bg-light">
                              <tr>
                                <th>Bowler</th>
                                <th>O</th>
                                <th>R</th>
                                <th>W</th>
                                <th>M</th>
                                <th>Econ</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{getPlayerName(bowlerId)}</td>
                                <td>{bowlerStats.overs || "0.0"}</td>
                                <td>{bowlerStats.runsConceded || 0}</td>
                                <td>{bowlerStats.wickets || 0}</td>
                                <td>{bowlerStats.maidens || 0}</td>
                                <td>
                                  {bowlerStats.overs && parseFloat(bowlerStats.overs) > 0
                                    ? (bowlerStats.runsConceded / parseFloat(bowlerStats.overs)).toFixed(1)
                                    : "0.0"}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="border-bottom pb-2 mb-2">Recent Balls</h6>
                              <div className="d-flex flex-wrap gap-2">
                                {recentBalls.map((ball, i) => {
                                  let bgColor = 'bg-light';
                                  let textColor = 'text-dark';
                                  
                                  if (ball.includes('wd')) {
                                    bgColor = 'bg-warning bg-opacity-25';
                                    textColor = 'text-dark';
                                  } else if (ball === '4') {
                                    bgColor = 'bg-success bg-opacity-25';
                                    textColor = 'text-success';
                                  } else if (ball === '6') {
                                    bgColor = 'bg-primary bg-opacity-25';
                                    textColor = 'text-primary';
                                  } else if (ball === 'W') {
                                    bgColor = 'bg-danger bg-opacity-25';
                                    textColor = 'text-danger';
                                  }
                                  
                                  return (
                                    <span 
                                      key={i} 
                                      className={`${bgColor} ${textColor} rounded-circle d-flex align-items-center justify-content-center`}
                                      style={{ width: '32px', height: '32px', fontSize: '0.9rem', fontWeight: 'bold' }}
                                    >
                                      {ball}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                            
                            <div>
                              <h6 className="border-bottom pb-2 mb-2">Extras</h6>
                              <div className="text-muted">
                                <small>
                                  Total: {extrasData.total} (b {extrasData.byes}, lb {extrasData.legByes}, 
                                  wd {extrasData.wides}, nb {extrasData.noBalls}, p {extrasData.penalties})
                                </small>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CommentoryScoringPanel;