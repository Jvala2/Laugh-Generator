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