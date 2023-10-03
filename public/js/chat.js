// query select page elements, and get message data from the view. 
const messageArea = document.querySelector('#messageArea');
const inviteButton = document.querySelector('#inviteButton');
const inviteSpace = document.querySelector('#inviteSpace');

const messages = sessionMessages;
const userId = sessionUserId;
const chat = sessionChat;

// create a friends array and a friends to invite array, then add all the client users friends to the friends array. 
const friends = [];
let friendsToInvite = [];

const pageMessages = [];

fetch(`/api/db/user/${userId}`)
.then((response) => {
    return response.json();
})
.then((user) => {
    user.friend1.forEach(friend => {
        friends.push(friend);
    });
    user.friend2.forEach(friend => {
        friends.push(friend);
    });
});

// function to set the friendsToInvite array to empty and then add friends to it from the friends array where friends are not in the chat and haven't been invited. 
const setFriends = () => {
    friendsToInvite = [];

    fetch('/api/db/request')
    .then((response) => {
        return response.json();
    })
    .then((requests) => {
        friends.forEach(friend => {
            const isFriendInChat = chat.users.some(user => user.id === friend.id);
            const hasRequestToFriend = requests.some(request => request.recipient_id === friend.id && request.inviteChat_id === chat.id);
        
            if (!isFriendInChat && !hasRequestToFriend) {
                friendsToInvite.push(friend);
            }
        });
    });
}

console.log(friendsToInvite);

const generateMessage = async (message) => {
    const messageRow = document.createElement('div');
    messageRow.className = 'row';

    const messageBlock = document.createElement('div');

    let authorName;
    if(message.author_id === userId) {
        // Roughly the css for user's messages to appear the on the right: class = "s6 offset-s6 m6 offset-m6 l6 offset-l6" s, m, & l are for responsiveness
        messageBlock.className = 'rightMessage right s6 offset-s6 m6 offset-m6 l6 offset-l6';
        authorName = 'You'
    }
    else{
        // Roughly the css for friend's messages to appear on the left: class = "s6 m6 l6"
        messageBlock.className = 'leftMessage s2 m3 l4';
        authorName = message.author.username;
    };

    console.log(authorName, message.createdAt, message.text);
    const messageHeading = document.createElement('div');
    messageHeading.className = 'messageHeading';

    const authorText = document.createElement('h4');
    authorText.textContent = authorName;

    const messageDate = document.createElement('p');
    messageDate.textContent = message.createdAt;

    const messageText = document.createElement('p');
    messageText.textContent = message.text;

    messageHeading.appendChild(authorText);
    messageHeading.appendChild(messageDate);

    messageBlock.appendChild(messageHeading);
    messageBlock.appendChild(messageText);

    messageRow.appendChild(messageBlock);
    messageArea.appendChild(messageRow);
};

console.log(messages, userId, chat);

// For each message belonging to the chat, if it was written by someone else it is created on the left side of the screen, if the client user made it, it is created on the right side. 
const createAllMessages = async () => {
    messages.forEach(message => {
        pageMessages.push(message);

        generateMessage(message);
    });
}

// function to get all messages which belong to this chat and check If they have already been put on the screen. If they have not, they are populated on the screen. 
const findNewMessages = async () => {
    const messageData = await fetch(`/api/db/chat/message/${chat.id}`);
    const chatMessages = await messageData.json();

    chatMessages.forEach(sendMessage => {

        if(pageMessages.some(pageMessage => pageMessage.id === sendMessage.id)){
            return
        }
        else{
            generateMessage(sendMessage);
        };
    });
};

// functionality to the back button for the invite tab.
const inviteBackButton = async (element) => {
    element.remove();
    inviteButton.style.display = 'block';
    setFriends();

};

// function to send a request and remove ability to invite the given user after. 
const inviteUserSend = async (user, element) => {
    const postInvite = await fetch('/api/db/request', {
        method: 'POST',
        body: JSON.stringify({
            "author_id": userId,
            "recipient_id": user.id,
            "type": 'chat',
            "inviteChat_id": chat.id
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(postInvite.ok){
        element.remove();
    };
};

// function to create invite tab with all friends who can be invited
const inviteTab = async () =>{
    inviteButton.style.display = 'none';

    const inviteArea = document.createElement('div');
    inviteArea.className = 'col right';

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.className = ' btn'
    backButton.addEventListener('click', () => inviteBackButton(inviteArea));
    inviteArea.append(backButton)

    friendsToInvite.forEach(friend => {
        const friendName = document.createElement('p');
        friendName.className = ''
        friendName.textContent = friend.username;

        const inviteUser = document.createElement('button');
        inviteUser.className = 'btn'
        inviteUser.textContent = 'Invite Friend';
        inviteUser.addEventListener('click', () => inviteUserSend(friend, inviteUser));

        
        inviteArea.append(friendName);
        inviteArea.append(inviteUser);
    });
    inviteSpace.append(inviteArea);
};

// set up initial friendsToInvite array and create all messages, as well as add invite button event listener. 
setFriends();
createAllMessages();
inviteButton.addEventListener('click', () => inviteTab());

// check for new messages after a certain amount of time. 
setInterval(findNewMessages, 5000);