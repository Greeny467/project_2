const router = require('express').Router();
const {User, Chat, Message, Request} = require('../models');
const {Op} = require('sequelize');

const withAuth = require('../util/auth');

//Home page routes
router.get('/', async (req, res) => {
    try{

        //Get all chats which this user belongs to
        if(req.session.userId){
            const homeData = await Chat.findAll(
                {
                    where: {
                        [Op.or]: [
                            { user1_id: req.session.userId },
                            { user2_id: req.session.userId }
                          ]
                    }
                }
            );

            //Give variable for a boolean to show whether there are chats or not.
            let areThereChats
            let chats

            if(homeData.length === 0 ){
                areThereChats = false;
            }
            else{
                areThereChats = true;
                // simplify homeData into chats variable
                chats = homeData.map((chat) => (
                    chat.get({plain: true})
                ));
                
            };

            // render home template with specified data
            res.status(200);
            res.render('home', {
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                chats,
                areThereChats
            });
        }
        else{
            const areThereChats = false;

            res.status(200);
            res.render('home', {
                areThereChats,
                loggedIn: req.session.loggedIn,

            });
        };
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});


//inbox routes
router.get('/inbox', withAuth, async (req, res) => {
    try{

        // Get all requests in which the recipient is the logged in user. Include the author user.
        const inboxData = await Request.findAll({
            where: {
                recipient_id: req.session.userId
            },
            include: [
                {
                    model: User,
                    as: 'author',
                }
            ]
        });

        //define boolean to show whether there are requests or not
        let areThereRequests;

        if(!inboxData){
            areThereRequests = false;
        }
        else{
            // simplify inbox data into something easier to use
            const requests = inboxData.map((request) => (
                request.get({plain:true})
            ));

            // render inbox template with specified data. 
            res.render('inbox', {
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                areThereRequests,
                requests
            });
            res.status(200);
        };
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});


//userpage routes
router.get('/user/:id', withAuth, async (req, res) => {
    try{

        // Get user data from id, include all chats They have.
        const userData = await User.findByPk(req.params.id, {
            include: [{
                model: Chat,
                attributes: ['id'],
            }]
        });

        // 404 status if there is no user of the id
        if (!userData){
            res.status(404).json({message: 'No user of this ID found'});
        }
        else{

            // simplify userData
            const user = userData.get({plain: true});


            // render user template with specified data
            res.render('user', {
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                user
            });
            res.status(200);
        };
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});


//chat routes
router.get('/chat/:id', withAuth, async (req, res) => {
    try{

        // Find chat of the url id param. Then simplify it. 
        const chat = await Chat.findByPk(req.params.id);
        const simpleChat = chat.get({plain: true});

        //if there is no chat, give a 404 status. 
        if(!simpleChat){
            res.status(404).json({message: 'There is no chat of this ID'});
        }
        else{
            
            //Create variables for the users who belong to the chat and the user who is logged in. 
            const thisUser = req.session.userId.toString();
            const postUser1 = simpleChat.user1_id.toString();
            const postUser2 = simpleChat.user2_id.toString();

            // Check to see if the logged in user belongs to the chat or not. 
            if(thisUser === postUser1 || thisUser === postUser2){

                // Find all messages which belong to the chat, and include the username and id of the author
                const messages = await Message.findAll({
                    where: {
                       chat_id: simpleChat.id, 
                    },
                    include: [{
                        model: User,
                        as: 'author',
                        attributes: ['username', 'id']
                    }]
                });

                // simplify message data
                const simpleMessages = messages.map((message) => (
                    message.get({plain: true})
                ));
                
                // boolean to show if there are any messages
                let areThereMessages;

                if(simpleMessages.length === 0){
                    areThereMessages = false;
                }
                else{
                    areThereMessages = true;
                };

                // render chat template with all specified info. 
                res.render('chat', {
                    loggedIn: req.session.loggedIn,
                    userId: req.session.userId,
                    areThereMessages,
                    simpleChat,
                    simpleMessages,
                })
                res.status(200);
            }
            else{
                // if the logged in user does not belong to the chat, they don't get the message data. 
                console.log('rejected');
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});

router.get('/login', async (req, res) => {
    try{
        if(!req.session.loggedIn){
            res.render('login');
        }
        else{
            res.redirect('/')
        };
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});

module.exports = router;