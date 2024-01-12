const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../db');
const livre= sequelize.define('livre', {
    id_livre: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
   contenu_livre: {
        type: DataTypes.STRING
    },
    id_uti: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false,

});

livre.sync()
    .then(() => {
        console.log('Table créée avec succès.');
    })
    .catch((error) => {
        console.error('Erreur lors de la création de la table :', error);
    });
module.exports = livre;