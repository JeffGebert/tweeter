$(document).ready(function() {
  $('textarea').on('keyup', function() {
    let tweetLength = 140 - $(this).val().length;

    if (tweetLength < 0) {
      $(this).next().children('span').text((140 - $(this).val().length));
      $(this).next().children('span').attr('class', 'redCounter');

    } else {
      $(this).next().children('span').text((140 - $(this).val().length));
      $(this).next().children('span').attr('class', 'counter');

    }
  });
  
});
