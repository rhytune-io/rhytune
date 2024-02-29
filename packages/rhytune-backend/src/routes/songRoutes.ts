import express from 'express';
import Song from '../models/song.model'; // Adjust the import path as necessary
const songRouter = express.Router();

/**
 * Routes outline:
 * - POST /songs: Create a new song
 * - GET /songs: List all songs
 * - GET /songs/{id}: Get a specific song by ID
 * - PATCH /songs/{id}: Update a song by ID
 * - DELETE /songs/{id}: Delete a song by ID
 */

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Song management endpoints
 */

// Create Song
/**
 * @swagger
 * /songs:
 *   post:
 *     summary: Creates a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *     responses:
 *       201:
 *         description: The song was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       400:
 *         description: Bad request
 */
songRouter.post('/', async (req, res) => {
    try {
        const song = new Song(req.body);
        await song.save();
        res.status(201).json(song);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({ message: (error as Error).message });
    }
});


// Get all Songs
/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Lists all songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: A list of songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
songRouter.get('/', async (req, res) => {
    try {
        const songs = await Song.find().populate('artists.artistId').populate('albums.albumId').populate('lyrics').populate('relatedVersions').populate('editRecord');
        res.json(songs);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: (error as Error).message });
    }
});


// Get Song by ID
/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: Gets a specific song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The song ID
 *     responses:
 *       200:
 *         description: A song object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: Song not found
 */
songRouter.get('/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id).populate('artists.artistId').populate('albums.albumId').populate('lyrics').populate('relatedVersions').populate('editRecord');
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json(song);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: (error as Error).message });
    }
});


// Update Song
/**
 * @swagger
 * /songs/{id}:
 *   patch:
 *     summary: Updates a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The song ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *     responses:
 *       200:
 *         description: The song was updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Song not found
 */
songRouter.patch('/:id', async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('artists.artistId').populate('albums.albumId').populate('lyrics').populate('relatedVersions').populate('editRecord');
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json(song);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({ message: (error as Error).message });
    }
});


// Delete Song
/**
 * @swagger
 * /songs/{id}:
 *   delete:
 *     summary: Deletes a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The song ID
 *     responses:
 *       200:
 *         description: The song was deleted
 *       404:
 *         description: Song not found
 */
songRouter.delete('/:id', async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: (error as Error).message });
    }
});


export default songRouter;
