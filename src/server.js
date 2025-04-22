// server.js
const express = require('express');
const cors = require('cors'); // Ajoutez cette ligne
const { sequelize, initializeDatabase } = require('./connection');
const jokeRoutes = require('./routes/joke.routes');
const swaggerUI = require('swagger-ui-express');
const specs = require('../src/swagger/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS
app.use(cors({
    origin: 'http://localhost:5173', // L'URL de votre front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares pour parser les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Met l'instance sequelize à disposition dans l'application
app.locals.sequelize = sequelize;

// Routes principales de l'API pour les blagues
// Modifiez cette ligne pour inclure /api dans le chemin
app.use('/api/jokes', jokeRoutes);

// Route pour la documentation Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Route racine simple
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API de blagues' });
});

initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erreur critique lors de l\'initialisation:', err);
        process.exit(1);
    });