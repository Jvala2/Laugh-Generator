/*------------------DOM Elements-----------------------------*/
const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const redditBtn = document.querySelector(".reddit-btn");



$(document).ready(function() {
    $('select').formSelect();
});

/* Click the button to display the Meme */

    document.getElementById("memeButton").addEventListener("click", function(event) {
        event.preventDefault();
    
        let fetchDataFromApi = async function() {
            let response = await fetch('https://meme-api.herokuapp.com/gimme');
            let results = await response.json();
            if(results.nsfw){
                console.log("Results are nsfw")
                return fetchDataFromApi('https://meme-api.herokuapp.com/gimme'); 
            }else{
                return results; 
            }
        }
        fetchDataFromApi().then((data) => {
            console.log(data)
            var memeLink=data.preview[2];
            document.getElementById("joke1").innerHTML=`<img src="${memeLink}"/>`;
            document.getElementById("joke2").innerHTML="";
            localStorage.setItem("setup", "");
            localStorage.setItem("delivery", "");
            localStorage.setItem("joke", "");
            localStorage.setItem("memePic", memeLink);
        })
      
    });

/*----------------------------------------------- Click the button to display the joke------------------------------------------------ */
document.getElementById("jokeButton").addEventListener("click", function(event) {
    event.preventDefault();
    var requestUrl = "https://v2.jokeapi.dev/joke/"

    /*This will detect and filter out jokes that are blacklisted */
    var ourFilter = $("#filters").val();
    var category = $("#categories").val();
    // console.log(ourFilter)
    // console.log(category)
    if (category.length > 0) {
        requestUrl = requestUrl + category;
        // console.log(category)
        // console.log(requestUrl)
    } else {
        requestUrl = requestUrl + "Any";
    }
    if (ourFilter.length > 0) {
        requestUrl = requestUrl + "?blacklistFlags=" + ourFilter;
        // console.log(ourFilter)
        // console.log(requestUrl)
    }
    //console.log(requestUrl)
        /* Var request joke api with blacklist */
        // var requestUrl="https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"


    function getRandomJoke() {
        fetch(requestUrl).then(function(response) {
            if(!response.ok) {
                document.getElementById("joke1").innerText="There was an error retreiving the joke."
                document.getElementById("joke2").innerHTML=""
            } 
            return response.json();
        }).then(function(data) {
            console.log(data);
            /* This part displays the joke */
            if(data.type=="twopart") {
                var jokeSetup=data.setup;
                var jokeDelivery=data.delivery;
                document.getElementById("joke1").innerText=jokeSetup;
                document.getElementById("joke2").innerText=jokeDelivery;
                localStorage.setItem("setup", jokeSetup);
                localStorage.setItem("delivery", jokeDelivery);
                localStorage.setItem("joke", "");
                localStorage.setItem("memePic", "");
            } else {
                var oneLineJoke=data.joke
                document.getElementById("joke1").innerText=oneLineJoke;
                document.getElementById("joke2").innerHTML="";
                localStorage.clear();
                localStorage.setItem("setup", "");
                localStorage.setItem("delivery", "");
                localStorage.setItem("joke", oneLineJoke);
                localStorage.setItem("memePic", "");
            }
            return;
        });
    }
    getRandomJoke();
    })

    lastGeneratedJoke();
    share();
    // This function will display the last joke that was shown on reload
    function lastGeneratedJoke () {
        let lineOne = localStorage.getItem("setup");
        let lineTwo = localStorage.getItem("delivery");
        let oneLiner = localStorage.getItem("joke");
        let meme = localStorage.getItem("memePic");

        if (lineOne && lineTwo) {
            document.getElementById("joke1").textContent = lineOne;
            document.getElementById("joke2").textContent = lineTwo;
        } else if (oneLiner){
            document.getElementById("joke1").innerText = oneLiner;
            document.getElementById("joke2").innerHTML = "";
        } else {
            document.getElementById("joke1").innerHTML = `<img src="${meme}"/>`;
            document.getElementById("joke2").innerHTML = "";
        }


    }

   
function share() {
    var jokeOutput = localStorage.getItem("setup");
    var jokeOutput2 = localStorage.getItem("delivery");
    var jokeOutput3 = localStorage.getItem("joke");
    var jokeOutput4 = localStorage.getItem("memePic");
    //this grabs the URL of the current webpage you're on 
    let postURL = encodeURI(document.location.href);
    let postTitle = encodeURI(jokeOutput+" "+jokeOutput2 + jokeOutput3 + jokeOutput4);

    //console.log(postTitle); 

    facebookBtn.setAttribute("href", `https://www.facebook.com/sharer/sharer.php?u=${postURL}`);
    twitterBtn.setAttribute("href", `https://twitter.com/share?url${postURL}&text=${postTitle}`);
    redditBtn.setAttribute("href", `https://reddit.com/submit?url=${postURL}&title=${postTitle}`);
}

/*
-----------------------------social share links-------------------------------
Reddit:
https://reddit.com/submit?url=[post-url]&title=[post-title]
Twitter:
https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]
Facebook:
https://www.facebook.com/sharer.php?u=[post-url]
*/