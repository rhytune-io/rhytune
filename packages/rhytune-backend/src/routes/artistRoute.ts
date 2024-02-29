// rhytune-backend/src/routes/artistRoutes.js

const express = require('express');
const Artist = require('../models/artist.model'); // 调整路径以匹配你的项目结构
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: Artist management
 */

// 创建Artist

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

router.post('/', async (req, res) => {
    try {
        const artist = new Artist(req.body);
        await artist.save();
        res.status(201).send(artist);
    } catch (error) {
        res.status(400).send(error);
    }
});


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


// 获取所有Artist
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find({});
        res.send(artists);
    } catch (error) {
        res.status(500).send(error);
    }
});


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


// 根据ID获取Artist
router.get('/:id', async (req, res) => {
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


// 更新Artist
router.patch('/:id', async (req, res) => {
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


// 删除Artist
router.delete('/:id', async (req, res) => {
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

module.exports = router;
