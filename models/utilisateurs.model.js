const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../db');
const utilisateur= sequelize.define('utilisateur', {
    id_uti: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pseudo_uti: {
        type: DataTypes.STRING
    },
    admin_uti: {
        type: DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
utilisateur.sync()
    .then(() => {
        console.log('Table créée avec succès.');
    })
    .catch((error) => {
        console.error('Erreur lors de la création de la table :', error);
    });
module.exports = utilisateur;