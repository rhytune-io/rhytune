import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication endpoints for backend use only, not to be consumed directly by the frontend.
 */


/**
 * @swagger
 * /auth/github:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Redirects to GitHub authentication page.
 *     description: Initiates the GitHub OAuth flow.
 *     responses:
 *       302:
 *         description: Redirected to GitHub for authentication.
 */
authRouter.get('/auth/github',
    passport.authenticate('github'));

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: GitHub authentication callback URL.
 *     description: Handles the callback from GitHub OAuth flow.
 *     responses:
 *       200:
 *         description: Authentication successful, redirected to the home page.
 *       401:
 *         description: Authentication failed, redirected to the login page.
 */
authRouter.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

export default authRouter;
