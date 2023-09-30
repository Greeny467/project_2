
const checkInput = async (word) =>{
    const wordCheck = await fetch('/api/db/oneword', {
        method: 'POST',
        body: JSON.stringify({
            'word': word,
        }),
        headers: { 'Content-Type' : 'application/json'}
    });

    const finalWordCheck = await wordCheck.json();
    if(wordCheck.status === 200){
        return finalWordCheck.response;
    }
    else{
        console.log('Something went wrong');
    }
};