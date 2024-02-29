import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './src/routes/authRoutes';
import userRoutes from './src/routes/userRoutes';
import artistRoutes from './src/routes/artistRoutes';
const cors = require('cors');

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/artists', artistRoutes);

// Swagger JS Doc 配置
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Rhytune API',
        version: '1.0.0',
        description: 'This is the API documentation for Rhytune.',
    },
    servers: [
        {
            url: 'http://localhost:8020/api/v1',
            description: 'Local server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // 注意: 根据你的目录结构修改路径
    apis: ['./src/routes/*.ts', './schemas.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

// 挂载Swagger UI并添加前缀
app.use('/api/v1/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log('See API docs at http://localhost:8020/api/v1/apidocs');

export default app;
