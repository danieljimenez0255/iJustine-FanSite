/*
    Stop / Start carousel autoplay
*/

$(".btn-customized").on("click", function() {
  if (!$(this).hasClass("disabled")) {
    if ($(this).hasClass("btn-pause")) {
      $(".carousel").carousel("pause");
    } else {
      $(".carousel").carousel("cycle");
    }

    $(".btn-pause, .btn-cycle").toggleClass("disabled");
    $(this).blur();
  }
});

/* Make text rainbow colored */
/* The js function gets the colors. Gots to
give much thanks to rainbowcoding.com
for the having the solution  */
function color_from_hue(hue) {
  var h = hue / 60;
  var c = 255;
  var x = (1 - Math.abs((h % 2) - 1)) * 255;
  var color;

  var i = Math.floor(h);
  if (i == 0) color = rgb_to_hex(c, x, 0);
  else if (i == 1) color = rgb_to_hex(x, c, 0);
  else if (i == 2) color = rgb_to_hex(0, c, x);
  else if (i == 3) color = rgb_to_hex(0, x, c);
  else if (i == 4) color = rgb_to_hex(x, 0, c);
  else color = rgb_to_hex(c, 0, x);

  return color;
}

function rgb_to_hex(red, green, blue) {
  var h = ((red << 16) | (green << 8) | blue).toString(16);
  // add the beginning zeros
  while (h.length < 6) h = "0" + h;
  return "#" + h;
}

/* It'll be wrapped into 
jQuery to make using the js function 
easier to use */

(function($) {
  $.fn.rainbowize = function() {
    return this.each(function() {
      var rainbowtext = "";
      var hue = 0;
      var step = 0;

      // get the current text inside element
      var text = $(this).text();

      // hue is 360 degrees
      if (text.length > 0) step = 360 / text.length;

      // iterate the whole 360 degrees
      for (var i = 0; i < text.length; i++) {
        rainbowtext =
          rainbowtext +
          '<span style="color:' +
          color_from_hue(hue) +
          '">' +
          text.charAt(i) +
          "</span>";
        hue += step;
      }

      $(this).html(rainbowtext);
    });
  };
})(jQuery);

/* Modernizer to detect if rainbow
text is supported*/
if (Modernizr.backgroundcliptext) {
  var div = document.createElement("div");
  if ("backgroundClip" in div.style);

  "Webkit Moz O ms Khtml".replace(/([A-Za-z]*)/g, function(val) {
    if (val + "BackgroundClip" in div.style) return true;
  });
}
/* Final Product of rainbow text */
$(document).ready(function() {
  if (!$("html").hasClass("backgroundclip"))
    $(".rainbow").addClass("rainbowize");
  else $(".rainbow").rainbowize();
});

/* Allow for video to pause and play */
$(".playControls").click(function() {
  this.paused ? this.play() : this.pause();
});
