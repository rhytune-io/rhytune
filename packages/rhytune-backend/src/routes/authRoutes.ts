// authRoutes.ts

import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.get('/auth/github',
    passport.authenticate('github'));

authRouter.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

export default authRouter;
