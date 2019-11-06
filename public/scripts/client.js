/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json


const renderTweets = function(tweets) {
  $(".tweets").empty();
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


  const $form = $('#postTweet');
  $form.on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url:'http://localhost:8080/Tweets',
      data:$(this).serialize()
    })
    .done(loadTweets)
   


  });

  let loadTweets = function () {
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/tweets/`
    })
    .done(renderTweets)
  }
  loadTweets();

});

