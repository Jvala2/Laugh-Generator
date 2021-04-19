/*------------------DOM Elements-----------------------------*/
const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const redditBtn = document.querySelector(".reddit-btn");

$(document).ready(function() {
    $('select').formSelect();
});

/* Click the button to display the joke */
document.getElementById("jokeButton").addEventListener("click",function(event) {
    event.preventDefault();
    var requestUrl="https://v2.jokeapi.dev/joke/"

        /*This will detect and filter out jokes that are blacklisted */
    var nSFW = document.getElementById("filters").value; 
    var category = document.getElementById("categories").value;
    if (category) {
        requestUrl = requestUrl+category;
    } else {
        requestUrl = requestUrl+"Any";
    }
    if (nSFW) {
        requestUrl = requestUrl+"?blacklistFlags="+nSFW;
    }

/* Var request joke api with blacklist */
   // var requestUrl="https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"



    
    function getRandomJoke() {
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
            share();
            return;
        });
    }
    getRandomJoke()
    


    })


/* test */


/*
-----------------------------social share links-------------------------------
Reddit:
https://reddit.com/submit?url=[post-url]&title=[post-title]

Twitter:
https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]

Facebook:
https://www.facebook.com/sharer.php?u=[post-url]

*/



function share() {
    var jokeOutput = document.getElementById("joke1").textContent;
    var jokeOutput2 = document.getElementById("joke2").textContent;
    //this grabs the URL of the current webpage you're on 
    let postURL = encodeURI(document.location.href);
    let postTitle = encodeURI(jokeOutput+jokeOutput2);

    //console.log(postTitle); 

    facebookBtn.setAttribute("href", `https://www.facebook.com/sharer/sharer.php?u=${postURL}`);
    twitterBtn.setAttribute("href", `https://twitter.com/share?url${postURL}&text=${postTitle}`);
    redditBtn.setAttribute("href", `https://reddit.com/submit?url=${postURL}&title=${postTitle}`);
}