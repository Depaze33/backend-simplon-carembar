
const express = require('express');
const cors = require('cors');
const { sequelize, initializeDatabase } = require('./connection');
const jokeRoutes = require('./routes/joke.routes');
const swaggerUI = require('swagger-ui-express');
const specs = require('../src/swagger/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'https://depaze33.github.io',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Origine de la requête:', origin);
            callback(null, true); // En développement, on accepte tout
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.sequelize = sequelize;

app.use('/api/jokes', jokeRoutes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur l\'API de blagues',
        documentation: '/api-docs',
        endpoints: {
            jokes: '/api/jokes'
        }
    });
});

app.use((err, req, res, next) => {
    console.error('Erreur:', err.stack);
    res.status(500).json({
        error: 'Une erreur est survenue',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Erreur interne du serveur'
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Route non trouvée',
        message: `La route ${req.originalUrl} n'existe pas`
    });
});

initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
            console.log(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(err => {
        console.error('Erreur critique lors de l\'initialisation:', err);
        process.exit(1);
    });
