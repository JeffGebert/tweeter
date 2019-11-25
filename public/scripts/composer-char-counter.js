
//on ready checks text in textarea element.  if it is above 140 it changes the class from counter to redCounter which changes the font to red.
//updates counter on keyup.

$(document).ready(function() {
  $('textarea').on('keyup', function() {
    let tweetLength = 140 - $(this).val().length;
    $(this).next().children('span').text((140 - $(this).val().length));


    if (tweetLength < 0) {
      $(this).next().children('span').attr('class', 'redCounter');

    } else {
      $(this).next().children('span').attr('class', 'counter');

    }
  });
  
});
