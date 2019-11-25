/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json


const renderTweets = function(tweets) {
  $(".tweets").empty();
  tweets.forEach(element => {
    $(".tweets").prepend(createTweetElement(element));
  });

  //do not use appendchild for jquery string.  Also look up proper way to grab container element using jquery.
};


//creates tweet container for each tweet in tweets Array.  Uses string literal to access the tweet object which is passed to the function.
//escape function called is for removing potentially dangerous html tag tweets and returning them as a string.
//moment function called to convert and display time in human readable format.
const createTweetElement = function(tweet) {
  let $tweet = `
<container>
<article class = "tweetArticle">
<header class = "headerTweets">
  <div class = "userImage">
  <img src=${tweet.user.avatars} alt="">
  <span class = "name">${tweet.user.name}</span>
 </div>
  <span class = "handle">${tweet.user.handle}</span>
</header>
<span class = "spantweet">${escape(tweet.content.text)}</span>
<footer>
    <p class = "timeCreated">${moment(tweet.created_at).fromNow()}</p>
    <div class = "bottomImages">
    <i class="fas fa-flag fa-xs" style="color:#4056A1;"></i>
    <i class="fas fa-retweet fa-xs" style="color:#4056A1;"></i>
    <i class="fas fa-heart fa-xs" style="color:#4056A1;"></i>
    </div>
</footer>
</article>
</container>`;
  return $tweet;
};

//escape function 
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//on document ready hide the empty and limit paragraph texts which are displayed when there is too many characters or an empty string is entered.
$(document).ready(function() {
  $('.limit').hide();
  $('.empty').hide();
  $('.new-tweet').hide();



 
  //when the tweet button is clicked the following code is run on sumbit.
  const $form = $('#postTweet');
  $form.on("submit", function(event) {
   
    event.preventDefault();
    //we subtract five here because with no string $(this).serialize will return length of 5 with a value of "".
    if (($(this).serialize().length - 5) > 140) {
      $('.limit').show();
    } else if ($('textarea').val() === "") {
      $('.empty').show();
    } else {
      $('.limit').hide();
      $('.empty').hide();
      $.ajax({
        type: 'POST',
        url:'http://localhost:8080/Tweets',
        data:$(this).serialize()
      })

        .done(loadTweets);
      $form.find("textarea").val("");
      $form.find(".counter").html(140);
      //resets the textarea to the defualt after tweet is clicked.  this way the form is ready for a new tweet with its default values.
    }
   

  });
//loads tweets by making an ajax request to the corresponding url.  returns data and renderTweets is called.
  let loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/tweets/`
    })
      .done(renderTweets);
  };
  loadTweets();
//code below allows us to scroll the page from the new-tweet to the first tweet on the page.  
  const $tweets = $('.new-tweet');
  const $textarea = $('textarea');
  const $img = $('.fas.fa-angle-double-down');
  $img.on("click", function(event) {
    event.preventDefault();
    $tweets.slideToggle(600, function() {
      $textarea.focus();
    });
  });
});

