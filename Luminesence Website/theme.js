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
 
var version = '1.3.6';
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var updateDate = 2022-9-20;
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
/*
let style = document.createElement('style')
let title = document.createElement('h1')
let a = document.createElement('a')
a.href = 'https://github.com/jangodev/CrownJS'
title.style.fontSize = '32'
a.id = 'a'
let ds1 = document.createElement('p')
ds1.id = 'ds1'
ds1.style.fontSize = '24'
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
btn7.id = 'btn7'
let btn8 = document.createElement('button')
btn8.id = 'btn8'
let btn9 = document.createElement('button')
btn9.id = 'btn9'
let btn10 = document.createElement('button')
btn10.id = 'btn10'
let consolebtn = document.createElement('button')
consolebtn.id = 'consolebtn'

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
mainframe.append(a)
mainframe.append(btn1)
mainframe.append(btn2)
mainframe.append(btn3)
mainframe.append(btn4)
mainframe.append(btn5)
mainframe.append(btn6)
mainframe.append(btn7)
mainframe.append(btn8)
mainframe.append(btn9)
mainframe.append(btn10)
mainframe.append(consolebtn)

title.textContent = 'Luminesence'
author.textContent = 'A hack interface'
btn1.textContent = 'History Flooder'
btn2.textContent = 'Tab Cloak'
btn3.textContent = 'Darkmode Page'
btn4.textContent = 'Themes'
btn5.textContent = 'Autoclicker'
btn7.textContent = 'Troll'
btn8.textContent = 'Info'
consolebtn.textContent = 'Console'
btn9.textContent = 'Notepad'
btn10.textContent = 'Ponies'

btn1.onclick = function flood() {
  ds1.style.display = ''
  ds1.textContent = 'Activated Flood'
  javascript:var num=prompt('How Times Do You Want This Page To Show Up In your History?\Developed By: Schoolcheats');done=false;x=window.location.href;for (var i=1; i<=num; i++){history.pushState(0, 0, i==num?x:i.toString());if(i==num){done=true}}if(done===true){alert('Flooding Successful!\n '+window.location.href+' \nIs Now In Your History '+num+(num==1?' time.':' Times. \nMade by Schoolcheats'))}
}


btn2.onclick = function tabcloak() {

  let tabname = prompt('Enter Tab Name')
  document.title = tabname
  ds1.style.display = ''
  ds1.textContent = 'Activated Tab Cloak'

}

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
  javascript:(function(){function d(f){ctx.fillStyle='colorStr';ctx.fillRect(0,0,a,b/20);ctx.fillRect(0,0,a/30,b);ctx.fillRect(0,19*b/20,a,b/20);ctx.fillRect(29*a/30,0,a/30,b)}function e(){ctx.clearRect(0,0,a,b/20);ctx.clearRect(0,0,a/30,b);ctx.clearRect(0,19*b/20,a,b/20);ctx.clearRect(29*a/30,0,a/30,b)}var c=document.createElement('canvas'),a=window.innerWidth,b=window.innerHeight;c.width=a;c.height=b;document.body.appendChild(c);c.style.position='absolute';c.style.top='0px';c.style.left='0px';ctx=c.getContext('2d');d('black');setTimeout(function(){e();setTimeout(function(){d('black');setTimeout(function(){e();setTimeout(function(){d('black');setTimeout(function(){window.open('https:////dev.92spoons.com/sub/YouHaveBeenHacked.html','_blank');document.body.removeChild(c)},100)},100)},100)},100)},100)})();
}



consolebtn.onclick = () => {

  let stylething = document.createElement('style')
  document.head.appendChild(stylething)
  let main = document.createElement('div')
  main.id = 'main'
  document.body.appendChild(main)
  main.appendChild(style)
  let goback = document.createElement('button')
  goback.id = 'goback'
  let console = document.createElement('input')
  let box = document.createElement('div')
  console.id = 'console'
  box.id = 'box'
  main.appendChild(console)
  main.appendChild(box)
  console.placeholder = 'Enter a command (crwn info for help)'
  goback.style.display = ''
  goback.textContent = 'Go back'
  main.appendChild(goback)

  goback.onclick = () => {
    main.style.display = 'none'
  }

  stylething.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
#console {
  width: 500px !important;
  border-style: none;
  height: 50px !important;
  background-color: black;
  color: green;
  font-family: 'Open Sans';
  margin: auto auto;
}
#console::placeholder {
  color: green;
  font-family: 'Open Sans';
}
#goback {
z-index: 999999 !important;
}
#box {
  color: green;
  width: 294px !important ;
  height: 300px !important;
  background-color: black;
  margin: 50px;;
  padding: 5px;
  padding-left: 200px;
  font-family: 'Open Sans';
  border-style: none;
 overflow-y: scroll; 
}
`




  console.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var extra = "";
      let output = document.createElement('p')
      output.textContent = console.value
      box.appendChild(output)


      if (console.value.includes('crwn')) {
        output.value = console.value
      }
      else {
        output.textContent = 'Unknown command ~ ' + console.value + '~'
        output.style.color = 'red'
      }
      if (console.value == 'crwn console blue') {
        output.textContent = 'Changed console theme to blue'
        box.style.backgroundColor = 'blue'

      }
      else if (console.value == 'crwn console green') {
        output.value = console.value
        output.textContent = 'Changed console theme to green'
        box.style.backgroundColor = 'green'
      }
      else if (console.value == 'crwn custom theme') {
        let bozo = prompt('Enter Image URL')
        output.value = console.value
        document.body.style.backgroundImage = 'url(' + bozo + ')';
        output.textContent = 'Added custom theme to page'
      }

      else if (console.value == 'crwn new') {
        output.textContent = "if (console.value == ~command- name-here~ { code here } else {output.textContent ~Unknown command~ ' + console.value + ''' output.style.color = 'red'}"


      }
      else if (console.value == 'crwn edit') {
        javascript: document.body.contentEditable = true; document.designMode = 'on'; void 0;
        output.textContent = 'Edit Mode turned on.'

      }
      else if (console.value == 'crwn create cmd') {
        let name = prompt('Name your command')
        let prefix = 'crwn'
        let func = prompt('Paste your JS code. Do crwn new for the basic command creation guide.')
        let store = prefix + ' ' + name
        extra = store;
        eval(func);
        window.localStorage.setItem('store', store.toString());
        window.localStorage.setItem('func', func.toString());
        output.textContent = 'Executed ' + store

      }

      else if (console.value == 'crwn proxify site') {
        let proxify = prompt('Enter site URL')
        var code2 = ' width=100% height=100%>'; var proxyDomain = 'https://palladium-2.anirudhiscool.repl.co/service/gateway/?url='; var codeIP1 = code1.concat(proxyDomain); var codeIP2 = codeIP1.concat(proxify); var codeIP3 = codeIP2.concat(code2); document.write(codeIP3);
      }

      else if (console.value == 'crwn install pall') {
        output.textContent = 'Downloaded palladium proxy. Using repl.co domain.'
        let proxyDomain = 'https://palladium-2.anirudhiscool.repl.co/service/gateway/?url=';
      } 
      
      else if (console.value == 'crwn install snake') {
        output.textContent = 'Snake installed.'
        javascript:Q=64;m=b=Q*Q;a=[P=l=u=d=p=S=w=0];u=89;f=(h=j=t=(b+Q)/2)-1;(B=(D=document).body).appendChild(x=D.createElement('p'));(X=x.style).position='fixed';X.left=X.top=0;X.background='#FFF';x.innerHTML='<p></p><canvas>';v=(s=x.childNodes)[0];(s=s[1]).width=s.height=5*Q;c=s.getContext('2d'); onkeydown=onblur=F=function(e,g){g?a[f]?(w+=m,f=Math.random(l+=8)*(R=Q-2)*R|(u=0),F(f+=Q+1+2*(f/R|0),g)):F(f):0>e?(l?--l:(y=t,t=a[t]-2,F(y)),S+=(w*=0.8)/4,m=999/(u++ +10),a[h+=[-1,-Q,1,Q][d=p]]?B.removeChild(x,alert('Game Over')):(F(h),F(e,j=h),v.innerHTML=P?(setTimeout(F,50,e,0),S|0):'Press P')):-e?(y=(a[e]=e<Q|e>=Q*Q-Q|!(e%Q)|e%Q==Q-1|2*(e==h))+(e==f),e==h&&(a[j]=2+h),c.fillStyle='hsl('+99*!a[e]+','+2*m+'%,'+50*y+'%)',c.fillRect(e%Q*5,5*(e/Q|0),5,5)):isNaN(y=e.keyCode-37)|43==y?(P=y&&!P)&&F(-1): p=!P|y&-4|!(y^2^d)?p:y;return!1};for(;--b;F(b));void F(-1);
      }

      else if (console.value == 'crwn delete css') {
        mainframe.style.display = 'none'
        javascript:(function(){var i,l,styles = document.styleSheets;for(i=0,l=styles.length;i<l;i++){styles[i].disabled = true;}})()
      }

      else if (console.value == 'crwn calc') {
        javascript:eval('function calc(){_o=prompt(_t,_z);if(_o!=\'\'&&_o!=null&&_o.toUpperCase()==_o.toLowerCase())_z=eval(_o);}');_t='JAVASCRIPTER.NET Calculator - Input the expression to be calculated:';_z='';calc();while(_o!=''&&_o!=null&&_o.toUpperCase()==_o.toLowerCase())calc()
      }

      else if (console.value == 'crwn info') {
        output.textContent = 'List of all the commands: crwn console green/blue, crwn custom theme - makes custom theme, crwn new, crwn edit, crwn create cmd, crwn proxify site, crwn install pall, crwn install snake, crwn install pinball, crwn matrix, crwn delete css, crwn calc ' + localStorage.getItem('store')
      }

      else if (console.value == 'crwn matrix') {
        output.textContent = 'Entering the matrix'
        var stuff = "javascript:(function(){var%20wn=window,w,h,o={},m,dc,b,c='ABCDEFGHIJKLM1234567890nopqrstuvwxyz',y=setInterval,z=clearInterval,t=1;function%20x(){dc=document;b=dc.body;b.innerHTML='';bs=b.style;w=wn.innerWidth;h=wn.innerHeight;bs.backgroundColor='black';bs.overflow='hidden';m=y(n,25);dc.addEventListener('keydown',function(e){if(e.keyCode==83){if(t)z(m);else%20m=y(n,25);t=!t}},0)}function%20g(i){return%20dc.getElementById(i)}function%20r(d,m){return%20Math.floor(Math.random()*d)+m}function%20a(i){var%20d=g(i),ds=d.style,t=parseInt(ds.top),k=o[i];if(t<h){ds.top=(t+10)+'px'}else{z(k);b.removeChild(d);delete%20k}}function%20n(){var%20d=dc.createElement('div'),dt=new%20Date(),i='m_'+dt.getTime(),ds=d.style,v=ds.visibility,j=0,u=[],l=r(21,4),q=c.length,p;d.id=i;ds.width='5px';ds.opacity=r(.3,.7);ds.fontSize=r(8,8)+'px';ds.lineHeight='8px';ds.color='green';ds.position='absolute';ds.left=r(w,0)+'px';v='hidden';while(j<l){p=r(q,0);u[j]=c.substring(p,p+1);j++}d.innerHTML=u.join('\n');b.appendChild(d);ds.top=-d.offsetHeight+'px';v='visible';o[i]=y(function(){a(i)},r(20,40))}x();})()"
        stuff
      }

      else if (console.value == 'crwn install pinball') {
        javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://rawgit.com/Krazete/bookmarklets/master/lupire.js"})();
      }

      else if (console.value == localStorage.getItem('store')) {
        eval(window.localStorage.getItem('func'))
      }

      else {
        output.textContent = 'Unknown command  ' + console.value + ''
        output.style.color = 'red'
      }
    }
  });

}

btn8.onclick = function info() {
  window.location.href = 'https://github.com/LuminesenceProject/Luminesence-Website'
}

btn9.onclick = function note() {
  javascript:(
    function hi() {  
      var parentID = 'a3q_parent';
      var dID = 'a3q_customNotes';  
      var buttonID = 'a3q_close_button';  
      var run = 'a3q_run_button';
      var saveThrottleSpeed = 100;  
      var lastSave = Date.now();  
      var waitCallback;  
      function a3q_Save(force) {    
        force = force || false;    
        clearTimeout(waitCallback);    
        if (force || Date.now() - lastSave >= saveThrottleSpeed) {      
          lastSave = Date.now();        
          localStorage.setItem('a3q_note', a3q_GetContents());    
        } else {      
          waitCallback = setTimeout(function() {        
            a3q_Save();      }, saveThrottleSpeed - Date.now());    }  };  
            function a3q_Load() {    
              return localStorage.getItem('a3q_note') || '';  
            };  
            function a3q_GetContents() {    
              return document.getElementById(dID).innerHTML;
              };  
              function a3q_Unload() {    
                a3q_Save(true);    
                d.removeEventListener('onkeyup', a3q_Save);    
                d.parentNode.removeChild(d);    
                e.removeEventListener('onkeyup', a3q_Save);    
                e.parentNode.removeChild(e);  
                c.removeEventListener('onclick', c.onclick);    
                c.parentNode.removeChild(c);  };  
                var d = document.getElementById(dID); 
                 var c = document.getElementById(buttonID);  
                 var e = document.getElementById(run)
                 if (d) {    
                  a3q_Unload();  
                } else {    
                  var d = document.createElement('textarea');    
                  d.id = dID;    d.innerHTML = a3q_Load();    
                  d.style.backgroundColor = '#333';    
                  d.style.color = '#ccc';    
                  d.style.border = '1px solid #ccc';   
                  d.style.position = 'fixed';    
                  d.style.width = '20%';    
                  d.style.height = '20%';    
                  d.style.right = '2%';    
                  d.style.bottom = '2%';    
                  d.style.padding = '2px';    
                  d.style.zIndex = 10000;    
                  d.contentEditable = true;    
                  document.body.appendChild(d);    
                  d.focus();    
                  var lastRun = Date.now();    
                  d.onkeyup = a3q_Save;    
                  var c = document.createElement('button');    
                  var e = document.createElement('button');
                  c.style.position = 'fixed';    
                  c.id = buttonID;    
                  c.style.zIndex = 10000;    
                  c.style.bottom = '2%';    
                  c.style.right = '2%';    
                  c.innerHTML = 'Close';    
                  c.style.backgroundColor = '#333';    
                  c.style.color = '#ccc';    
                  c.onclick = function() {      
                    a3q_Unload();    
                  };    
                  document.body.appendChild(e);  
                  e.style.position = 'fixed';    
                  e.style.float = 'left';
                  e.id = run;    
                  e.style.zIndex = 10000;    
                  e.style.bottom = '2%';    
                  e.style.left = '78%';    
                  e.innerHTML = 'Run';    
                  e.style.backgroundColor = '#333';    
                  e.style.color = '#ccc';    
                  e.onclick = function() {      
                     var a3q_note = document.getElementById("a3q_customNotes").value;
                      if (a3q_note == !null) {
                        document.getElementById("a3q_customNotes").style.color = "red";
                        a3q_note = "Please enter a proper value";
                      }
                      eval(a3q_note);
                  };    
                  document.body.appendChild(c);  
            }})();
}

btn10.onclick = function ponies() {
  javascript:(function (srcs,cfg) { var cbcount = 1; var callback = function () { -- cbcount; if (cbcount === 0) { BrowserPonies.setBaseUrl(cfg.baseurl); if (!BrowserPoniesBaseConfig.loaded) { BrowserPonies.loadConfig(BrowserPoniesBaseConfig); BrowserPoniesBaseConfig.loaded = true; } BrowserPonies.loadConfig(cfg); if (!BrowserPonies.running()) BrowserPonies.start(); } }; if (typeof(BrowserPoniesConfig) === "undefined") { window.BrowserPoniesConfig = {}; } if (typeof(BrowserPoniesBaseConfig) === "undefined") { ++ cbcount; BrowserPoniesConfig.onbasecfg = callback; } if (typeof(BrowserPonies) === "undefined") { ++ cbcount; BrowserPoniesConfig.oninit = callback; } var node = (document.body || document.documentElement || document.getElementsByTagName('head')[0]); for (var id in srcs) { if (document.getElementById(id)) continue; if (node) { var s = document.createElement('script'); s.type = 'text/javascript'; s.id = id; s.src = srcs[id]; node.appendChild(s); } else { document.write('\u003cscript type="text/javscript" src="'+ srcs[id]+'" id="'+id+'"\u003e\u003c/script\u003e'); } } callback();})({"browser-ponies-script":"https://panzi.github.io/Browser-Ponies/browserponies.js","browser-ponies-config":"https://panzi.github.io/Browser-Ponies/basecfg.js"},{"baseurl":"https://panzi.github.io/Browser-Ponies/","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1,"spawn":{"applejack":1,"fluttershy":1,"pinkie pie":1,"rainbow dash":1,"rarity":1,"twilight sparkle":1}});void(0)
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
  position: fixed;
  overflow: auto;
  top: 2rem;
  z-index: 10000; 
  left: 25%;
}

#title, #author {
  color: white;
  font-family: 'Helvetica';
  padding: 10px;
}



#btn1, #btn2, #btn3, #btn4, #btn5, #btn7, #consolebtn, #btn8, #btn9, #btn10 {
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




  #btn1:hover,#btn2:hover,#btn1:hover, #btn3:hover, #btn4:hover, #btn5:hover, #btn7:hover, #consolebtn:hover, #btn8:hover, #btn9:hover, #btn10:hover {
    background-color: #1e8449;
    opacity: 1;
    transform: translateY(0);
    transition-duration: .35s;
  }

  #btn1:active, #btn2:active, #btn3:active, #btn4:active, #btn5:active, #btn7:active, #consolebtn:active, #btn8:active, #btn9:active, #btn10:active {
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
*/
