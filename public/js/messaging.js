// Create functionality of the messaging system. Take in user input when submitted and post it as a new message. 
const messageInput = document.querySelector('#messageInput');
const submitButton = document.querySelector('#submit');


const sendMessage = async () =>{
    const messageText = messageInput.value;

    if(messageText != ''){
        const createMessage = await fetch('/api/db/message', {
            method: 'POST',
            body: JSON.stringify({
                'text': messageText,
                'author_id': userId,
                'chat_id': chat.id
            }),
            headers: {'Content-Type': 'application/json'},
        });
    
        if(createMessage.ok){
            location.reload();
        }
        else{
            alert('NO');
        };
    };
    
};

submitButton.addEventListener('click', () => sendMessage());