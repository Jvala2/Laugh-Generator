// https://sv443.net/jokeapi/v2/

document.getElementById("jokeButton").addEventListener("click",function(event) {
    event.preventDefault();
    var requestUrl="https://v2.jokeapi.dev/joke/Any"
    fetch(requestUrl).then(function(response) {
        if(!response.ok) {
            console.log("Error getting url");
        } 
        return response.json();
}).then(function(data) {
    console.log(data);

})});