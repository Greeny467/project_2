// query select search input and button. 
const searchBar = document.querySelector('#search');
const resultList = document.querySelector('#resultsList');
const userId = sessionUserId;
const users = [];

// function to create result tabs with links for the given users userpage. 
const createLink = (user) => {
    const resultTab = document.createElement('li');

    const link = document.createElement('a');
    link.setAttribute('href', `/user/${user.id}`);
    link.textContent = user.username;

    resultTab.appendChild(link);
    resultList.appendChild(resultTab);
};


//Fetch all users for users array. 
fetch('/api/db/user')
.then((response) => {
    return response.json();
})
.then((data) =>{
    data.forEach(user => {
        users.push(user);
    });
});


 
//Event listener for when the user types something into the search bar. The createLink function will be used for every user in the 
//users array which contains the input of the searchbar to create links to user pages. 
searchBar.addEventListener('keyup', function(event) {
    const input = searchBar.value.trim();
    resultList.innerHTML = "";
    
    let result = [];
    
    if(input.length){
        result = users.filter((user) => {
            return (
                user.username.toLowerCase().includes(input.toLowerCase()) &&
                user.id !== userId
            );
        });

        result.forEach(user => {
            createLink(user);
        });
    };

});