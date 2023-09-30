// Create functionality of the messaging system. Take in user input when submitted and post it as a new message. 
const messageInput = document.querySelector('#messageInput');
const submitButton = document.querySelector('#submit');


const sendMessage = async () =>{
    const messageText = messageInput.value;
    const wordList = messageText.toLowerCase().split(" ");
    const newWord = wordList[0];

    if(newWord != ''){
        const wordCheck = await checkInput(newWord);
        console.log(wordCheck);


        if(wordCheck != 'badRequest'){
            const createMessage = await fetch('/api/db/message', {
                method: 'POST',
                body: JSON.stringify({
                    'text': wordCheck,
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
        }
        else{
            alert(`That word doesn't exist.`)
        };
        
    };
    
};

submitButton.addEventListener('click', () => sendMessage());