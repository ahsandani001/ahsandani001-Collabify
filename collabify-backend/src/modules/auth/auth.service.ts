import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import { Token } from './token.model';
import { env } from '../../config/env';

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, env.jwtSecret!, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, env.jwtSecret!, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  });
};

export const register = async (body: {
  name: string;
  email: string;
  password: string;
}) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Create new user
  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: hashedPassword,
  });

  // Generate Access Token
  const accessToken = generateAccessToken(newUser._id.toString());

  // Generate Refresh Token
  const refreshToken = generateRefreshToken(newUser._id.toString());

  // Create and save refresh token in DB
  await Token.create({
    userId: newUser._id,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // Return tokens
  return {
    newUser,
    accessToken,
    refreshToken,
  };
};

export const login = async (body: { email: string; password: string }) => {
  // Find user by email
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate Access Token
  const accessToken = generateAccessToken(user._id.toString());

  // Generate Refresh Token
  const refreshToken = generateRefreshToken(user._id.toString());

  // Update refresh token in DB
  await Token.findOneAndUpdate(
    { userId: user._id },
    {
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    { upsert: true, new: true }
  );

  // Return tokens
  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshToken = async (token: string) => {
  // Get token from DB
  const existingToken = await Token.findOne({ refreshToken: token });
  if (!existingToken) {
    throw new Error('Invalid refresh token');
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret!) as { userId: string };

    // Generate new Access Token
    const newAccessToken = generateAccessToken(decoded.userId);

    // Generate new Refresh Token
    const newRefreshToken = generateRefreshToken(decoded.userId);

    // Update refresh token in DB
    await Token.findOneAndUpdate(
      { userId: decoded.userId },
      {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      { new: true }
    );

    return {
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    throw new Error('Invalid refresh token OR expired');
  }
};
