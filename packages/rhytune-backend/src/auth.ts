import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request } from 'express';
import User from './models/user.model'; // Ensure this path is correct
import { v4 as uuidv4 } from 'uuid';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: "http://localhost:3000/api/v1/auth/github/callback",
    passReqToCallback: true
},
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOrCreate(profile);
            return done(null, user);
        } catch (error) {
            // @ts-ignore
            return done(error);
        }
    }));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
    passReqToCallback: true
},
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOrCreate(profile);
            return done(null, user);
        } catch (error) {
            // @ts-ignore
            return done(error);
        }
    }));

passport.serializeUser<string>((user: Express.User, done) => {
    process.nextTick(() => {
        // Assuming user.id exists based on the extended Express.User interface
        // @ts-ignore
        done(null, user.id); // Serialize the user by id
    });
});

passport.deserializeUser(async (uuid: string, done) => {
    try {
        // Assuming findByid is an async function that returns a user object or null
        const user = await User.findByid(uuid);
        if (user) {
            done(null, user as Express.User); // User found, attach to req.user
        } else {
            done(null, false); // User not found, pass false
        }
    } catch (error) {
        done(error); // Pass any error
    }
});
