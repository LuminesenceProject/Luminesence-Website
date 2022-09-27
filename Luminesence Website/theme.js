const themeMap = {
  dark: 'light',
  light: 'solar',
  solar: 'dark'
};

const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);
}

document.getElementById('themeButton').onclick = toggleTheme;


// client updater

//list for website.
//client version on update screen
//newest version on update screen
//current updates avalible
 
var version = '1.2.5';
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var updateDate = 2022-9-30;
var currentDate = today.getFullYear() - (today.getMonth()+1) - today.getDate();

var updateScreen = document.getElementById("updateScreen");
updateScreen.style.display = 'none';

document.getElementById("close").addEventListener("click", close);
function close() {
  updateScreen.style.display = 'none';
  return;
}

if (currentDate < updateDate) {
  updateScreen.style.display = 'block';
  const themeMap = {};
}

if (currentDate < updateDate - 8) {
  document.getElementById("close").style.display = 'none';
  updateScreen.style.display = 'block';
}


// Luminesence Interface Thingy
// forked from https://github.com/jangodev/CrownJS

let style = document.createElement('style')
let title = document.createElement('h1')
let ds1 = document.createElement('p')
ds1.id = 'ds1'
title.id = 'title'
let btn1 = document.createElement('button')
btn1.id = 'btn1'

let btn2 = document.createElement('button')
btn2.id = 'btn2'
let btn3 = document.createElement('button')
btn3.id = 'btn3'
let btn4 = document.createElement('button')
btn4.id = 'btn4'
let btn5 = document.createElement('button')
btn5.id = 'btn5'
let btn6 = document.createElement('button')
btn6.id = 'btn6'
let btn7 = document.createElement('button')
btn6.id = 'btn7'

ds1.style.display = 'none'
let author = document.createElement('h2')
author.id = 'author'
document.head.appendChild(style)
let mainframe = document.createElement('div');
let logo = document.createElement('img')
mainframe.appendChild(logo)
logo.src = 'data:image/jpeg;base64,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'
mainframe.id = 'main'
document.body.appendChild(mainframe)
mainframe.append(title)

mainframe.append(author)
mainframe.appendChild(ds1)
mainframe.append(btn1)
mainframe.append(btn2)
mainframe.append(btn3)
mainframe.append(btn4)
mainframe.append(btn5)
mainframe.append(btn6)
mainframe.append(btn7)

title.textContent = 'Luminesence'
author.textContent = 'A hack interface'
btn1.textContent = 'History Flooder'
btn2.textContent = 'Tab Cloak'
btn3.textContent = 'Darkmode Page'
btn4.textContent = 'Themes'
btn5.textContent = 'Autoclicker'
btn6.textContent = 'Troll'
btn7.addEventListener('click', function () {
  !function () { for (var t = '/', o = 0; o < 20; o++)history.pushState(0, 0, t += o.toString()) }();
  ds1.style.display = ''
  ds1.textContent = 'Activated History Flooder'
});

btn5.onclick = function autoclicker() {
  var autoBtn = document.createElement('button');  
            autoBtn.id = 'autoBtn';
            autoBtn.innerHTML = 'Start';  
            autoBtn.style.position = 'fixed';
            autoBtn.style.zIndex = '10000';
            autoBtn.style.top = '2vw';
            autoBtn.style.left = '2vw';
            autoBtn.style.padding = '10px 10px 10px 10px';
            autoBtn.style.borderRadius = '10px';
            document.body.appendChild(autoBtn);  
            
            dragElement(document.getElementById('autoBtn'));
            
            function dragElement(elmnt) {
              var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
              if (document.getElementById(elmnt.id + 'header')) {
                document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
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
                elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
                elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
              }
            
              function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
              }
            }
            autoBtn.onclick = function(){
                function handler(event) {setInterval(function(){var element=event.target; element.click(); var dispatchMouseEvent = function(target, var_args) {  var e = document.createEvent('MouseEvents');    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));  target.dispatchEvent(e);};dispatchMouseEvent(element, 'mouseover', true, true);dispatchMouseEvent(element, 'mousedown', true, true);dispatchMouseEvent(element, 'click', true, true);dispatchMouseEvent(element, 'mouseup', true, true); }, 1);};document.body.addEventListener('mousemove',handler,false);
            }
}

