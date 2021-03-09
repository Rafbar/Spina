$(document).on("click", ".table-clickable tr", function(e) {
  var $firstRow;
  var checkbox;
  var $row = $(this).closest("tr");
  var link = $row.find("a.table-link:first")[0];

  if (link) {
    return link.click();
  } else {
    checkbox = $(this).find("input[type=\"checkbox\"]:first, input[type=\"radio\"]:first");

    if (checkbox.length > 0) {
      if (!checkbox.prop("checked") && e.shiftKey) {
        $firstRow = $(".table-clickable tr input[type=\"checkbox\"]:checked:first").closest("tr");

        if ($firstRow.index() < $row.index()) {
          $firstRow.nextUntil($row).each(function() {
            return $(this).find("input[type=\"checkbox\"]:first").prop("checked", true);
          });
        } else {
          $firstRow.prevUntil($row).each(function() {
            return $(this).find("input[type=\"checkbox\"]:first").prop("checked", true);
          });
        }

        document.getSelection().removeAllRanges();
      }

      checkbox.prop("checked", !checkbox.prop("checked"));
      checkbox.trigger("checked");
      return e.stopPropagation();
    }
  }
});

$(document).on("click", ".table-clickable .table-link", function(e) {
  return e.stopPropagation();
});

$(document).on("click", ".table-clickable tr input", function(e) {
  return e.stopPropagation();
});

$(document).on("keyup", ".search-input input", function(e) {
  $(this).parent().removeClass("animated small-shake");

  if ($(this).val() === "") {
    $(this).parent().find(".clear-input").fadeOut(200);

    if (e.keyCode === 13) {
      return $(this).parent().addClass("animated small-shake");
    }
  } else {
    return $(this).parent().find(".clear-input").fadeIn(200);
  }
});

$(document).on("click", ".clear-input", function() {
  var link = $(this);
  var input = link.siblings("input");
  input.val("");
  input.focus();
  input.trigger("keyup");
  link.fadeOut(200);
  return false;
});

$(document).on("keyup + change", ".table-container .search-input input", function() {
  var datatable = $(this).parent().parent().find("table.datatable").dataTable();
  return datatable.fnFilter($(this).val());
});

$(document).on("change", ".dd", function() {
  var serialized = $(this).nestable("serialize");
  var sort_url = $(this).data("sort-url");

  return $.post(sort_url, {
    list: serialized
  });
});

var ready = function() {
  var headerHeight;
  var header;

  if (header = document.getElementById("header")) {
    headerHeight = header.getBoundingClientRect().height;

    $("section#main").css({
      paddingTop: headerHeight
    });

    $("section#main trix-toolbar").css({
      top: headerHeight + 15
    });
  }

  $("#login_wrapper").css("margin-top", $(document).innerHeight() / 8);

  $("input[type=\"file\"][data-customfileinput]:visible").each(function() {
    return $(this).customFileInput();
  });

  if ($("input[data-switch]").length > 0) {
    $("input[data-switch]").spinaSwitch();
  }

  if ($(".datepicker").length > 0) {
    return $(".datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      firstDay: 1
    });
  }
};

$(document).on("turbolinks:load", ready);