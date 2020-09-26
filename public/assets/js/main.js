// Blog Search
function blog_search() {
  // Declare variables
  var input, filter, container, item, row, content, title, i, txtValue;
  input = document.getElementById("blog-search");
  filter = input.value.toUpperCase();
  container = document.getElementById("blog-container");
  item = container.getElementsByClassName("blog-item");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < item.length; i++) {
    row = item[i].getElementsByClassName("blog-row")[0];
    content = row.getElementsByClassName("blog-post")[0];
    title = content.getElementsByClassName("blog-title")[0];
    if (title) {
      txtValue = title.textContent || title.innerText || '';
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        item[i].style.display = "";
      } else {
        item[i].style.display = "none";
      }
    }
  }
}

// Project Search
function project_search() {
  // Declare variables 
  var input, filter, container, item, row, content, title, i, txtValue;
  input = document.getElementById("project-search");
  filter = input.value.toUpperCase();
  container = document.getElementById("project-container");
  item = container.getElementsByClassName("project-item");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < item.length; i++) {
    row = item[i].getElementsByClassName("project-row")[0];
    content = row.getElementsByClassName("project-post")[0];
    title = content.getElementsByClassName("project-title")[0];
    if (title) {
      txtValue = title.textContent || title.innerText || '';
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        item[i].style.display = "";
      } else {
        item[i].style.display = "none";
      }
    }
  }
}

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

// CMS Project Switch Toggle
function proj_change(checkbox) {

  //If it is checked.
  var self = $(checkbox).attr('id');
  if (checkbox.checked) {
    $.ajax({
      url: "/cms-project/toggle/",
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
      url: "/cms-project/toggle/",
      data: { id: self, publish: "false" },
      success: function (response) {
        $(this).removeAttr("checked");
        $.ajax({
          url: "/cms-project/showcase/",
          data: {id: self, showcase: "false"},
          succ: function (res) {
            $(this).removeAttr("checked");
          } 
        })
      },
      error: function (xhr) { }
    });
  }
}

// CMS Project Showcase Toggle
function proj_showcase(checkbox) {

  //If it is checked.
  var self = $(checkbox).attr('id');
  if (checkbox.checked) {
    $.ajax({
      url: "/cms-project/showcase/",
      data: { id: self, showcase: "true" },
      success: function (response) {
        $(this).attr("checked", "checked");
        $.ajax({
          url: "/cms-project/toggle/",
          data: {id: self, publish: "true"},
          succ: function (res) {
            $(this).attr("checked", "checked");
          } 
        })
      },
      error: function (xhr) { }
    });
  }

  //If it has been unchecked.
  else {
    $.ajax({
      url: "/cms-project/showcase/",
      data: { id: self, showcase: "false" },
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