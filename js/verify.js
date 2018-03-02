//check if user alr logged in
var user = document.cookie.split("=")[1];
var path = window.location.href;
var file = path.split("/")[3];
console.log(file + " <");
if(user!=null){
    if(file.indexOf("index.html")!= -1 || file == ""){
        window.location.replace('landing.html');
    }
}else if(file.indexOf("landing.html")!=-1){
    window.location.replace('index.html');
}