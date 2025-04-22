
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const dbFolder = 'db-sqlite';
const dbPath = path.join(dbFolder, 'main.db.sqlite');


const initialJokes = require('../db-sqlite/joke.js');

if (!fs.existsSync(dbFolder)) {
    console.log("Création du dossier de base de données...");
    fs.mkdirSync(dbFolder, { recursive: true });
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false
});

async function insertJokes(Blague) {
    try {
        const count = await Blague.count();
        if (count === 0) {
            console.log('Insertion des blagues initiales...');
            await Blague.bulkCreate(initialJokes);
            console.log('Blagues insérées avec succès!');
        } else {
            console.log(`${count} blagues déjà présentes dans la base de données.`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'insertion des blagues:', error);
        throw error;
    }
}

async function initializeDatabase() {
    try {
        console.log("Chemin de la base de données:", dbPath);
        console.log("Tentative de connexion à la base de données...");
        await sequelize.authenticate();
        console.log("Connexion établie");

        // Import et initialisation du modèle
        const Blague = require('./models/joke.model');

        console.log("Synchronisation des modèles...");
        await sequelize.sync({ force: false });
        console.log("Modèles synchronisés");

        await insertJokes(Blague);

        if (fs.existsSync(dbPath)) {
            console.log("Base de données initialisée avec succès");
        } else {
            throw new Error("Erreur: Le fichier de base de données n'existe pas");
        }

    } catch (err) {
        console.error("Erreur lors de l'initialisation:", err);
        throw err;
    }
}

module.exports = {
    sequelize,
    initializeDatabase
};