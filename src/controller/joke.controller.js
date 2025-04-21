
const Blague = require("../models/joke.model");
const {Sequelize} = require("sequelize");

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

exports.getRandomJoke = async (req, res) => {
    try {
        const randomJoke = await Blague.findOne({
            order: Sequelize.literal('random()')
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