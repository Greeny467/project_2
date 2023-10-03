//Get the user the page belongs to and client userId
const userId = sessionUserId;
const user = sessionUserData;


// Create array with all friends
const friendArray = [];
user.friend1.forEach(friend => {
    friendArray.push(friend);
});
user.friend2.forEach(friend => {
    friendArray.push(friend);
})

// get the area where changes will be made. 
const userArea = document.querySelector('#userArea');
userArea.className = 'container center'
// Functions to create link to given chat or friend userpage
const createChatLink = (chat) => {
    const chatbox = document.createElement('a');
        chatbox.setAttribute('href', `/chat/${chat.id}`)

        const chatTitle = document.createElement('h3');
        chatTitle.textContent = chat.title;

        chatbox.append(chatTitle);
        userArea.append(chatbox);
};

const createFriendLink = (friend) => {
    const friendLink = document.createElement('a');
    friendLink.setAttribute('href', `/user/${friend.id}`)
    friendLink.textContent = friend.username;
    friendLink.className = 'center'

    userArea.append(friendLink);
}

// function to post a new request.
const sendRequest = async (btn) => {

    if (userId && user.id) {
        const response = await fetch('/api/db/request', {
          method: 'POST',
          body: JSON.stringify({
            'author_id': userId,
            'recipient_id': user.id,
            'type': 'friend',
            'inviteChat_id': 0
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
    const header1 = document.createElement('h2');
    header1.textContent = 'Your friends';
    userArea.append(header1);

    friendArray.forEach(friend => {
        createFriendLink(friend);  
    });

    const header2 = document.createElement('h2');
    header2.className = 'container'
    header2.textContent = 'Your chats';
    userArea.append(header2);

    user.chatUser.forEach(chat => {
        createChatLink(chat);
    });
}
else{
    if(friendArray.some(friend => friend.id === userId)){
        // If the two users are friends, then check if the two have any chats together. 
        const userChats = [];

        // For each chat in chatUser, check if any of the included users have the same id as the client.
        //If so, push the chat to userChats.
        user.chatUser.forEach(chat => {
            if (chat.users.some(user => user.id === userId)) {
            userChats.push(chat);
            }
        });

        userChats.forEach(chat => {
            createChatLink(chat);
        });

        if(userChats.length === 0){
            const noChatsYet = document.createElement('h2');
            noChatsYet.textContent = 'No Chats with this user yet';

            userArea.append(noChatsYet);
        }
    }
    else {
        // if the two users are not friends, check if the client user has sent a friend request.
        let isRequest = false;
        let requestfrom;

        // make a fetch for all requests, then if any requests have the client user as an author and the userpage user as a recipient,
        // The boolean will be made true. 
        fetch('/api/db/request')
        .then((response) =>{
            return response.json();
        })
        .then((data) =>{
            
            //Check if there are any requests where the id's match the client id and userpage id.
            // Set requestfrom depending on who the author of the request is if there are any. 
            data.forEach((request) => {
                if((request.author_id === userId && request.recipient_id === user.id)){
                    isRequest = true;
                    requestfrom = userId;
                }
                else if(request.author_id === user.id && request.recipient_id === userId){
                    isRequest = true;
                    requestfrom = user.id;
                }
            });


            // if isRequest is true, then a message will be rendered on screen saying that a request has alread been sent or that the user has sent you a request, depending on who the author is.
            //Otherwise, a button will be rendered allowing the user to send a request. 
            if(isRequest === true){
                const requestSent = document.createElement('h3');
                if(requestfrom === userId) {
                    requestSent.textContent = 'Friend Request sent';
                }
                else if(requestfrom === user.id){
                    requestSent.textContent = 'This user has sent you a friend request';
                };

                userArea.append(requestSent);
                return;
            }
            else{
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

    