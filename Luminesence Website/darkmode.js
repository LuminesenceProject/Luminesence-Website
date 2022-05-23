//THIS CODE MAY BE USED ON ANY WEBSITE
//AS LONG AS CREDIT IS CLEARLY GIVEN

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


page = window.prompt("Enter wanted redirect:")
document.onkeydown = key;

function key(e) {
    if(e.key === 32){
        window.location.assign(page)
    }

}