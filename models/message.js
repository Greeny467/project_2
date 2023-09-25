const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {};

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        recipient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        chat_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'chat',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestatmps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'message',
    }
);

module.exports = Message;