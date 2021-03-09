$(document).on("direct-uploads:start", "form", function(e) {
  return $(this).find(".customfile").addClass("loading");
});

$(document).on("direct-uploads:end", "form", function(e) {
  return $(this).find(".customfile").removeClass("loading");
});

$(document).on("change", "input[type=\"file\"]", function(e) {
  var $form = $(this).parents("form");
  return $form.find("input[type=\"submit\"]").click();
});

$(document).on("click", ".organize-switch", function(e) {
  var $items = $(".gallery .infinite-scroll .item");
  var disabled = $items.draggable("option", "disabled");

  if (disabled) {
    $(this).addClass("button-success");
    $(this).text($(this).attr("data-done-organizing"));
    $(this).prepend("<i class=\"fa fa-random\"></i>");
  } else {
    $(this).removeClass("button-success");
    $(this).text($(this).attr("data-organize-images"));
    $(this).prepend("<i class=\"fa fa-random\"></i>");
  }

  $items.draggable("option", "disabled", !disabled);
  return e.preventDefault();
});

var ready = function() {
  $(".media-folder").droppable({
    drop: function(event, ui) {
      var url = $(this).attr("data-add-to-media-folder-url");
      var image_id = $(ui.draggable).attr("data-image-id");

      return $.ajax({
        url: url,
        type: "PUT",

        data: {
          image_id: image_id
        },

        dataType: "json",

        success: result => {
          $(ui.draggable).addClass("dropped").fadeOut();
          var imageCount = parseInt($(this).find(".media-folder-thumbnail").attr("data-badge"));
          var imgSrc = $(ui.draggable).find("img").attr("src");
          $(this).removeClass("dropping");
          $(this).find(".media-folder-thumbnail").attr("data-badge", imageCount + 1);
          return $(this).find(".media-folder-thumbnail img").attr("src", imgSrc);
        }
      });
    },

    over: function(event, ui) {
      $(ui.draggable).addClass("dropping");
      return $(this).addClass("dropping");
    },

    out: function(event, ui) {
      $(ui.draggable).removeClass("dropping");
      return $(this).removeClass("dropping");
    }
  });

  return $(".gallery .infinite-scroll .item").draggable({
    revert: "invalid",
    disabled: true
  });
};

$(document).on("turbolinks:load", ready);