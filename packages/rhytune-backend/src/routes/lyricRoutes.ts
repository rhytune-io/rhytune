import express from 'express';
import Lyric from '../models/lyric.model'; // Adjust the import path as necessary

const lyricsRouter = express.Router();

/**
 * Routes outline:
 * - POST /lyrics: Create a new lyric
 * - GET /lyrics: List all lyrics
 * - GET /lyrics/{id}: Get a specific lyric by ID
 * - PATCH /lyrics/{id}: Update a lyric by ID
 * - DELETE /lyrics/{id}: Delete a lyric by ID
 */

/**
 * @swagger
 * tags:
 *   name: Lyrics
 *   description: Lyrics management
 */

// Create Lyric
/**
 * @swagger
 * /lyrics:
 *   post:
 *     summary: Creates a new lyric
 *     tags: [Lyrics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lyric'
 *     responses:
 *       201:
 *         description: The lyric was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lyric'
 *       400:
 *         description: Bad request
 */
lyricsRouter.post('/', async (req, res) => {
    try {
        const lyric = new Lyric(req.body);
        await lyric.save();
        res.status(201).json(lyric);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Get all Lyrics
/**
 * @swagger
 * /lyrics:
 *   get:
 *     summary: Lists all lyrics
 *     tags: [Lyrics]
 *     responses:
 *       200:
 *         description: A list of lyrics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lyric'
 */
lyricsRouter.get('/', async (req, res) => {
    try {
        const lyrics = await Lyric.find();
        res.json(lyrics);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Get Lyric by ID
/**
 * @swagger
 * /lyrics/{id}:
 *   get:
 *     summary: Gets a specific lyric by ID
 *     tags: [Lyrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The lyric ID
 *     responses:
 *       200:
 *         description: A lyric object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lyric'
 *       404:
 *         description: Lyric not found
 */
lyricsRouter.get('/:id', async (req, res) => {
    try {
        const lyric = await Lyric.findById(req.params.id);
        if (!lyric) {
            return res.status(404).json({ message: 'Lyric not found' });
        }
        res.json(lyric);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Update Lyric
/**
 * @swagger
 * /lyrics/{id}:
 *   patch:
 *     summary: Updates a lyric by ID
 *     tags: [Lyrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The lyric ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lyric'
 *     responses:
 *       200:
 *         description: The lyric was updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Lyric not found
 */
lyricsRouter.patch('/:id', async (req, res) => {
    try {
        const lyric = await Lyric.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!lyric) {
            return res.status(404).json({ message: 'Lyric not found' });
        }
        res.json(lyric);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Delete Lyric
/**
 * @swagger
 * /lyrics/{id}:
 *   delete:
 *     summary: Deletes a lyric by ID
 *     tags: [Lyrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The lyric ID
 *     responses:
 *       200:
 *         description: The lyric was deleted
 *       404:
 *         description: Lyric not found
 */
lyricsRouter.delete('/:id', async (req, res) => {
    try {
        const lyric = await Lyric.findByIdAndDelete(req.params.id);
        if (!lyric) {
            return res.status(404).json({ message: 'Lyric not found' });
        }
        res.json({ message: 'Lyric deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default lyricsRouter;
