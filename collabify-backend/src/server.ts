import mongoose from 'mongoose';
import app from './app';
import { env } from './config/env';

const PORT = env.port || 5000;

mongoose
  .connect(env.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });