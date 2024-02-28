// userRoutes.ts

import { Router, Request, Response } from 'express';
import User from '../models/user.model'; // 假设你的用户模型定义在这个文件中

const userRouter = Router();

userRouter.get('/github/:id', async (req: Request, res: Response) => {
    const githubId = req.params.id;
    try {
        const user = await User.findByGithubId(githubId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default userRouter;
