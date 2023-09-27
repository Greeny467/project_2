const router = require('express').Router();
const {User,Chat,Request,Message} =require('../../models');

//routes for user
router.get('/user', async (req,res) =>{
    try{
        const userData = await User.findAll();
        const users = userData.map((user) => user.get({ plain: true }));

        if(users.length===0){
            res.status(404).json({message:'no users'});
        }
        else{
            res.status(200).json(users);
        };

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

router.get('/user/:id', async (req,res) =>{
    try{
        const userData = await User.findByPk(req.params.id);
        const user = userData.get({plain:true});

        if(!user){
            res.status(404).json({message:'No user of this id'});
        }
        else{res.status(200).json(user)};

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

//chat routes
router.get('/chat', async (req,res) =>{
    try{
        const chatData = await Chat.findAll();
        const chats = chatData.map((chat) => chat.get({ plain: true }));

        if(chats.length===0){
            res.status(404).json({message:'no chats'});
        }
        else{
            res.status(200).json(chats);
        };

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

router.get('/chat/:id', async (req,res) =>{
    try{
        const chatData = await User.findByPk(req.params.id);
        const chat = chatData.get({plain:true});

        if(!user){
            res.status(404).json({message:'No chat of this id'});
        }
        else{res.status(200).json(chat)};

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
})

router.post('/chat', async (req,res) =>{
    const {title,user1_id,user2_id} = req.body
    try{
        const chatData = await Chat.create(req.body);
        
        if(!chatData){
            res.status(404).json({message:'failed to post'});
        }
        else{
            res.status(200).json(chatData);
        };
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

//message route
router.get('/message/:id', async (req,res) =>{
    try{
        const messageData = await Message.findByPk(req.params.id);
        const message = messageData.get({plain:true});

        if(!message){
            res.status(404).json({message:'No message of this id'});
        }
        else{res.status(200).json(message)};

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
})

router.post('/message', async (req,res) =>{
    const{text,author_id,recipient_id,chat_id} = req.body
    try{
        const messageData = await Message.create(req.body);

        if(!messageData){
            res.status(404).json({message:'failed to post message'});
        }
        else{
            res.status(200).json(messageData);
        }

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
})

//request routes
router.get('/request/:id', async (req,res) =>{
    try{
        const requestData = await User.findByPk(req.params.id);
        const request = requestData.get({plain:true});

        if(!request){
            res.status(404).json({message:'No request of this id'});
        }
        else{res.status(200).json(request)};

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
})

router.post('/request', async (req,res) =>{
    const {author_id,recipient_id} = req.body
    try{
        const requestData = await Request.create(req.body);

        if(!requestData){
            res.status(404).json({message:'Failed to post request'});
        }
        else{
            res.status(200).json(requestData);
        }

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
})

router.delete('/request/:id', async (req,res) =>{
    try{
        const requestData = await User.destroy({
            where:{
                id:req.params.id
            }
        });

        if(!requestData){
            res.status(404).json({message:'Failed to delete request'});
        }
        else{res.status(200).json(requestData)};

    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router;