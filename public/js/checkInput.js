
const checkInput = async (word) =>{

    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/typeOf`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f894d970ecmshf012fa1b337753ep1d6db3jsn3ba53d529cd9',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);

        if(response.status === 200){
            const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
            return( capitalizedWord );
        }
        else{
            return('badRequest');
        };
    } 
    catch (error) {
        console.error(error);
    };
};