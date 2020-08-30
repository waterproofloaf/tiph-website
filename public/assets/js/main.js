// CMS Table Sort
$(document).ready(function () {
  $('#pages-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [3, 4, 5]
    }]
  })

  $('#blog-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [2, 3, 4]
    }]
  })

  $('#admin-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [3, 4]
    }]
  })

  $('#preapps-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [3, 4, 5]
    }]
  })

  $('#apps-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [3, 4, 5]
    }]
  });
});

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

// CMS Donate Switch Toggle
function donate_change(checkbox) {

  //If it is checked.
  var self = $(checkbox).attr('id');
  if (checkbox.checked) {
    $.ajax({
      url: "/cms-donate/toggle/",
      data: { id: self, hide: "true" },
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
      data: { id: self, hide: "false" },
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

// Quill.js
$(document).ready(function () {
  function GetFindOut(value) {
    var element = document.getElementById('findouttxt');
    if (value == 'other')
      element.style.display = 'block';
    else
      element.style.display = 'none';
  }

  // add blog POST called
  $('#addBlog').click(function () {
    // Get the data from the form
    var blog_title = $('#new_blog_title').val();
    var blog_content = $('#new_blog_content').val();
    var keywords = $('#new_blog_keywords').val();

    //COMMENTED OUT BECAUSE IT MAKES THE QUILL EDITOR DISAPPEAR
    //        var newBlog = {
    //            blog_title: blog_title,
    //            blog_content: blog_content;
    //        };

    $.post('addBlog', newBlog, function (data, status) {
      console.log(data);

    });
  });
});

//cms-blog-new-page quill
var blogQuill = new Quill('#blog-quill', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  },
  placeholder: 'Insert body here.',
  theme: 'snow'
});

//cms-proj-new-page quill
var projQuill = new Quill('#proj-quill', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  },
  placeholder: 'Insert body here.',
  theme: 'snow'
});

var quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  },
  placeholder: 'Insert body here.',
  theme: 'snow'
});

var blogForm = document.querySelector('form');
form.onsubmit = function () {
  // Populate hidden form on submit
  var proj_content = document.getElementById('blog_content');

  editor.on('text-change', function () {
    var deltaBlog = editor.getContents();
    var innerBlog = projQuill.root.innerHTML;
    proj_content.innerHTML = JSON.stringify(deltaBlog);
    //proj_content.innerHTML = innerBlog;
  });

  console.log("New Blog Submitted", $(form).serialize(), $(form).serializeArray());

  alert('New Blog Submitted!')
  return false;
};

var projForm = document.querySelector('form');
form.onsubmit = function () {
  // Populate hidden form on submit
  var proj_content = document.getElementById('proj_content');

  editor.on('text-change', function () {
    var deltaProj = editor.getContents();
    var innerProj = projQuill.root.innerHTML;
    proj_content.innerHTML = JSON.stringify(deltaProj);
    //proj_content.innerHTML = innerProj;
  });

  console.log("New Project Submitted", $(form).serialize(), $(form).serializeArray());

  alert('New Project Submitted!')
  return false;
};

$(document).ready(function () {
  $('#addPreApp').click(function () {
    //get data

    var pre_firstname = $('#pre-firstname').val();
    var pre_lastname = $('pre-lastname').val();
    var pre_age = $('pre-age').val();
    var pre_number = $('pre-number').val();
    var pre_email = $('pre-schoolcompany').val();
    var pre_schoolcompany = $('pre-affiliation').val();
    var pre_affiliation = $('pre-affiliation').val();
    var pre_facebook = $('pre-facebook').val();
    var pre_notify = $('input:radio[name=notify-choice]:checked').val();
    var pre_comments = $('textarea#comments').val();

    var newPreApp = {
      pre_firstname: pre_firstname,
      pre_lastname: pre_lastname,
      pre_age: pre_age,
      pre_number: pre_number,
      pre_email: pre_email,
      pre_schoolcompany: pre_schoolcompany,
      pre_affiliation: pre_affiliation,
      pre_facebook: pre_facebook,
      pre_notify: pre_notify,
      pre_comments: pre_comments
    };

    $.post('addPreApp', newPreApp, function (data, status) {
      console.log(data);
    });
  });
});