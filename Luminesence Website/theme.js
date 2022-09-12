const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark"
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

var version = "1.0";
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var updateDate = 2022-15-12;
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
}

if (currentDate < updateDate - 10) {
  document.getElementById("close").style.display = 'none';
  updateScreen.style.display = 'block';
}