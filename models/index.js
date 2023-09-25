//Import models
const User = require('./user');
const Chat = require('./chat');
const Message = require('./message');
const Request = require('./request');

// Each chat belongs to two users
Chat.belongsTo(User, {
    foreignKey: 'user1_id',
    onDelete: 'CASCADE'
});
Chat.belongsTo(User, {
    foreignKey: 'user2_id',
    onDelete: 'CASCADE'
})

//  Each message belongs to two users, author and recipient
Message.belongsTo(User, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE'
});
Message.belongsTo(User, {
    foreignKey: 'recipient_id',
    onDelete: 'CASCADE'
});

// Each request belongs to two users, author and recipient
Request.belongsTo(User, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE'
});
Request.belongsTo(User, {
    foreignKey: 'recipient_id',
    onDelete: 'CASCADE'
});

//  Each message belongs to one chat
Chat.hasMany(Message);
Message.belongsTo(Chat, {
    foreignKey: 'chat_id',
    onDelete: 'CASCADE'
});  

module.exports = {User, Chat, Message, Request};