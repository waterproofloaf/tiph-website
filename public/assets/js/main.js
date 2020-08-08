function collapseAbout(){
    var coll = document.getElementsByClassName('collapsible');
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }   
}

function GetFindOut(value){
    var element = document.getElementById('findouttxt');
    if(value=='other')
        element.style.display='block';
    else  
        element.style.display='none';
}
  
  