//Import models
const User = require('./user');
const Chat = require('./chat');
const Message = require('./message');
const Request = require('./request');

const ChatUser = require('./chatUser');
const Friendship = require('./friendship');

// Every chat has multiple users. every user has multiple chats. 
User.belongsToMany(Chat, {
    foreignKey: 'user_id',
    as: 'chatUser',
    through: ChatUser
});

Chat.belongsToMany(User, {
    foreignKey: 'chat_id',
    through: ChatUser
});



//  Each message belongs to one user, the author.
Message.belongsTo(User, {
    foreignKey: 'author_id',
    as: 'author',
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

//users have many friends. 

User.belongsToMany(User, {
    foreignKey: 'friend1_id',
    as: 'friend1',
    through: {
        model: Friendship,
    },
});

User.belongsToMany(User, {
    foreignKey: 'friend2_id',
    as: 'friend2',
    through: {
        model: Friendship,
    },
});

module.exports = {User, Chat, Message, Request, ChatUser, Friendship};