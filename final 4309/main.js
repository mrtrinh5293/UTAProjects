// MOBILE NAV JS

$(document).ready(function() {
  var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
  $('#js-centered-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-centered-navigation-menu').slideToggle(function(){
      if($('#js-centered-navigation-menu').is(':hidden')) {
        $('#js-centered-navigation-menu').removeAttr('style');
      }
    });
  });
	  var menuItems = $('#js-centered-navigation-menu a').unbind();
	menuItems.on('click', function(e) {
    $('#js-centered-navigation-menu').removeAttr('style');
	});
});

// END MOBILE NAV JS


// FADE IN IMAGES EFFECT

$(document).ready(function () {
      $('img[id^=img]').hide().fadeIn(800);
      $('img[id^=sample]').hide().fadeIn(800);
      $('#sy-portrait').hide().fadeIn(800);
      $('img[id^=hq]').hide().fadeIn(1000);
 });

// END FADE IN IMAGES EFFECT


// CONTACT FORM JS



// END CONTACT FORM JS// JavaScript Document