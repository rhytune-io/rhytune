import { Router, Request, Response } from 'express';
import User from '../models/user.model'; // 假设你的用户模型定义在这个文件中

const userRouter = Router();

/**
 * Routes outline:
 * - GET /users: List all users
 * - GET /users/{id}: Get a specific user by ID
 * - GET /users/github/{githubId}: Get a specific user by GitHub ID
 * - POST /users/findOrCreate: Find or create a user
 */

/**
 * @swagger
 * /users/github/{githubId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by GitHub Id
 *     description: Retrieves a user based on their GitHub ID.
 *     parameters:
 *       - in: path
 *         name: githubId
 *         required: true
 *         schema:
 *           type: string
 *         description: GitHub ID of the user to retrieve.
 *         example: 5173244
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /users/findOrCreate:
 *   post:
 *     tags:
 *       - Users
 *     summary: Find or create a user
 *     description: Finds an existing user or creates a new one based on the provided profile information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User found or created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request if profile information is incomplete
 *       500:
 *         description: Internal Server Error
 */
userRouter.post('/findOrCreate', async (req: Request, res: Response) => {
    const profile = req.body; // 假设前端发送的数据符合我们的期望结构
    try {
        const user = await User.findOrCreate(profile);
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error creating or finding user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default userRouter;
