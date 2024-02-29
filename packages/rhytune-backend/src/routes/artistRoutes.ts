// rhytune-backend/src/routes/artistRoutes.js

import express from 'express';
import Artist from '../models/artist.model'; // Adjust the path to match your project structure
const artistRouter = express.Router();

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
        const artist = new Artist(req.body);
        await artist.save();
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
