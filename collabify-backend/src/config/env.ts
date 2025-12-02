import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/collabify',
  jwtSecret: (process.env.JWT_SECRET as any) || 'supersecret',
  ACCESS_TOKEN_EXPIRES_IN:
    (process.env.ACCESS_TOKEN_EXPIRES_IN as any) || '15m',
  REFRESH_TOKEN_EXPIRES_IN:
    (process.env.REFRESH_TOKEN_EXPIRES_IN as any) || '7d',
  redisURI: process.env.REDIS_URI || 'redis://localhost:6379',
};

for (const [key, value] of Object.entries(env)) {
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
}

export { env };
