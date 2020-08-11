$(document).ready(function(){
    function GetFindOut(value){
        var element = document.getElementById('findouttxt');
        if(value=='other')
            element.style.display='block';
        else  
            element.style.display='none';
    }
});

var quill = new Quill('#editor-container', {
    modules: {
      toolbar: [
        ['bold', 'italic'],
        ['link', 'blockquote', 'code-block', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    },
    placeholder: 'Seize the day!',
    theme: 'snow'
  });
  
var form = document.querySelector('form');
form.onsubmit = function() {
// Populate hidden form on submit
var about = document.querySelector('input[name=about]');
about.value = JSON.stringify(quill.getContents());

console.log("Submitted", $(form).serialize(), $(form).serializeArray());

// No back end to actually submit to!
alert('Weeee')
return false;
};


  