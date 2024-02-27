import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./path/to/your/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// 配置Passport中间件和策略
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    // 你的身份验证逻辑
}));
