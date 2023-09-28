const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class ChatUser extends Model {}

ChatUser.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      chat_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'chat',
          key: 'id'
        }
      }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'chatuser',
  }
);

module.exports = ChatUser;
