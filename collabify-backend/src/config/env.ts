import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/collabify',
  jwtSecret: process.env.JWT_SECRET || 'supersecret',
  redisURI: process.env.REDIS_URI || 'redis://localhost:6379',
};
