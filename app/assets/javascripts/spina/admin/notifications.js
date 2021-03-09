$(document).on("click", ".notification [data-close-notification]", function(e) {
  var $notification = $(this).parents(".notification");
  $notification.removeClass("fadeInLeft").addClass("fadeOutLeft");

  setTimeout(function() {
    return $notification.remove();
  }, 400);

  return e.preventDefault();
});