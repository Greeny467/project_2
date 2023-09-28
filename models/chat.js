const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Chat extends Model {}

Chat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'chat',
    }
);

module.exports = Chat;