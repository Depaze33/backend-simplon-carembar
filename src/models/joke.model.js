
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const Joke = sequelize.define('Joke', {
    question: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    response: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
});

module.exports = Joke;