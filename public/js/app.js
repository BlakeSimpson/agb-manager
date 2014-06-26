$(function() {
  "use strict";

  var $origContent = $(".original-content"),
    $form = $("form"),
    $textarea = $form.find("textarea"),
    $locale = $form.find(".locale"),
    $preview = $(".preview-content"),
    $save = $(".btn.save"),
    $spinner = $("<img src='/img/spinner.gif'>"),
    $noteSave = $(".saved-note"),
    $noteUnSave = $(".unsaved-note"),
    $switcher = $(".locale-switcher"),
    url = $form.attr("action"),
    saveContent = $save.html(),
    speed = 400;

  function renderPreview (firstRun) {
    var content = $textarea.val();

    $.ajax("/preview", {
      method: "post",
      type: "text",
      data: {
        content: content
      },
      success: function (data) {
        $preview.html(data);
      }
    });

    return false;
  }

  function performSave () {
    var content = $textarea.val(),
      locale = $locale.val(),
      showSuccess = false;

    $.ajax(url, {
      method: "post",
      type: "text",
      data: {
        content: content,
        locale: locale
      },
      beforeSend: function () {
        $save.html( $spinner );
      },
      success: function () {
        showSuccess = true;
      },
      complete: function () {
        // A delay to give the user feedback
        setTimeout(function() {
          $save.html( saveContent );

          if ( showSuccess ) {
            $noteSave
              .fadeIn(speed)
              .delay(2000)
              .fadeOut(speed);

            $noteUnSave.fadeOut(speed);
          }
        }, 1000);
      }
    });

    return false;
  }

  function loadContent () {
    var content = $origContent.text(),
      lines = content.split("\n"),
      parts = [],
      offset = 8;

    for ( var i = 0, j = lines.length; i < j; i++ ) {
      var line = lines[ i ],
        contentTest = line.match(/\S+/);

      if ( line && line.length && i > 0 ) {
        line = line.substring(offset, line.length);
      }

      if ( i === 0 && line === "" ) { continue;}

      parts.push(line);
    }

    $textarea.val( parts.join("\n") );

    renderPreview(true);
  }

  function showLocaleMenu () {
    $switcher.find(".available-locales").show();
  }


  $textarea.on("keyup", function() {
    renderPreview();
    $noteUnSave.fadeIn(speed);
  });

  $form.on("submit", performSave);
  $switcher.on("click", showLocaleMenu);

  loadContent();
});
