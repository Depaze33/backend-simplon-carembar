const swageerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de blagues',
            version: '1.0.0',
            description: 'API de blagues'
        },
        contact: {
            name: 'Helly'
        },
        servers: [
            {
                url: 'https://backend-simplon-carembar.onrender.com'
            }
        ]
    },
    apis: ['./src/controller/*.js']
};
const specs = swageerJsDoc(options);
module.exports = specs;