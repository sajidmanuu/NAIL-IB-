import Ball from '../models/ballModel.js';

// Add ball details
const addBallDetails = async (req, res) => {
  try {
    const ball = new Ball(req.body);
    await ball.save();
    res.status(201).json(ball);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  addBallDetails,
};
