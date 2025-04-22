const Blague = require("../models/joke.model");
const { Sequelize } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - question
 *         - response
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant auto-généré de la blague.
 *         question:
 *           type: string
 *           description: La question ou la première partie de la blague.
 *         response:
 *           type: string
 *           description: La réponse ou la chute de la blague.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La date de création de la blague.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière mise à jour de la blague.
 *       example:
 *         id: 1
 *         question: "Qu'est-ce qu'un chat qui fait de la musique ?"
 *         response: "Un matouzikien"
 *         createdAt: "2024-01-10T10:30:00Z"
 *         updatedAt: "2024-01-10T10:30:00Z"
 *     NewJoke:
 *        type: object
 *        required:
 *          - question
 *          - response
 *        properties:
 *          question:
 *            type: string
 *            description: La question ou la première partie de la blague.
 *          response:
 *            type: string
 *            description: La réponse ou la chute de la blague.
 *        example:
 *          question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *          response: "Parce que sinon ils tombent dans le bateau."
 */

/**
 * @openapi
 * /jokes:
 *   post:
 *     tags: [Jokes]
 *     summary: Créer une nouvelle blague
 *     description: Ajoute une nouvelle blague à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewJoke'
 *     responses:
 *       200:
 *         description: La blague a été créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       400:
 *         description: Données invalides (question ou réponse manquante).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La question et la réponse ne peuvent pas être vides!"
 *       500:
 *         description: Erreur serveur lors de la création.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors de la création de la blague."
 */
exports.createdJoke = async (req, res) => {
    try {
        const { question, response } = req.body;

        // Validation
        if (!question || !response) {
            return res.status(400).json({
                message: "La question et la réponse ne peuvent pas être vides!"
            });
        }

        const joke = await Blague.create({
            question,
            response
        });

        res.status(200).json(joke);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Une erreur s'est produite lors de la création de la blague."
        });
    }
};

/**
 * @openapi
 * /jokes/{id}:
 *   get:
 *     tags: [Jokes]
 *     summary: Récupérer une blague par son ID
 *     description: Retourne les détails d'une blague spécifique en utilisant son identifiant unique.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID numérique de la blague à récupérer.
 *     responses:
 *       200:
 *         description: Détails de la blague demandée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Blague non trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blague avec l'ID 999 non trouvée."
 *       500:
 *         description: Erreur serveur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors de la récupération de la blague."
 */
exports.getJokeById = async (req, res) => {
    try {
        const id = req.params.id;

        const blague = await Blague.findByPk(id); // ✅ méthode Sequelize pour récupérer par ID primaire

        if (blague) {
            res.json(blague);
        } else {
            res.status(404).json({
                message: `Blague avec l'ID ${id} non trouvée.`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Une erreur s'est produite lors de la récupération de la blague."
        });
    }
};

/**
 * @openapi
 * /jokes:
 *   get:
 *     tags: [Jokes]
 *     summary: Récupérer toutes les blagues
 *     description: Retourne une liste de toutes les blagues disponibles dans la base de données.
 *     responses:
 *       200:
 *         description: Une liste de blagues.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Erreur serveur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors de la récupération des blagues."
 */
exports.getAllJokes = async (req, res) => {
    try {
        const jokes = await Blague.findAll();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Une erreur s'est produite lors de la récupération des blagues."
        });
    }
}

/**
 * @openapi
 * /jokes/random:
 *   get:
 *     tags: [Jokes]
 *     summary: Récupérer une blague aléatoire
 *     description: Retourne une blague choisie au hasard parmi toutes les blagues disponibles.
 *     responses:
 *       200:
 *         description: Une blague aléatoire.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Aucune blague trouvée dans la base de données.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune blague disponible."
 *       500:
 *         description: Erreur serveur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors de la récupération d'une blague aléatoire."
 */
exports.getRandomJoke = async (req, res) => {
    try {
        const randomJoke = await Blague.findOne({
            order: Sequelize.literal('random()') // Attention: 'random()' peut varier selon le SGBD (SQLite, PostgreSQL, MySQL)
        });
        if (randomJoke) {
            res.json(randomJoke);
        } else {
            res.status(404).json({
                message: "Aucune blague disponible."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Une erreur s'est produite lors de la récupération d'une blague aléatoire."
        });
    }
}