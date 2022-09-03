// Sound by Anders Kaare
function mkaudio(fn) {
	var data = [];
	for (var i = 0;;i++) {
		var smp = fn(i);
		if (smp===null) break;
		data.push(smp);
	}
	var l = data.length;
	var l2=l*2;

	var b32 = function (v) {
		var s = 0;
		var b = "";
		for (var i=0; i<4; i++,s+=8) b+=String.fromCharCode((v>>s)&255);
		return b;
	};
	var b16 = function (v) {
		var b = b32(v);
		return b[0]+b[1];
	};;

	var SR=48e3;
	var b = "RIFF"+b32(l2+36)+"WAVEfmt "+b32(16)+b16(1)+b16(1)+b32(SR)+b32(SR*2)+b16(2)+b16(16)+"data"+b32(l2);
	for (var i in data) b+=b16(data[i]*10e3);
	return new Audio("data:audio/wav;base64,"+btoa(b));
}

P=Math.pow;S=Math.sin;

function t(i,n) {
	return (n-i)/n;
}

/*function SNDjump0(i) {
	var n = 1e4;
	if (i>n) return null;
	return ((P(i,1.055)&128)?1:-1)*P(t(i,n),2);
}

function SNDjump1(i) {
	var n=1.3e4;
	var c=n/3;
	if (i > n) return null;
	var q=P(t(i,n),3.1);
	return (P(i,1.08)&(i<c?98:99))?q:-q;
}*/

function SNDjump2(i) {
	i=i*1.5;
	var n = 2e4;
	if (i>n) return null;
	return ((P(i,1.075)&128)?1:-1)*P(t(i,n),2);
}

/*
function SNDjump3(i) {
	i=i*1.5;
	var n = 2e4;
	if (i>n) return null;
	return ((P(i,1.055)&128)?1:-1)*P(t(i,n),2);
}

function SNDjump4(i) {
	i=i*1.4;
	var n = 2e4;
	if (i>n) return null;
	return ((P(i,1.055)&130)?1:-1)*P(t(i,n),2);
}

function SNDjump5(i) {
	i=i*0.75;
	var n=1.3e4;
	var c=n/3;
	if (i > n) return null;
	var q=P(t(i,n),3.1);
	return (P(i,1.08)&(i<c?98:99))?q:-q;
}
*/

function SNDdie0(i) {
	var n=5e4;
	if (i > n) return null;
	return ((P(i,0.9)&200)?1:-1)*P(t(i,n),3);
}

/*function SNDdie1(i) {
	i=P(i,0.96)*1.3;
	var n=9e4;
	if (i > n) return null;
	return (((i+S(i/1900)*80)&64)?1:-1)*P(t(i,n),3);
}

function SNDdie2(i) {
	var n=5e4;
	var n1=1e5;
	if (i > n) return null;
	i=P(i,1-S(i/n1))*5.3;
	var x=S(i/30+S(i/1500));
	return P(x,9)*t(i,n);
}

function SNDdie3(i) {
	var n=5e4;
	var n1=1e5;
	if (i > n) return null;
	i=P(i,1.2-S(i/n1))*7;
	var x=S(i/30+S(i/1500));
	return P(x,9)*t(i,n);
}

function SNDdie3(i) {
	var n=6e4;
	var n1=1e5;
	if (i > n) return null;
	i=P(i,1.2-S(i/n1))*7;
	var x=S(i/30+S(i/1500));
	return P(x,9)*t(i,n);
}

function SNDdie4(i) {
	var n=5e4;
	var n1=1e5;
	if (i > n) return null;
	i=P(i,1.2-S(i*2/n1))*6;
	var x=S(i/30+S(i/1500));
	return P(x,9)*t(i,n);
}

function SNDglitch0(i) {
	var n=5e4;
	if (i > n) return null;
	return ((P(i+S(i*0.01)*1000,0.9)&200)?1:-1)*P(t(i,n),1);
}
*/

function SNDbrick1(i) {
	var n=5e3;
	if (i > n) return null;
	return ((P(i+S(i*0.01)*1000,0.8)&200)?0.5:-0.5)*P(t(i,n),1);
}

function SNDglitch1(i) {
	var n=9e4;
	if (i > n) return null;
	return ((P(i+S(i*0.01)*1000,0.8)&200)?0.5:-0.5)*P(t(i,n),1);
}

/*
function SNDglitch2(i) {
	var n=1e5;
	if (i > n) return null;
	return ((P(P(i,0.9)+S(i*1.06)*1000,0.8)&200)?0.5:-0.5)*P(t(i,n),1);
}

function SNDcoin0(i) {
	var n=1e4;
	var c=n/3;
	if (i > n) return null;
	var q=P(t(i,n),2.1);
	return (P(i,3)&(i<c?16:99))?q:-q;
}
*/
function SNDcoin1(i) {
	var n=1.6e4;
	var c=n/7;
	if (i > n) return null;
	var q=P(t(i,n),2.1);
	return (i<c ? ((i+S(-i/900)*10)&16) : i&13) ?q:-q;
}

function SNDwin0(i) {
	var notes = [0,4,7,12,undefined,7,12];
	var n=4e4;
	if (i > n) return null;
	var idx = ((notes.length*i)/n)|0;
	var note = notes[idx];
	if (note === undefined) return 0;
	var r = P(2,note/12)*0.8;
	var q = t((i*notes.length)%n,n);
	return ((i*r)&64)?q:-q
}


function SNDswitch0(i) {
	var n=7e3;
	if (i > n) return null;
	return ((((i^(i>>3))^(i*i*7.3)^(i<<4))&65535)/65536)*t(i,n);
}

function SNDtimetravel0(i) {
	var n=5e4;
	var n1=1e5;
	if (i > n) return null;
	i=P(i,1.2-S(i/n1))*7;
	var x=S(i/30+S(i/1500));
	return P(x,9)*t(i,n);
}

/*
function SND0(i) {
	var n=25000;
	if (i > n) return null;
	return ((((i^(i>>3))^(i*i*7.3)^(i<<4))&65535)/65536)*t(i,n);
}

window.onload = function () {
	for (var k in window) {
		if (/^SND/.exec(k)) {
			(function (k) {
				var a = mkaudio(window[k]);
				var e = document.createElement("button");
				e.onclick = function () { a.play(); };
				e.innerHTML = k.substring(3);
				document.body.appendChild(e);
			})(k);
		}
	}
}
*/