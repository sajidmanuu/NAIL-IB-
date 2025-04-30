import mongoose from 'mongoose';

const connecdtDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/cricket-scoring', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
