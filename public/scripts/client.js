
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
<span class = "spantweet">${escape(tweet.content.text)}</span>
<footer>
    <p>${tweet.created_at}</p>
    <div class = "bottomImages">
    <i class="fas fa-flag fa-xs" style="color:#4056A1;"></i>
    <i class="fas fa-retweet fa-xs" style="color:#4056A1;"></i>
    <i class="fas fa-heart fa-xs" style="color:#4056A1;"></i>
    </div>
</footer>
</article>
</container>`
return $tweet;
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}




$(document).ready(function() {


  const $form = $('#postTweet');
  $form.on("submit", function(event) {
    event.preventDefault();
    if ($(this).serialize().length > 140) {
      alert("You have entered too many characters")
    } else if ($(this).serialize().length === 0) {
      alert("You must enter something!")
    } else {
    $.ajax({
      type: 'POST',
      url:'http://localhost:8080/Tweets',
      data:$(this).serialize()
    })

    .done(loadTweets)
    $form.find("textarea").val("");
    $form.find(".counter").html(140);

   }
   

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

