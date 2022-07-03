//THIS CODE MAY BE USED ON ANY WEBSITE
//AS LONG AS CREDIT IS CLEARLY GIVEN
//actually only if its copied here? under MIT liscence

window.alert("This will break some websites");

function toggle() {
    let q = document.querySelectorAll('#nightify')
    if(q.length) {
        q[0].parentNode.removeChild(q[0])
        return false
    }
    var h = document.getElementsByTagName('head')[0],
        s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.setAttribute('id', 'nightify');
    s.appendChild(document.createTextNode('html{-webkit-filter:invert(100%) hue-rotate(180deg) contrast(70%) !important; background: #fff;} .line-content {background-color: #fefefe;}'));
    h.appendChild(s); 
    return true
}

var result = toggle();

localStorage.toggle = true;

//page change
page = window.prompt("Enter wanted redirect:")
document.onkeydown = key;

function key(e) {
    if(e.key === 32){
        window.location.assign(page)
    }

}

// tab rename

var tab_name = window.prompt("Enter tab name");
document.title = 'Hello!'; // New title :)

// Tab icon redo

var icon_href = window.prompt("Image adress for tab icon")
var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = icon_href;

//this will be fixed soon

let search = document.querySelector(".search");
let clear = document.querySelector(".clear");

search.onclick = function(){
  document.querySelector(".container").classList.toggle('active');
}
clear.onclick = function(){
  document.getElementById("search").value = "";
}

function openPage(){
var x = document.getElementById("search").value;
  
  if (x === "cookie clicker" "cookie clickerr" "cookie clickeer");{
  window.open("Games/cookie-clicker-master/index.html");}
  
  if (x === "ducklife"){
  window.open("https://www.google.com/");}

  if (x === "FNAF"){
  window.open("Games/FNAF3/fnaf3-main/index.html");  }

  if (x === "sandbox game"){
  window.open("Games/sandgame/index.html");   } 

  if (x === "radius raid"){
  window.open("Games/radius-raid-js13k-master/index.html");   }     

  if (x === "tower defence"){
  window.open("Games/canvas_tower_defense-master/index.html");   } 

  if (x === "javascript racer"){
  window.open("Games/javascript-racer-master/index.html");   } 

  if (x === "geometry dash"){
  window.open("geodash.html");   } 
  

};

//darkmode
window.alert("This will break some websites");

function toggle() {
    let q = document.querySelectorAll('#nightify')
    if(q.length) {
        q[0].parentNode.removeChild(q[0])
        return false
    }
    var h = document.getElementsByTagName('head')[0],
        s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.setAttribute('id', 'nightify');
    s.appendChild(document.createTextNode('html{-webkit-filter:brightness(50%) !important; background: #fff;}  body{background-color: #fefefe;}'));
    h.appendChild(s); 
    document.body.style.background = 'black';
    document.querySelectorAll('p').forEach(p => p.style.color = 'white');
    document.querySelectorAll('span').forEach(span => span.style.color = 'white');
    document.querySelectorAll('h1').forEach(h1 => h1.style.color = 'white');
    document.querySelectorAll('h2').forEach(h2 => h2.style.color = 'white');
    document.querySelectorAll('h3').forEach(h3 => h3.style.color = 'white');
    document.querySelectorAll('h4').forEach(h4 => h4.style.color = 'white');
    document.querySelectorAll('h5').forEach(h5 => h5.style.color = 'white');
    document.querySelectorAll('h6').forEach(h6 => h6.style.color = 'white');
    return true
}

var result = toggle();

localStorage.toggle = true;
// button
var btn = document.createElement("button");  
btn.id = 'autoBtn';
btn.innerHTML = "Start";  
btn.style.position = 'fixed';
btn.style.zIndex = '10000';
btn.style.top = '2vw';
btn.style.left = '2vw';
btn.style.padding = '10px 10px 10px 10px';
btn.style.borderRadius = '10px';
document.body.appendChild(btn);  

dragElement(document.getElementById("autoBtn"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
btn.ondblclick = function(){
    function handler(event) {setInterval(function(){var element=event.target; element.click(); var dispatchMouseEvent = function(target, var_args) {  var e = document.createEvent("MouseEvents");    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));  target.dispatchEvent(e);};dispatchMouseEvent(element, 'mouseover', true, true);dispatchMouseEvent(element, 'mousedown', true, true);dispatchMouseEvent(element, 'click', true, true);dispatchMouseEvent(element, 'mouseup', true, true); }, 1);};document.body.addEventListener('mousemove',handler,false);
}