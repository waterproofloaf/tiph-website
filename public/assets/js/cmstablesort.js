// CMS Table Sort
$(document).ready(function () {
  $('#pages-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [3, 4, 5, 6]
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
      targets: [4]
    }]
  })

  $('#preapps-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [4]
    }]
  })

  $('#apps-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [4]
    }]
  });
});