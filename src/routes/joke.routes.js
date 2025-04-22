
const express = require("express");
const router = express.Router();
const jokeController = require("../controller/joke.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID auto-généré de la blague
 *         content:
 *           type: string
 *           description: Le contenu de la blague
 *       example:
 *         id: 1
 *         content: Que fait un poussin de 200kg ? PIOU PIOU !
 */

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Crée une nouvelle blague
 *     tags: [Blagues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post("/", jokeController.createdJoke);

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: Une blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Aucune blague trouvée
 */
router.get("/random", jokeController.getRandomJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     tags: [Blagues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la blague
 *     responses:
 *       200:
 *         description: La blague trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Blague non trouvée
 */
router.get("/:id", jokeController.getJokeById);

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 */
router.get('/', jokeController.getAllJokes);

module.exports = router;