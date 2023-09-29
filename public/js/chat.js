// query select page elements, and get message data from the view. 
const messageArea = document.querySelector('#messageArea');
const inviteButton = document.querySelector('#inviteButton');
const inviteSpace = document.querySelector('#inviteSpace');

const messages = sessionMessages;
const userId = sessionUserId;
const chat = sessionChat;

console.log(messages, userId, chat);
//For each message, if the userId = message.author_id, then the message is created in the message holding div on the right. Otherwise, its created on the left.
//Each message should be generated with the message.user.username and the message.text.
const createAllMessages = () => {
    messages.forEach(message => {
        const messageBlock = document.createElement('div');

        let authorName;
        if(message.author_id === userId) {
            // Roughly the css for user's messages to appear the on the right: class = "s6 offset-s6 m6 offset-m6 l6 offset-l6" s, m, & l are for responsiveness
            messageBlock.className = 'rightMessage s6 offset-s6 m6 offset-m6 l6 offset-l6';
            authorName = 'You'
        }
        else{
            // Roughly the css for friend's messages to appear on the left: class = "s6 m6 l6"
            messageBlock.className = 'leftMessage s6 m6 l6';
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

        messageArea.appendChild(messageBlock);
    });
}

// function to create invite tab
const inviteTab = () =>{
    inviteSpace.innerHTML = "";

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    inviteSpace.append(backButton);

    user.friends.forEach(friend => {
        const friendName = document.createElement('h3');
        friendName.textContent = friend.username;

        const inviteUser = document.createElement('button');
        inviteUser.textContent = 'Invite';

        
        inviteSpace.append(friendName);
        inviteSpace.append(inviteUser);
    });
};

//Create a function to send a fetch (POST) request to the database route for posting messages.

// addEventListener on send button to enact the function with the values from the page elements. 

createAllMessages();