// server.js
const express = require('express');
const { sequelize, initializeDatabase } = require('./connection');
const jokeRoutes = require('./routes/joke.routes');
const swaggerUI = require('swagger-ui-express');
const specs = require('../src/swagger/swagger'); // Assurez-vous que ce chemin est correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares pour parser les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Met l'instance sequelize à disposition dans l'application (si nécessaire ailleurs)
app.locals.sequelize = sequelize;

// Routes principales de l'API pour les blagues
app.use('/jokes', jokeRoutes);

// Route pour la documentation Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Route racine simple
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API de blagues' });
});

// Initialisation de la base de données et démarrage du serveur
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erreur critique lors de l\'initialisation:', err);
        process.exit(1); // Arrête l'application si la base de données ne peut être initialisée
    });