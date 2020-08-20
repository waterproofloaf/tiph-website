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
    $('#addBlog').click(function() {
    // Get the data from the form
        var blog_title = $('#new_blog_title').val();
        var blog_content = $('#new_blog_content').val();
        var keywords = $('#new_blog_keywords').val();
        
    //COMMENTED OUT BECAUSE IT MAKES THE QUILL EDITOR DISAPPEAR
//        var newBlog = {
//            blog_title: blog_title,
//            blog_content: blog_content;
//        };

        $.post('addBlog', newBlog, function(data, status) {
          console.log(data);

        });
    });
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

var form = document.querySelector('form');
form.onsubmit = function () {
  // Populate hidden form on submit
  var about = document.querySelector('input[name=about]');
  about.value = JSON.stringify(quill.getContents());

  console.log("Submitted", $(form).serialize(), $(form).serializeArray());

  // No back end to actually submit to!
  alert('Submitted!')
  return false;
};

// CMS Search
function cms_search() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("cms-search");
  filter = input.value.toUpperCase();
  table = document.getElementById("pages-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// CMS Sort
var mylist = $('#entries-table');
var listitems = mylist.find('tr');
listitems.sort(function(a, b) {
  return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
  // return $(a).getElementsByTagName('time').localeCompare($(b).getElementsByTagName('time'));
})
$.each(listitems, function(idx, itm) { mylist.append(itm); });


