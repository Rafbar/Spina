$.fn.spinaSwitch = function() {
  return this.each(function() {
    var klass;
    var input;

    if (!$(this).attr("data-plugin-switch")) {
      input = $(this);
      input.attr("data-plugin-switch", true);
      input.hide();

      if (input.is(":checked")) {
        klass = "switch active";
      } else {
        klass = "switch";
      }

      return input.after(
        "<a href=\"#" + input.attr("id") + "\" class=\"" + klass + "\"> <span class=\"knob\"></span> </a>"
      );
    }
  });
};

$(document).on("click", "a.switch", function(e) {
  return toggleSwitch(e);
});

$(document).on("touchend", "a.switch", function(e) {
  return toggleSwitch(e);
});

var toggleSwitch = function(e) {
  var checkbox = $(e.currentTarget);
  var input = $(checkbox.attr("href"));

  if (checkbox.hasClass("activated") || checkbox.hasClass("active")) {
    checkbox.removeClass("active");
    checkbox.removeClass("activated");
    checkbox.addClass("deactivated");
    input.prop("checked", false);
  } else {
    checkbox.addClass("activated");
    checkbox.removeClass("deactivated");
    input.prop("checked", true);
  }

  input.trigger("change");
  return false;
};