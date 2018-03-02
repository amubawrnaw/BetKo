//check if user alr logged in
var user = document.cookie.split("=")[1];
var path = window.location.pathname;
console.log(path + " <");
if(user!=null){
    if(path.indexOf("index.html")!= -1 || path == "/" || path.length == 0){
        window.location.replace('landing.html');
    }
}else if(path.indexOf("landing.html")!=-1){
    window.location.replace('index.html');
}