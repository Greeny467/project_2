const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Request extends Model {};

Request.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inviteChat_id: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Request',
    }
);

module.exports = Request;