let tbody = document.getElementById('tbody');

var xhr = new XMLHttpRequest();
xhr.open('GET','/lists',true);
xhr.send();
xhr.onload = ()=>{
    if(xhr.status==200){
        var res = JSON.parse(xhr.responseText);
        console.log(res);
    }
}