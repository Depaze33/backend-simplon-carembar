// server.js
const express = require('express');
const { Sequelize } = require('sequelize');
const jokeRoutes = require('./routes/joke.routes');
const { sequelize, initializeDatabase } = require('./connection'); // Modifiez cette ligne
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.sequelize = sequelize;

app.use('/jokes', jokeRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API de blagues' });
});

// Initialisez la base de données avant de démarrer le serveur
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erreur lors de l\'initialisation de la base de données:', err);
        process.exit(1); // Arrêter le processus en cas d'erreur
    });