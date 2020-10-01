// CMS Table Sort
$(document).ready(function () {
  $('#pages-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [3, 4, 5, 6]
    }]
  })

  $('#dept-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [3, 4]
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

  $('#positions-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [1]
    }]
  });

  $('#donate-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [3, 4, 5]
    }]
  });

  $('#donate-mode-table').DataTable({
    "aaSorting": [],
    columnDefs: [{
      orderable: false,
      targets: [2, 3, 4]
    }]
  });
});