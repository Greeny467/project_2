const sequelize = require('../config/connection');
const {User, Chat, Message, Request} = require('../models');

const userData = require('./userData.json');
const chatData = require('./chatData.json');
const messageData = require('./messageData.json');
const requestData = require('./requestData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    await Chat.bulkCreate(chatData, {
      individualHooks: true,
      returning: true,
    });
  
    await Message.bulkCreate(messageData, {
      individualHooks: true,
      returning: true,
    });

    await Request.bulkCreate(requestData, {
        individualHooks: true,
        returning: true,
      });
  
    process.exit(0);
  };
  
  seedDatabase();
  