$(document).on("click", ".tabs li a[href^=\"#\"]", function() {
  var link = $(this);
  var tabs = link.parents(".tabs");
  $(".tab-content").removeClass("active");
  tabs.find("li").removeClass("active");
  link.parent("li").addClass("active");
  $(link.attr("href")).addClass("active");
  return false;
});