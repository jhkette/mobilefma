//config js file that sets theme globally across application

$(document).bind("mobileinit", function() {
  $.mobile.page.prototype.options.theme = "a"; // set global theme to 'a' on mobileinit
});
