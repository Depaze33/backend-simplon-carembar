const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de blagues',
            version: '1.0.0',
            description: 'API permettant de gérer une collection de blagues'
        },
        contact: {
            name: 'Helly'
        },
        servers: [
            {
                url: 'https://backend-simplon-carembar.onrender.com',
                description: 'Serveur de production'
            },
            {
                url: 'http://localhost:3000',
                description: 'Serveur local'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/controller/*.js'] // Inclure les routes et les contrôleurs
};

const specs = swaggerJsDoc(options);
module.exports = specs;