//Import models
const User = require('./user');
const Chat = require('./chat');
const Message = require('./message');
const Request = require('./request');

// Each chat belongs to two users
Chat.belongsTo(User, {
    foreignKey: 'user1_id',
    as: 'user1',
    onDelete: 'CASCADE'
});
Chat.belongsTo(User, {
    foreignKey: 'user2_id',
    as: 'user2',
    onDelete: 'CASCADE'
})

//  Each message belongs to two users, author and recipient
Message.belongsTo(User, {
    foreignKey: 'author_id',
    as: 'author',
    onDelete: 'CASCADE'
});
Message.belongsTo(User, {
    foreignKey: 'recipient_id',
    as: 'recipient',
    onDelete: 'CASCADE'
});

// Each request belongs to two users, author and recipient
Request.belongsTo(User, {
    foreignKey: 'author_id',
    as: 'author',
    onDelete: 'CASCADE'
});
Request.belongsTo(User, {
    foreignKey: 'recipient_id',
    as: 'recipient',
    onDelete: 'CASCADE'
});

//  Each message belongs to one chat
Chat.hasMany(Message);
Message.belongsTo(Chat, {
    foreignKey: 'chat_id',
    onDelete: 'CASCADE'
});  

module.exports = {User, Chat, Message, Request};