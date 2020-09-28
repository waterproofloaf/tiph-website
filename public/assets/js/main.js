// CMS Department Switch Toggle
function department_change(checkbox) {

  //If it is checked.
  var self = $(checkbox).attr('id');
  if (checkbox.checked) {
    $.ajax({
      url: "/cms-edit-application/toggle/",
      data: { id: self, available: "true" },
      success: function (response) {
        $(this).attr("checked", "checked");
      },
      error: function (xhr) { }
    });
  }

  //If it has been unchecked.
  else {
    $.ajax({
      url: "/cms-edit-application/toggle/",
      data: { id: self, available: "false" },
      success: function (response) {
        $(this).removeAttr("checked");
      },
      error: function (xhr) { }
    });
  }
}

// CMS Position Switch Toggle
function position_change(checkbox) {

  //If it is checked.
  var self = $(checkbox).attr('id');
  if (checkbox.checked) {
    $.ajax({
      url: "/cms-edit-application/pos-toggle/",
      data: { id: self, available: "true" },
      success: function (response) {
        $(this).attr("checked", "checked");
      },
      error: function (xhr) { }
    });
  }

  //If it has been unchecked.
  else {
    $.ajax({
      url: "/cms-edit-application/pos-toggle/",
      data: { id: self, available: "false" },
      success: function (response) {
        $(this).removeAttr("checked");
      },
      error: function (xhr) { }
    });
  }
}

// CMS Donate Switch Toggle
function donate_change(checkbox) {

  //If it is checked.
  var self = $(checkbox).attr('id');
  if (checkbox.checked) {
    $.ajax({
      url: "/cms-donate/toggle/",
      data: { id: self, visible: "true" },
      success: function (response) {
        $(this).attr("checked", "checked");
      },
      error: function (xhr) { }
    });
  }

  //If it has been unchecked.
  else {
    $.ajax({
      url: "/cms-donate/toggle/",
      data: { id: self, visible: "false" },
      success: function (response) {
        $(this).removeAttr("checked");
      },
      error: function (xhr) { }
    });
  }
}

// CMS Blog Switch Toggle
function blog_change(checkbox) {

  //If it is checked.
  var self = $(checkbox).attr('id');
  if (checkbox.checked) {
    $.ajax({
      url: "/cms-blog/toggle/",
      data: { id: self, publish: "true" },
      success: function (response) {
        $(this).attr("checked", "checked");
      },
      error: function (xhr) { }
    });
  }

  //If it has been unchecked.
  else {
    $.ajax({
      url: "/cms-blog/toggle/",
      data: { id: self, publish: "false" },
      success: function (response) {
        $(this).removeAttr("checked");
      },
      error: function (xhr) { }
    });
  }
}