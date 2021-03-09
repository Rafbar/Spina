$.fn.uploadPhoto = function() {
  return $(this).fileupload({
    dataType: "script",
    singleFileUploads: true,
    replaceFileInput: true,
    dropZone: $(this).find(".photo-field"),

    add: function(e, data) {
      var types = /(\.|\/)(gif|jpe?g|png)$/i;
      var file = data.files[0];

      if (types.test(file.type) || types.test(file.name)) {
        $(this).find(".customfile").addClass("loading");
        return data.submit();
      } else {
        return alert(((file.name) + " is not gif-, jpeg- or png- file"));
      }
    },

    done: function(e, data) {
      return $(this).find(".customfile").removeClass("loading");
    }
  });
};

$.fn.uploadDocument = function() {
  return $(this).fileupload({
    dataType: "script",
    singleFileUploads: true,
    dropZone: $(this).find(".attachment-field"),
    maxNumberOfFiles: 1,

    add: function(e, data) {
      var types = /(\.|\/)(pdf|docx?|rtf|txt)$/i;
      var file = data.files[0];

      if (types.test(file.type) || types.test(file.name)) {
        $(this).find(".customfile").addClass("loading");
        return data.submit();
      } else {
        return alert(((file.name) + " is not pdf-, word-, txt- or rtf- file"));
      }
    },

    done: function(e, data) {
      return $(this).find(".customfile").removeClass("loading");
    }
  });
};