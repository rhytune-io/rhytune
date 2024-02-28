import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Request } from 'express';
import User, { IUser } from './User'; // Ensure this path is correct

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: "http://localhost:3000/auth/github/callback",
    passReqToCallback: true
},
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
        try {
            const existingUser = await User.findByid(profile.id); // Adjusted to use findByid
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = await User.create({ id: profile.id, username: profile.username, githubId: profile.id }); // Ensure correct mapping
            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    }));


passport.serializeUser<string>((user: Express.User, done) => {
    process.nextTick(() => {
        // Assuming user.id exists based on the extended Express.User interface
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