// rhytune-backend/src/routes/albumRoutes.ts

import express from 'express';
import Album from '../models/album.model'; // Adjust the path to match your project structure
const albumRouter = express.Router();

/**
 * Routes outline:
 * - POST /albums: Create a new album
 * - GET /albums: List all albums
 * - GET /albums/{id}: Get a specific album by ID
 * - PATCH /albums/{id}: Update an album by ID
 * - DELETE /albums/{id}: Delete an album by ID
 */

/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Album management endpoints
 */

// Create Album
/**
 * @swagger
 * /albums:
 *   post:
 *     summary: Creates a new album
 *     tags: [Albums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Album'
 *     responses:
 *       201:
 *         description: The album was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       400:
 *         description: Bad request
 */
albumRouter.post('/', async (req, res) => {
    try {
        const album = new Album(req.body);
        await album.save();
        res.status(201).send(album);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all Albums
/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Lists all albums
 *     tags: [Albums]
 *     responses:
 *       200:
 *         description: A list of albums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Album'
 */
albumRouter.get('/', async (req, res) => {
    try {
        const albums = await Album.find({});
        res.send(albums);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get Album by ID
/**
 * @swagger
 * /albums/{id}:
 *   get:
 *     summary: Gets a specific album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The album ID
 *     responses:
 *       200:
 *         description: An album object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       404:
 *         description: Album not found
 */
albumRouter.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).send();
        }
        res.send(album);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Album
/**
 * @swagger
 * /albums/{id}:
 *   patch:
 *     summary: Updates an album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The album ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Album'
 *     responses:
 *       200:
 *         description: The album was updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Album not found
 */
albumRouter.patch('/:id', async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!album) {
            return res.status(404).send();
        }
        res.send(album);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Album
/**
 * @swagger
 * /albums/{id}:
 *   delete:
 *     summary: Deletes an album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The album ID
 *     responses:
 *       200:
 *         description: The album was deleted
 *       404:
 *         description: Album not found
 */
albumRouter.delete('/:id', async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id);
        if (!album) {
            return res.status(404).send();
        }
        res.send(album);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default albumRouter;
