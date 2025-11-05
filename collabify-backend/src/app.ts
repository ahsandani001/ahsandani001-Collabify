import express, { Express } from 'express';
import cors from 'cors';
// import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import workspaceRoutes from './modules/workspace/workspace.routes';
import messageRoutes from './modules/message/message.routes';

const app: Express = express();

// Middleware
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/messages', messageRoutes);

export default app;
