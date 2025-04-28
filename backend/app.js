import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import cors from 'cors';
// import cricketRoutes from './routes/cricketRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import ballRoutes from './routes/ballRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/cricket', matchRoutes); // Match related routes
app.use('/api/cricket', playerRoutes); // Player related routes
app.use('/api/cricket', ballRoutes); // Ball related routes
app.use('/api/cricket', teamRoutes); // Team related routes

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
