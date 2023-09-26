// query select page elements, and get message data from the view. 
const messageArea = document.querySelector('#messageArea')
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
            messageBlock.className = 'rightMessage';
            authorName = 'You'
        }
        else{
            messageBlock.className = 'leftMessage';
            authorName = message.author.username;
        };
        const messageHeading = document.createElement('div')
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

//Create a function to send a fetch (POST) request to the database route for posting messages.

// addEventListener on send button to enact the function with the values from the page elements. 

createAllMessages();