btn6.onclick = function hide() {
  mainframe.style.display = 'none';
}

btn7.onclick = function troll() {
  onbeforeunload = function(){localStorage.x=1};
  setTimeout(function(){
    while(1)location.reload(1)
  }, 1000)
}

btn2.onclick = function tabcloak() {

  let tabname = prompt('Enter Tab Name')
  document.title = tabname
  ds1.style.display = ''
  ds1.textContent = 'Activated Tab Cloak'

}

btn4.onclick = function themes() {

  let color = prompt('Please choose a theme. Available Themes: Black, Blue, Green.')

  if (color == 'Black') {
    mainframe.style.backgroundColor = 'black'
    title.style.color = 'white'
    ds1.style.color = 'lightgray'
  }
  else {
    mainframe.style.backgroundColor = 'black'
    title.style.color = 'white'
    ds1.style.color = 'white'
  }
  
  
  if (color == 'Blue') {
    mainframe.style.backgroundColor = 'darkblue'
    title.style.color = 'lightgrey'
    ds1.style.color = 'green'
  }

    if (color == 'Green') {
    mainframe.style.backgroundColor = 'Green'
    title.style.color = 'black'
    ds1.style.color = 'black'
  }


    ds1.textContent = 'Activated Themes. Selected Theme: ' + color
  ds1.style.display = ''
}

const dragElement = (element, dragzone) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const dragMouseUp = () => {
    document.onmouseup = null;
    document.onmousemove = null;

    element.classList.remove('drag');
  };

  const dragMouseMove = (event) => {

    event.preventDefault();
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
  };

  const dragMouseDown = (event) => {
    event.preventDefault();

    pos3 = event.clientX;
    pos4 = event.clientY;

    element.classList.add('drag');

    document.onmouseup = dragMouseUp;
    document.onmousemove = dragMouseMove;
  };
};

const dragable = document.getElementById('mainframe'),
  dragzone = document.getElementById('mainframe');

dragElement(dragable, dragzone);



btn3.onclick = function darkmode() {
  function toggle() {
    let q = document.querySelectorAll('#nightify');
    if(q.length) {
        q[0].parentNode.removeChild(q[0]);
        return false
    };
    var h = document.getElementsByTagName('head')[0],
        s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.setAttribute('id', 'nightify');
    s.appendChild(document.createTextNode('html{-webkit-filter:brightness(75%) !important; background: #fff;}  body{background-color: #fefefe;}'));
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
}

style.textContent = `
#main {
  background-color: black;
  width: 800px;
  height: 600px;
  border-radius: 10px;
  animation-name: slidein;
  animation-duration: 2s;
  text-align: center;
  margin: 0px auto;
  position: relative;
  overflow: auto;
}

#title, #author {
  color: white;
  font-family: 'Helvetica';
  padding: 10px;
}



#btn1, #btn2, #btn3, #btn4, #btn5 {
  appearance: none;
  backface-visibility: hidden;
  background-color: #27ae60;
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  margin: auto auto;
  font-family: Inter,-apple-system,system-ui,'Segoe UI',Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: normal;
  line-height: 1.5;
  outline: none;
  overflow: hidden;
  padding: 13px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  margin-right: 5px;
}




#btn1:hover,#btn2:hover,#btn1:hover, #btn3:hover, #btn4:hover, #btn5:hover {
  background-color: #1e8449;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

#btn1:active, #btn2:active, #btn3:active, #btn4:active, #btn5:active {
  transform: translateY(2px);
  transition-duration: .35s;
}

#ds1 {
  color: yellow;
  font-family: 'Helvetica';
  font-family: 10px;
}
@keyframes slidein {
  0% {
    opacity: 0%
  }

  100% {
    opactiy: 100%
  }
}

#btn6 {
  position = 'absolute';
  zIndex = '10000';
  top = '0';
  right = '0';
  padding = '10px 10px 10px 10px';
  borderRadius = '10px';
}

`


btn6.innerHTML = 'X';  
btn6.style.position = 'absolute';
btn6.style.zIndex = '10000';
btn6.style.top = '0';
btn6.style.right = '0';
btn6.style.padding = '2px 4px 2px 4px';
btn6.style.borderRadius = '10px';
btn6.style.background = 'red';