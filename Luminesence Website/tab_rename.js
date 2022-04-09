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