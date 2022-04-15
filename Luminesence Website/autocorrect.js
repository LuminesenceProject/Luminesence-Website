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
  
  if (x === "cookie clicker; cookie clickerr; cookie clickeer, cookie clickker, cookie cliccker, cookie cliicker, cookie cllicker, cookie cclicker, cookie  clicker, cookiee clicker, cookiie clicker, cookkie clicker, coookie clicker, coookie clicker, ccookie clicker,"){
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