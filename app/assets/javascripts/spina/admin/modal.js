$.hideModal = function() {
  return hideModal();
};

$.fn.modal = function() {
  return showModal($(this));
};

$(document).on("click", "a[data-toggle=\"modal\"]", function() {
  var link = $(this);
  var modal = $(link.attr("href"));
  return showModal(modal);
});

$(document).on("click", "body.overlay", function() {
  return hideModal();
});

$(document).on("click", "[data-dismiss=\"modal\"]", function() {
  return hideModal();
});

$(document).on("keyup", "body.overlay", function(e) {
  if (e.keyCode === 27) {
    return hideModal();
  }
});

$(document).on("click", ".modal", function(e) {
  return e.stopPropagation();
});

var hideModal = function() {
  $("body").removeClass("overlay");
  $("#overlay .modal").addClass("flyOut");

  $("#overlay").fadeOut(300, function() {
    return $(this).remove();
  });

  return false;
};

var showModal = function(element) {
  var modal = element.clone();
  modal.addClass("animated flyIn");

  if ($("#overlay").length < 1) {
    $("body").append("<div id=\"overlay\"></div>");
  } else {
    $("#overlay").html("");
  }

  var maxheight = window.innerHeight - (window.innerHeight / 8) - 150;

  modal.css({
    "margin-top": window.innerHeight / 8
  });

  modal.find("section").css({
    "max-height": maxheight
  });

  modal.appendTo("#overlay");
  $("#overlay").fadeIn(400);
  modal.show();
  modal.find("input[type=\"file\"][data-customfileinput]").customFileInput();
  $("body").addClass("overlay");
  return false;
};