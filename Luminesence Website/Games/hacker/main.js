var intervalID = window.setInterval(updateScreen, 200);
var c = document.getElementById("console");

var txt = [
  "FORCE: XX0022. ENCYPT://000.222.2345",
  "TRYPASS: ********* AUTH CODE: ALPHA GAMMA: 1___ PRIORITY 1",
  "RETRY: REINDEER FLOTILLA",
  "Z:> /LUMI/GAMES/TICTACTOE/ EXECUTE -PLAYERS 0",
  "================================================",
  "Priority 1 // local / scanning...",
  "scanning ports...",
  "BACKDOOR FOUND (23.45.23.12.00000000)",
  "BACKDOOR FOUND (13.66.23.12.00110000)",
  "BACKDOOR FOUND (13.66.23.12.00110044)",
  "...",
  "...",
  "BRUTE.EXE -r -z",
  "...locating vulnerabilities...",
  "...vulnerabilities found...",
  "MCP/> DEPLOY CLU",
  "SCAN: __ 0100.0000.0554.0080",
  "SCAN: __ 0020.0000.0553.0080",
  "SCAN: __ 0001.0000.0554.0550",
  "SCAN: __ 0012.0000.0553.0030",
  "SCAN: __ 0100.0000.0554.0080",
  "SCAN: __ 0020.0000.0553.0080",
  "SHOW ANSWERS: Y/N",
  "y- n- /overide",
    "ACCESS DENIED",
]

var docfrag = document.createDocumentFragment();

function updateScreen() {
  //Shuffle the "txt" array
  txt.push(txt.shift());
  //Rebuild document fragment
  txt.forEach(function(e) {
    var p = document.createElement("p");
    p.textContent = e;
    docfrag.appendChild(p);
  });
  //Clear DOM body
  while (c.firstChild) {
    c.removeChild(c.firstChild);
  }
  c.appendChild(docfrag);
}