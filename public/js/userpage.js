//Get the user the page belongs to and client userId
const userId = sessionUserId;
const user = sessionUserData;

// get the area where changes will be made. 
const userArea = document.querySelector('#userArea');

// Function to create link to given chat. 
const createChatLink = (chat) => {
    const chatbox = document.createElement('a');
        chatbox.setAttribute('href', `/chat/${chat.id}`)

        const chatTitle = document.createElement('h3');
        chatTitle.textContent = chat.title;

        chatbox.append(chatTitle);
        userArea.append(chatbox);
};

// function to post a new request.
const sendRequest = async (btn) => {

    if (userId && user.id) {
        const response = await fetch('/api/db/request', {
          method: 'POST',
          body: JSON.stringify({
            'author_id': userId,
            'recipient_id': user.id
          }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          btn.remove();

          const requestSent = document.createElement('h3');
          requestSent.textContent = 'Request Sent';
          userArea.append(requestSent);

        } else {
          alert('Failed to sendRequest.');
        };
      };
};

console.log(user);

//If the userpage belongs to the client user, show all chats that belong to the user. 
if(user.id === userId){
    const header = document.createElement('h2');
    header.textContent = 'Your chats';
    userArea.append(header);

    user.chatUser.forEach(chat => {
        createChatLink(chat);
    });
}
else{
    // otherwise, make a boolean and set it as true or false depending on whether the client user already has a chat with 
    //The person the user page belongs to. For each chat that the users share, a link will be generated. 
    let belongsToChat = false;

    console.log(user.chatUser);
    console.log(user.chatUser[0].users[0].id)
    if (user.chatUser.some(chat => chat.users.some(user => user.id === userId))) {
        console.log('yea')
        belongsToChat = true;
        
    }
        // Create chat link or perform other actions here

    // If the two users have no chat together, a new boolean is made for checking if there is a request. 
    if(belongsToChat === false) {
        let isRequest = false;

        // make a fetch for all requests, then if any requests have the client user as an author and the userpage user as a recipient,
        // The boolean will be made true. 
        fetch('/api/db/request')
        .then((response) =>{
            return response.json();
        })
        .then((data) =>{
            console.log(data);
            data.forEach((request) => {
                if(request.author_id === userId && request.recipient_id === user.id){
                    isRequest = true;
                    console.log(isRequest);
                };
            });

            //If a request has been sent already but not accepted, nothing happens.

            // If there are no requests, a button is rendered to let the client user send a chat request. 
            if(isRequest === false) {
                const requestBtn = document.createElement('button');
                requestBtn.textContent = 'Friend?';
                requestBtn.addEventListener('click', function() {
                    sendRequest(requestBtn); 
                  });
    
                userArea.append(requestBtn);
            };
        });
    };
};
