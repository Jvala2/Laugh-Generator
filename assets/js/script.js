// Joke Api https://sv443.net/jokeapi/v2/

/* This is the blacklist var area */
var blacklistFlags= "[]"

/* Click the button to display the joke */
document.getElementById("jokeButton").addEventListener("click",function(event) {
    event.preventDefault();
    /*This if loop will detect and filter out jokes that are blacklisted */
    //    if ()

/* Var request joke api with blacklist */
   // var requestUrl="https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    var requestUrl="https://v2.jokeapi.dev/joke/Any"
    fetch(requestUrl).then(function(response) {
        if(!response.ok) {
            document.getElementById("joke1").innerText="There was an error retriving the joke."
            document.getElementById("joke2").innerHTML=""
        } 
        return response.json();
}).then(function(data) {
    console.log(data);

    /* This part displays the joke */
        if(data.type=="twopart") {
            var jokeSetup=data.setup
            var jokeDelivery=data.delivery
            document.getElementById("joke1").innerText=jokeSetup
            document.getElementById("joke2").innerText=jokeDelivery
        } else {
            var oneLineJoke=data.joke
            document.getElementById("joke1").innerText=oneLineJoke
            document.getElementById("joke2").innerHTML=""
        }

})});

/*
-----------------------------social share links-------------------------------
Reddit:
https://reddit.com/submit?url=[post-url]&title=[post-title]

Twitter:
https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]

Facebook:
https://www.facebook.com/sharer.php?u=[post-url]

*/


/*------------------DOM Elements-----------------------------*/
const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const redditBtn = document.querySelector(".reddit-btn");


function init() {
    //this grabs the URL of the current webpage you're on
    let postURL = encodeURI(document.location.href);
    let postTitle = encodeURI("Hey! Check this joke out!");

    facebookBtn.setAttribute("href", `https://www.facebook.com/sharer.php?u=${postURL}`);

    twitterBtn.setAttribute("href", `https://twitter.com/share?url=${postURL}&text=${postTitle}`);

    redditBtn.setAttribute("href", `https://reddit.com/submit?url=${postURL}&title=${postTitle}`);
}

init();