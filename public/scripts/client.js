/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  tweets.forEach(element => {
    $(".tweets").append(createTweetElement(element));
  });
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container

//do not use appendchild for jquery string.  Also look up proper way to grab container element using jquery.
}

const createTweetElement = function(tweet) {

let $tweet = `
<container>
<article>
<header class = "headerTweets">
  <div>
  <img src=${tweet.user.avatars} alt="">
  <span class = "name">${tweet.user.name}</span>
 </div>
  <span class = "handle">${tweet.user.handle}</span>
</header>
<span class = "spantweet">${tweet.content.text}</span>
<footer>
    <p>${tweet.created_at}</p>
    <img src="" alt="">
    <img src="" alt="">
    <img src="" alt="">
</footer>
</article>
</container>`
return $tweet;
}

$(document).ready(function() {
  renderTweets(data)
});