// rhytune-backend/src/routes/artistRoutes.js

import express from 'express';
import Artist from '../models/artist.model'; // Adjust the path to match your project structure
const artistRouter = express.Router();
import ArtistSong from '../models/artistSong.model';

/**
 * Routes outline:
 * - POST /artists: Create a new artist
 * - GET /artists: List all artists
 * - GET /artists/{id}: Get a specific artist by ID
 * - PATCH /artists/{id}: Update an artist by ID
 * - DELETE /artists/{id}: Delete an artist by ID
 */

/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: Artist management endpoints
 */

// Create Artist
/**
 * @swagger
 * /artists:
 *   post:
 *     summary: Creates a new artist
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *       201:
 *         description: The artist was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Bad request
 */
artistRouter.post('/', async (req, res) => {
    try {
        // 创建新的艺术家实例
        console.log('req.body:', req.body);
        const artist = new Artist({
            name: req.body.name,
            // 其他艺术家属性
        });
        await artist.save();
        console.log('artist:', artist);
        // 假设 Artist 和 Song 模型已经设置好了关系
        // 并且存在一个方法来关联艺术家和歌曲
        const songIds: string[] = req.body.songIds;
        if (songIds && songIds.length > 0) {
            console.log('songIds:', songIds);
            // 对每个歌曲ID，创建 ArtistSong 关系
            songIds.forEach(async (songId) => {
                // 这里的实现取决于你的 ArtistSong 模型具体是如何定义的
                // 以下是一个假设的实现
                const artistSong = new ArtistSong({
                    artistId: artist._id,
                    songId: songId
                });
                await artistSong.save();
            });
            console.log('ArtistSong relations created');
        }

        res.status(201).send(artist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all Artists
/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Lists all artists
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: A list of artists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 */
artistRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find({});
        res.send(artists);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get Artist by ID
/**
 * @swagger
 * /artists/{id}:
 *   get:
 *     summary: Gets a specific artist by ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The artist ID
 *     responses:
 *       200:
 *         description: An artist object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       404:
 *         description: Artist not found
 */
artistRouter.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).send();
        }
        res.send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Artist
/**
 * @swagger
 * /artists/{id}:
 *   patch:
 *     summary: Updates an artist by ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The artist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *       200:
 *         description: The artist was updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Artist not found
 */
artistRouter.patch('/:id', async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!artist) {
            return res.status(404).send();
        }
        res.send(artist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Artist
/**
 * @swagger
 * /artists/{id}:
 *   delete:
 *     summary: Deletes an artist by ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The artist ID
 *     responses:
 *       200:
 *         description: The artist was deleted
 *       404:
 *         description: Artist not found
 */
artistRouter.delete('/:id', async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            return res.status(404).send();
        }
        res.send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default artistRouter;
