import express from 'express';

import { handleSignUp, handleCreateUser, handleLogin, handleAuthenticated, handleLogout } from '../controllers/authController.js';
import authUsers from '../middlewares/authMiddleware.js';

const router = express.Router();

const authRoutes = (app) => {

    router.get('/signup/:email?', handleSignUp);
    router.post('/signup', handleCreateUser);
    router.post('/login', handleLogin);
    router.post('/auth/protected', authUsers, handleAuthenticated);
    // app.post('/login');
    router.post('/logout', handleLogout);

    return app.use('/auth', router);
}

export default authRoutes;