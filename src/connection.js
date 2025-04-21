const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const dbFolder = 'db-sqlite';
const dbPath = path.join(dbFolder, 'main.db.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: console.log // Activez le logging pour voir les requêtes SQL
});

async function initializeDatabase() {
    try {
        console.log("Chemin de la base de données:", dbPath);
        console.log("Tentative de connexion à la base de données...");
        await sequelize.authenticate();
        console.log("Connexion établie");

        require('./models/joke.model');

        console.log("Synchronisation des modèles...");
        await sequelize.sync({ force: false });
        console.log("Modèles synchronisés");

        if (fs.existsSync(dbPath)) {
            console.log("Le fichier de base de données a été créé avec succès");
        } else {
            console.log("Le fichier de base de données n'a pas été créé");
        }

    } catch (err) {
        console.error("Erreur détaillée:", err);
        throw err;
    }
}

module.exports = {
    sequelize,
    initializeDatabase
};