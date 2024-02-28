// index.ts

import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './src/routes/authRoutes';
import userRoutes from './src/routes/userRoutes';

const app: Application = express();
const swaggerDocument = YAML.load('./src/swagger.yaml');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// 挂载认证相关路由并添加前缀
app.use('/api/v1/auth', authRoutes);

// 挂载用户相关路由并添加前缀
app.use('/api/v1/users', userRoutes);

// 挂载Swagger UI并添加前缀
app.use('/api/v1/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log('See API docs at http://localhost:8020/api/v1/apidocs');

export default app;
