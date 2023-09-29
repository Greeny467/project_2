const userId = sessionUserId;
const requests = sessionRequests;

const requestPlace = document.querySelector('#requestPlace');

console.log(requests);

const deleteRequest = async (request, element) =>{
    //Delete request from the database.
    const deletePost = await fetch(`api/db/request/${request.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if(deletePost.ok){
        //Remove request element from page if deletion is success.
        element.remove();
    }
    else{
        alert('Failed to delete request');
    }
}

const acceptRequest = async (request, element) =>{
    //If it is a friend request, make a new friend with the data and remove the request element. 
    if(request.type === 'friend'){
        const author_id = request.author.id;

        const postFriend = await fetch('/api/db/friendship', {
            method: 'POST',
            body: JSON.stringify({
                'friend1_id':author_id ,
                'friend2_id':userId }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (postFriend.ok) {
            deleteRequest(request, element);
          } 
          else {
            alert('Failed to create friendship.');
          };
    }
    else if(request.type === 'chat'){
        // if it is a chat request, make a new chat user with the data and remove the request element. 
        const invitedChat = request.inviteChat_id;

        const postChatUser = await fetch('/api/db/chatuser', {
            method: 'POST',
            body: JSON.stringify({
                'user_id':userId ,
                'chat_id':invitedChat }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (postChatUser.ok) {
            deleteRequest(request, element);
          } 
          else {
            alert('Failed to create chatuser.');
          };
    };
};

const createRequestElement = async (request) =>{
    const requestBox = document.createElement('div');
    
    const header = document.createElement('h3');
    if(request.type === 'friend'){
        header.textContent = `Become friends with ${request.author.username}?`;
    }
    else if(request.type === 'chat'){
        header.textContent = `Accept chat request from ${request.author.username}?`;
    }

    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Yes';
    acceptButton.addEventListener('click', () => acceptRequest(request, requestBox));

    const rejectButton = document.createElement('button');
    rejectButton.textContent = 'No';
    rejectButton.addEventListener('click', () => deleteRequest(request, requestBox));

    requestBox.append(header);
    requestBox.append(acceptButton);
    requestBox.append(rejectButton);
    

    requestPlace.append(requestBox);
};

requests.forEach(request => {
    createRequestElement(request);
});