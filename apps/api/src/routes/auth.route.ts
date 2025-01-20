import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const user = Router();

// Register a new user
user.post('/register', AuthController.register);

// User login
user.post('/login', AuthController.login);

// Refresh token
user.post('/refresh-token', AuthController.refreshToken);

// who am I
user.get("/whoami",AuthController.whoami);

