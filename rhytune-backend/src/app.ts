import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'; // If no types are available, consider using any or declare minimal custom types
import passport from 'passport';
import session from 'express-session';
import './auth';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const swaggerDocument = YAML.load('./swagger.yaml');

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello World!",
    });
});

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req: Request, res: Response) { // Added explicit types for req and res
        res.redirect('/');
    });

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
